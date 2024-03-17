//Components
import RoomsComponent from '../rooms/RoomsComponent';
import FileUploaderComponent from '../../../../components/upload-file/UploadFile.component';

//Interfaces
import { HotelInterface, PackageInterface, hotelInitialValues } from '../../../../utils/interfaces/hotels/HotelDataInterface';
import { RoomInterface } from '../../../../utils/interfaces/rooms/RoomDataInterface';

//Libraries
import React, { useEffect, useState } from 'react';
import { Modal, Steps, Form, Input, InputNumber, Checkbox, Tag, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { UploadFile } from "antd/lib/upload/interface";

//Services
import { createHotelService, updateHotelService } from '../../../../services/hotels/hotelsService';
import { createRoomsService, updateRoomsService } from '../../../../services/room/roomServices';

//Styles
import './HotelsModalComponent.scss'

//Utils
import ErrorAlertComponent from '../../../../utils/alerts/error-alert.component';
import SuccessAlertComponent from '../../../../utils/alerts/success-alert.component';

const { Step } = Steps;
const { Item } = Form;

interface HotelModalComponentProps {
    open: boolean;
    onCancel: () => void;
    isAdding: boolean;
    hotelDetails?: HotelInterface;
}

const HotelModalComponent: React.FC<HotelModalComponentProps> = (
    {   open, 
        onCancel, 
        isAdding,
        hotelDetails
    }) => {
        
    const [currentStep, setCurrentStep] = useState(0);
    const [newPackage, setNewPackage] = useState('');
    const [hotelData, setHotelData] = useState<HotelInterface>(hotelInitialValues);
    const [roomsData, setRoomsData] = useState<RoomInterface[]>([]);

    useEffect(() => {
        if (isAdding) {
            clearForm();
        } else if (hotelDetails) {
            setHotelData(hotelDetails);
        }
    }, [isAdding, hotelDetails]);
    

    const clearForm = () => {
        setHotelData(hotelInitialValues);
    };

    const cancelChanges = () => {
        onCancel();
        setCurrentStep(0);
    };

    const saveChanges  = () => {
        
        if (isAdding) {
            createHotel(hotelData)
        } else {
            updateHotel(hotelData, roomsData)
        }
        clearForm();
        onCancel();
        setCurrentStep(0);
    };

    const createHotel = async (hotelData: HotelInterface) => {
        try {
            const responseHotel = await createHotelService(hotelData);
            if (responseHotel.id) {
                createRooms(responseHotel.id);
                SuccessAlertComponent('Hotel creado con exito');
            }
        } catch {
            ErrorAlertComponent('Error al crear el hotel');
        }
    }

    const updateHotel = async (hotelData: HotelInterface, roomsData: RoomInterface[]) => {
        try {
            const responseHotel = await updateHotelService(hotelData);
            if (responseHotel) {
                await updateRoomsService(roomsData);
                SuccessAlertComponent('Hotel actualizado con exito');
            }
        } catch {
            ErrorAlertComponent('Error al actualizar el hotel');
        }
    }

    const createRooms = async (hotelKey: string) => {
        try {
            const roomsByHotel = roomsData.map((room) => ({
                ...room,
                idHotel: hotelKey
            }));
            await createRoomsService(roomsByHotel);
        } catch {
            ErrorAlertComponent('Error al crear las habitaciones');
        }
    }

    const hotelFieldsChange = (fieldName: string, value: any) => {
        setHotelData({
            ...hotelData,
            [fieldName]: value
        });
    };

    const addHotelPackage = () => {
        if (newPackage.trim() !== '') {
            const newPackageObj: PackageInterface = {
                id: uuidv4(),
                name: newPackage.trim()
            };
            setHotelData({
                ...hotelData,
                packagesIncluded: [...hotelData.packagesIncluded, newPackageObj]
            });
            setNewPackage('');
        }
    };

    const removeHotelPackage = (packageToRemoveId: string) => {
        const updatedPackages: PackageInterface[] = hotelData.packagesIncluded.filter((packageItem) => packageItem.id !== packageToRemoveId);
        setHotelData({
            ...hotelData,
            packagesIncluded: updatedPackages
        });
    };
    const updateRoomsData = (updatedRooms: RoomInterface[]) => {
        setRoomsData(updatedRooms);
    };

    const fileChange = (file: UploadFile) => {
        setHotelData({
            ...hotelData,
            image: file?.name ?? ''
        });
    };
    
    return (
        <Modal
            open={open}
            onCancel={cancelChanges}
            className='hotels-modal'
            footer={null}
            destroyOnClose={true}
            width="600"
            style={{ maxWidth: '800px' }}
        >
            <Steps current={currentStep}>
                <Step className='hotels-modal__title' title="Información del hotel" />
                <Step className='hotels-modal__title' title="Agregar habitación" />
            </Steps>
            <div>
                {currentStep === 0 && (
                    <div className="grid-container">
                        <Form onFinish={saveChanges} initialValues={hotelData}>
                            <div className='grid-x hotels-modal__form'>
                                <div className="cell small-12 medium-6">
                                    <Item label="Nombre del hotel" name="name" className='hotels-modal__content'>
                                        <Input 
                                            className='hotels-modal__content__input' 
                                            value={hotelData?.name}
                                            onChange={(e) => hotelFieldsChange('name', e.target.value)} />
                                    </Item>
                                </div>
                                <div className="cell small-12 medium-6">
                                    <Item label="Ubicación" name="location" className='hotels-modal__content'>
                                        <Input
                                            placeholder='Bogotá'
                                            className='hotels-modal__content__input-text'
                                            value={hotelData.location} 
                                            onChange={(e) => hotelFieldsChange('location', e.target.value)} />
                                    </Item>
                                </div>
                                <div className="cell small-12 medium-12">
                                    <Item label="Título de la reseña" name="title" className='hotels-modal__content'>
                                        <Input
                                            className='hotels-modal__content__input-text'
                                            placeholder='¡Relájate junto al mar!'
                                            value={hotelData.title}
                                            onChange={(e) => hotelFieldsChange('title', e.target.value)}
                                        />
                                    </Item>
                                </div>
                                <div className="cell small-12 medium-12">
                                    <Item label="Descripción de la reseña" name="description" className='hotels-modal__content'>
                                        <Input.TextArea
                                            placeholder='¡Relájate y rejuvenece en nuestro resort frente al mar en Barranquilla.!'
                                            value={hotelData.description} 
                                            onChange={(e) => hotelFieldsChange('description', e.target.value)} />
                                    </Item>
                                </div>
                                <div className="cell small-12 medium-12">
                                    <Item label="Texto de la oferta" name="textOffer" className='hotels-modal__content'>
                                        <Input.TextArea
                                            value={hotelData.textOffer}
                                            placeholder='¡Reserva ahora y obtén un masaje relajante de cortesía!'
                                            onChange={(e) => hotelFieldsChange('textOffer', e.target.value)}
                                        />
                                    </Item>
                                </div>
                                <div className="cell small-5 medium-6">
                                    <Item label="Precio" name="price" className='hotels-modal__content'>
                                        <InputNumber
                                            placeholder='000000'
                                            value={hotelData.price} onChange={(value) => hotelFieldsChange('price', value)} />
                                    </Item>
                                </div>
                                <div className="cell small-3 medium-3">
                                    <Item label="Estrellas" name="stars" className='hotels-modal__content'>
                                        <InputNumber
                                            placeholder='1'
                                            value={hotelData.stars} onChange={(value) => hotelFieldsChange('stars', value)} />
                                    </Item>
                                </div>
                                <div className="cell small-3 medium-3">
                                    <Item label="Habilitado" name="status" className='hotels-modal__content'>
                                        <div className='hotels-modal__content__checkbox'>
                                            <Checkbox
                                                checked={hotelData.status}
                                                onChange={(e) => hotelFieldsChange('status', e.target.checked)}
                                            >
                                                Activo
                                            </Checkbox>
                                        </div>
                                    </Item>
                                </div>
                                <div className="cell small-12 medium-6">
                                    <Item label="Incluir paquetes" name="packagesIncluded" className='hotels-modal__content'>
                                        <div className='grid-x'>
                                            <Input
                                                value={newPackage}
                                                onChange={(e) => setNewPackage(e.target.value)}
                                                onPressEnter={addHotelPackage}
                                                onBlur={addHotelPackage}
                                                className='hotels-modal__input-package'
                                                placeholder="Agregar paquete, Ej: Wifi gratuito"
                                            />
                                            <Button type="primary"
                                                onClick={addHotelPackage}
                                                className='hotels-modal__btn-package'>
                                                Añadir
                                            </Button>
                                            <div className='hotels-modal__container-package'>
                                                {hotelData.packagesIncluded.map((item, index) => (
                                                    <Tag
                                                        key={index}
                                                        closable
                                                        onClose={() => removeHotelPackage(item?.id)}
                                                    >
                                                        {item?.name}
                                                    </Tag>
                                                ))}
                                            </div>
                                        </div>
                                    </Item>
                                </div>
                                <div className="cell small-12 medium-6">
                                    <Item label="Imagen" name="image" className='hotels-modal__content'>
                                        <FileUploaderComponent
                                            onChange={fileChange}
                                        />
                                    </Item>
                                </div>
                            </div>
                        </Form>
                        <button 
                            onClick={() => setCurrentStep(currentStep + 1)} 
                            type="submit" 
                            className="button hotels-modal__btn-control"> Siguiente
                        </button>
                    </div>
                )}
                {currentStep === 1 && (
                    <div>
                        <RoomsComponent updateRoomsData={updateRoomsData}/>
                        <div className='grid-x align-justify'>
                            <button 
                                onClick={() => setCurrentStep(currentStep - 1)} 
                                className="button secondary hotels-modal__btn-control">Anterior</button>
                            <button onClick={saveChanges} className="button primary hotels-modal__btn-control">{isAdding ? 'Guardar Hotel' : 'Actualizar Hotel'}</button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default HotelModalComponent;
