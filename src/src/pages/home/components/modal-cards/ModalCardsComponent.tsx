
//Interfaces
import { BookingInterface, GuestInterface, EmergencyContactInterface } from '../../../../utils/interfaces/bookings/BookingDataInterface';

//Libraries
import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button, message, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

//Services
import { createBookingsService } from '../../../../services/bookings/bookingsService';

//Styles
import './ModalCardsComponent.scss'

//Utils
import ErrorAlertComponent from '../../../../utils/alerts/error-alert.component';

const { Option } = Select;

interface ModalCardsComponentProps {
    open: boolean;
    onCancel: () => void;
    data: {
        roomName: string,
        idHotel: string,
        roomType:
        {
            value: string,
            label: string
        },
        dataHotelSelected: { name: string },
        selectedDates: { startDate: string, endDate: string }
    }
}

const ModalCardsComponent: React.FC<ModalCardsComponentProps> = ({ open, onCancel, data }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [guests, setGuests] = useState<GuestInterface[]>([
        { id: 1, name: '', documentType: '', documentNumber: '', birthdate: '', gender: '', email: '', telephone: '', isTitular: true }
    ]);
    const [contactValues, setContactValues] = useState<EmergencyContactInterface>({ name: '', phone: '' });

    const handleAddGuest = () => {
        const newId = guests.length + 1;
        setGuests([...guests, { id: newId, name: '', documentType: '', documentNumber: '', birthdate: '', gender: '', email: '', telephone: '' }]);
    };

    const handleSetTitular = (id: number) => {
        const updatedGuests = guests.map(guest => ({
            ...guest,
            isTitular: guest.id === id
        }));
        setGuests(updatedGuests);
    };

    const handleDeleteGuest = (id: number) => {
        const isTitular = guests.find(guest => guest.id === id)?.isTitular;
        const updatedGuests = guests.filter(guest => guest.id !== id);
        if (isTitular && updatedGuests.length > 0) {
            updatedGuests[0].isTitular = true;
        }
        setGuests(updatedGuests);
    };

    const bookingRoom = (values: any) => {
        const arrayGuests: GuestInterface[] = guests ? guests : [];

        const objContactEmergency: EmergencyContactInterface = {
            name: values.emergencyContactName,
            phone: values.emergencyContactPhone
        }
        const titularObject: any = arrayGuests.find(gest => gest.isTitular === true);
        const body: BookingInterface = {
            hotel: data?.dataHotelSelected.name,
            idHotel: data.idHotel,
            name: titularObject?.name,
            email: titularObject?.email,
            telephone: titularObject?.telephone,
            documentType: titularObject?.documentType,
            documentNumber: titularObject?.documentNumber,
            checkInDate: data.selectedDates.startDate,
            checkOutDate: data.selectedDates.endDate,
            roomName: data.roomName,
            roomType: data.roomType,
            guests: arrayGuests,
            emergencyContact: objContactEmergency
        };
        return body;
    };

    const handleFinish = async (values: BookingInterface) => {
        setLoading(true);
        try {
            const dataCreateBooking = bookingRoom(values);
            await createBookingsService(dataCreateBooking);
            message.success('Reserva realizada con éxito');
            onCancel();
            form.resetFields();
        } catch (error) {
            ErrorAlertComponent();
        } finally {
            setLoading(false);
        }
    };


    return (
        <Modal
            title="Reservar Habitación"
            open={open}
            onCancel={onCancel}
            width="900px"
            style={{ maxWidth: '900px' }}
            footer={null}
            className='modal-cards'
        >
            <Form form={form} onFinish={handleFinish} layout="vertical">
                <div className='grid-container modal-cards__container'>
                    <div className="cell small-12">
                        <h5 className='modal-cards__title'>Datos de los Huéspedes</h5>
                    </div>
                    {guests.map(guest => (
                        <div key={guest.id} className="grid-x grid-margin-x modal-cards__guest">
                            <div className="cell small-6">
                                <Form.Item
                                    className='modal-cards__label label-guests'
                                    label="Nombres y Apellidos"
                                    name={`name${guest.id}`}
                                    rules={[{ required: true, message: 'Por favor ingresa los nombres y apellidos del huésped' }]}>
                                    <Input
                                        className='modal-cards__input'
                                        value={guest.name}
                                        onChange={(e) => setGuests(guests.map(g => g.id === guest.id ? { ...g, name: e.target.value } : g))} />
                                </Form.Item>
                            </div>
                            <div className="cell small-6">
                                <Form.Item
                                    className='modal-cards__label'
                                    label="Fecha de Nacimiento"
                                    name={`guestBirthdate${guest.id}`}
                                    rules={[{ required: true, message: 'Por favor ingresa la fecha de nacimiento del huésped' }]}>
                                    <DatePicker
                                        className='modal-cards__input'
                                        style={{ width: '100%' }}
                                        onChange={(date, dateString) => {
                                            if (typeof dateString === 'string') {
                                                setGuests(guests.map(g => g.id === guest.id ? { ...g, birthdate: dateString } : g))
                                            }
                                        }} />
                                </Form.Item>
                            </div>
                            <div className="cell small-6">
                                <Form.Item
                                    className='modal-cards__label'
                                    label="Email"
                                    name={`email${guest.id}`}
                                    rules={[{ required: true, type: 'email', message: 'Por favor ingresa un email válido' }]}>
                                    <Input
                                        className='modal-cards__input'
                                        onChange={(e) => setGuests(guests.map(g => g.id === guest.id ? { ...g, email: e.target.value } : g))} />
                                </Form.Item>
                            </div>
                            <div className="cell small-6">
                                <Form.Item
                                    className='modal-cards__label'
                                    label="Teléfono de Contacto"
                                    name={`guestPhone${guest.id}`}
                                    rules={[{ required: true, message: 'Por favor ingresa el teléfono de contacto del huésped' }]}>
                                    <Input
                                        className='modal-cards__input'
                                        onChange={(e) => setGuests(guests.map(g => g.id === guest.id ? { ...g, telephone: e.target.value } : g))} />
                                </Form.Item>
                            </div>
                            <div className="cell small-6">
                                <Form.Item
                                    className='modal-cards__label'
                                    label="Tipo de Documento"
                                    name={`guestDocumentType${guest.id}`}
                                    rules={[{ required: true, message: 'Por favor selecciona el tipo de documento del huésped' }]}>
                                    <Select
                                        className='modal-cards__input'
                                        onChange={(value) => setGuests(guests.map(g => g.id === guest.id ? { ...g, documentType: value } : g))}>
                                        <Option value="CC">Cédula de Ciudadanía</Option>
                                        <Option value="TI">Tarjeta de Identidad</Option>
                                        <Option value="CE">Cédula de Extranjería</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="cell small-6">
                                <Form.Item
                                    className='modal-cards__label'
                                    label="Número de Documento"
                                    name={`guestDocumentNumber${guest.id}`}
                                    rules={[{ required: true, message: 'Por favor ingresa el número de documento del huésped' }]}>
                                    <Input
                                        className='modal-cards__input'
                                        onChange={(e) => setGuests(guests.map(g => g.id === guest.id ? { ...g, documentNumber: e.target.value } : g))} />
                                </Form.Item>
                            </div>
                            <div className="cell small-6">
                                <Form.Item
                                    className='modal-cards__label'
                                    label="Género"
                                    name={`guestGender${guest.id}`}
                                    rules={[{ required: true, message: 'Por favor selecciona el género del huésped' }]}>
                                    <Select
                                        className='modal-cards__input'
                                        onChange={(value) => setGuests(guests.map(g => g.id === guest.id ? { ...g, gender: value } : g))}>
                                        <Option value="Masculino">Masculino</Option>
                                        <Option value="Femenino">Femenino</Option>
                                        <Option value="Otro">Otro</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="cell small-3 grid-x modal-cards__container-owner">
                                <Checkbox
                                    className='modal-cards__input'
                                    checked={guest.isTitular}
                                    onChange={() => handleSetTitular(guest.id)}>
                                    Titular de la reserva
                                </Checkbox>
                            </div>
                            {guest.id > 1 && (
                                <div className="modal-cards__btn-delete" style={{ marginTop: '32px' }}>
                                    <Button onClick={() => handleDeleteGuest(guest.id)}>
                                        <DeleteOutlined /> Eliminar huésped
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="cell small-12" style={{ textAlign: 'right' }}>
                        <Button
                            className='modal-cards__add-guest'
                            type="primary" onClick={handleAddGuest}>Agregar Huésped</Button>
                    </div>
                    <div className="cell small-12">
                        <h5 className='modal-cards__title'>Datos de Contacto de Emergencia</h5>
                        <div className='grid-x grid-margin-x '>
                            <div className="cell small-6">
                                <Form.Item
                                    className='modal-cards__label'
                                    label="Nombre de Contacto" name="emergencyContactName" rules={[{ required: true, message: 'Por favor ingresa el nombre del contacto de emergencia' }]}>
                                    <Input
                                        onChange={(e) => setContactValues({ ...contactValues, name: e.target.value })}
                                        className='modal-cards__input' />
                                </Form.Item>
                            </div>
                            <div className="cell small-6">
                                <Form.Item
                                    className='modal-cards__label'
                                    label="Teléfono de Contacto" name="emergencyContactPhone" rules={[{ required: true, message: 'Por favor ingresa el teléfono del contacto de emergencia' }]}>
                                    <Input
                                        onChange={(e) => setContactValues({ ...contactValues, phone: e.target.value })}
                                        className='modal-cards__input' />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </div>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Reservar Habitación
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCardsComponent;
