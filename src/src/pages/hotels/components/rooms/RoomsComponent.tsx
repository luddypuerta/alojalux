//Libraries
import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Upload, Checkbox } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

//Interfaces
import { RoomInterface, roomInitialValues, typeRoomData } from '../../../../utils/interfaces/rooms/RoomDataInterface';

//Styles
import './RoomsComponent.scss'

const { Option } = Select;
const { Item } = Form;

interface RoomsComponentProps {
    updateRoomsData: (updatedRooms: RoomInterface[]) => void;
}

const RoomsComponent: React.FC<RoomsComponentProps> = ({ updateRoomsData }) => {
    const [rooms, setRooms] = useState<RoomInterface[]>([]);

    //Data redux
    const roomList: RoomInterface[] = useSelector((state: any) => state?.room?.room);

    useEffect(() => {
        if(roomList.length > 0) {
            setRooms(roomList);
        }else {
            setRooms([getDefaultRoom()]);
        }       
    }, []);

    const getDefaultRoom = (): RoomInterface => (roomInitialValues);

    const handleRoomChange = (index: number, fieldName: string, value: any) => {
        const updatedRooms = rooms.map((room, i) => {
            if (i === index) {
                return { ...room, [fieldName]: fieldName === 'roomType' ? {
                    value: value.value,
                    label: value.label
                } : value };
            }
            return room;
        });
        setRooms(updatedRooms);
        updateRoomsData(updatedRooms);
    };

    const addRoom = () => {
        setRooms([...rooms, getDefaultRoom()]);
    };

    const handleRemoveRoom = (index: number) => {
        const updatedRooms = rooms.filter((_, i) => i !== index);
        setRooms(updatedRooms);
    };

    return (
        <div className='rooms'>
            {rooms.map((room, index) => (
                <div
                    key={index}
                    className='rooms__container-room'>
                    <Form
                        initialValues={room}
                        className='grid-x rooms__container-room__form'
                    >
                        <div className='cell small-12 medium-6'>
                            <Item
                                name="name"
                                label="Nombre de la habitación"
                                className='rooms__content'
                                rules={[{ required: true, message: 'Por favor ingresa el nombre de la habitación' }]}>
                                <Input
                                    className='rooms__container-room__input'
                                    value={room?.name}
                                    onChange={(e) => handleRoomChange(index, 'name', e.target.value)}
                                />
                            </Item>
                        </div>
                        <div className='cell small-12 medium-6'>
                            <Item
                                name="roomType"
                                label="Tipo de habitación"
                                className='rooms__content'
                                rules={[{ required: true, message: 'Por favor selecciona el tipo de habitación' }]}>
                                <Select
                                    labelInValue
                                    className='rooms__container-room__input-text'
                                    placeholder='Seleccionar Habitación'
                                    onChange={(value) => handleRoomChange(index, 'roomType', value)}
                                    value={room?.roomType?.value}
                                >
                                    {typeRoomData.map(type => (
                                        <Option
                                            key={type.value}
                                            className='rooms__container-room__option'
                                            value={type.value}
                                        >
                                            {type.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Item>
                        </div>
                        <div className='cell small-12 medium-6'>
                            <Item
                                name="price" label="Costo base"
                                className='rooms__content'
                                rules={[{ required: true, message: 'Por favor ingresa el costo base' }]}>
                                <Input
                                    type="number"
                                    className='rooms__container-room__input'
                                    value={room?.price}
                                    onChange={(e) => handleRoomChange(index, 'price', e.target.value)}
                                />
                            </Item>
                        </div>
                        <div className='cell small-12 medium-6'>
                            <Item
                                name="taxes" label="Impuestos"
                                className='rooms__content'
                                rules={[{ required: true, message: 'Por favor ingresa los impuestos' }]}>
                                <Input
                                    type="number"
                                    className='rooms__container-room__input-text'
                                    value={room?.taxes}
                                    onChange={(e) => handleRoomChange(index, 'taxes', e.target.value)}
                                />
                            </Item>
                        </div>
                        <div className='cell small-12 medium-5'>
                            <Item
                                name="images" label="Imágenes"
                                className='rooms__content'>
                                <Upload
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    listType="picture"
                                    accept=".png,.jpg"
                                    className='rooms__container-upload'
                                    onChange={(info) => {
                                        if (info.file.status === 'done') {
                                            const imageUrl = info.file.name;
                                            handleRoomChange(index, 'images', imageUrl);
                                        }
                                    }}
                                >
                                    <Button className='rooms__btn-upload' icon={<UploadOutlined />}>Cargar Foto</Button>
                                </Upload>
                            </Item>
                        </div>
                        <div className="cell small-12 medium-5">
                            <Item
                                label="Ubicación" name="location"
                                rules={[{ required: true, message: 'Por favor ingresa la Ubicación' }]}
                                className='rooms__content'>
                                <Input
                                    placeholder='Bogotá'
                                    className='rooms__container-room__input'
                                    value={room?.location}
                                    onChange={(e) => handleRoomChange(index, 'location', e.target.value)}
                                />
                            </Item>
                        </div>
                        <div className="cell small-12 medium-2">
                            <Item label="Habilitado" name="status" className='hotels-modal__content'>
                                <div className='rooms__checkbox'>
                                    <Checkbox
                                        checked={room?.status}
                                        onChange={(e) => handleRoomChange(index, 'status', e.target.checked)}
                                    >
                                        Activo
                                    </Checkbox>
                                </div>
                            </Item>
                        </div>
                        {index > 0 && (
                            <div className='grid-x small-12 align-right rooms__container-delete'>
                                <Item className='rooms__content'>
                                    <Button
                                        icon={<DeleteOutlined />}
                                        className='rooms__delete-room'
                                        onClick={() => handleRemoveRoom(index)}
                                    >
                                        Eliminar Habitación
                                    </Button>
                                </Item>
                            </div>
                        )}
                    </Form>
                </div>
            ))}
            <Button
                className='rooms__add-room'
                type="dashed"
                icon={<PlusOutlined />}
                onClick={addRoom}
            >
                Agregar Habitación
            </Button>
        </div>
    );
};

export default RoomsComponent;
