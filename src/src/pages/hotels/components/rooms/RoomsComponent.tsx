//Libraries
import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Upload, Checkbox } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

//Interfaces
import { typeRoomData, RoomData } from '../../../../utils/interfaces/rooms/RoomDataInterface'

//Styles
import './RoomsComponent.scss'

const { Option } = Select;
const { Item } = Form;


interface RoomsComponentProps {
    hotelData: any;
    setHotelData: (data: any) => void;
}

const RoomsComponent: React.FC<RoomsComponentProps> = ({ hotelData, setHotelData }) => {
    const [rooms, setRooms] = useState<RoomData[]>([]);

    useEffect(() => {
        setRooms([getDefaultRoom()]);
    }, []);
    const getDefaultRoom = (): RoomData => ({
        roomName: '',
        roomType: '',
        baseCost: 0,
        taxes: 0,
        images: [],
        location: '',
        status: true
    });

    const onFinishHandler = (values: RoomData, index: number) => {
        const updatedRooms = [...rooms];
        updatedRooms[index] = values;
        setRooms(updatedRooms);
        setHotelData({ ...hotelData, rooms: updatedRooms });
    };

    const handleRoomChange = (index: number, fieldName: string, value: any) => {
        const updatedRooms = rooms.map((room, i) => {
            if (i === index) {
                return { ...room, [fieldName]: value };
            }
            return room;
        });
        setRooms(updatedRooms);
    };

    const addRoom = () => {
        setRooms([...rooms, getDefaultRoom()]);
    };

    const handleRemoveRoom = (index: number) => {
        const updatedRooms = rooms.filter((_, i) => i !== index);
        setRooms(updatedRooms);
        setHotelData({ ...hotelData, rooms: updatedRooms });
    };

    return (
        <div className='rooms'>
            {rooms.map((room, index) => (
                <div
                    key={index}
                    className='rooms__container-room'>
                    <Form
                        initialValues={room}
                        onFinish={(values) => onFinishHandler(values, index)}
                        className='grid-x rooms__container-room__form'
                    >
                        <div className='cell small-12 medium-6'>
                            <Item
                                name="roomName"
                                label="Nombre de la habitación"
                                className='rooms__content'
                                rules={[{ required: true, message: 'Por favor ingresa el nombre de la habitación' }]}>
                                <Input
                                    className='rooms__container-room__input'
                                    value={room?.roomName}
                                    onChange={(e) => handleRoomChange(index, 'roomName', e.target.value)}
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
                                    className='rooms__container-room__input-text'
                                    placeholder='Seleccionar Habitación'
                                    onChange={(value) => handleRoomChange(index, 'roomType', value)}
                                    value={room?.roomType}
                                >
                                    {typeRoomData.map(type => (
                                        <Option
                                            key={type.id}
                                            className='rooms__container-room__option'
                                            value={type.id}>
                                            {type.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Item>
                        </div>
                        <div className='cell small-12 medium-6'>
                            <Item
                                name="baseCost" label="Costo base"
                                className='rooms__content'
                                rules={[{ required: true, message: 'Por favor ingresa el costo base' }]}>
                                <Input
                                    type="number"
                                    className='rooms__container-room__input'
                                    value={room?.baseCost}
                                    onChange={(e) => handleRoomChange(index, 'baseCost', e.target.value)}
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
                                            const imageUrl = info.file.response.url;
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
                                        onChange={(e) => handleRoomChange(index, 'status', e.target.value)}
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
