import React, { useRef } from 'react';
import { Form, Input, Select, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

const { Option } = Select;

interface RoomsComponentProps {
    hotelData: any;
    setHotelData: (data: any) => void;
}

const RoomsComponent: React.FC<RoomsComponentProps> = ({ hotelData, setHotelData }) => {
    const formRef = useRef<FormInstance>(null);

    const onFinishHandler = (values: any) => {
        const updatedHotelData = { ...hotelData, rooms: [...(hotelData.rooms || []), values] };
        setHotelData(updatedHotelData);
        formRef.current?.resetFields();
    };

    const handleImageChange = (info: any) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const uploadProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange: handleImageChange,
    };

    return (
        <Form ref={formRef} onFinish={onFinishHandler} className='grid-x'>
            <Form.Item name="roomName" label="Nombre de la habitación" rules={[{ required: true, message: 'Por favor ingresa el nombre de la habitación' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="roomType" label="Tipo de habitación" rules={[{ required: true, message: 'Por favor selecciona el tipo de habitación' }]}>
                <Select>
                    <Option value="single">Individual</Option>
                    <Option value="double">Doble</Option>
                    <Option value="suite">Suite</Option>
                </Select>
            </Form.Item>
            <Form.Item name="baseCost" label="Costo base" rules={[{ required: true, message: 'Por favor ingresa el costo base' }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item name="taxes" label="Impuestos" rules={[{ required: true, message: 'Por favor ingresa los impuestos' }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item name="images" label="Imágenes">
                <Upload {...uploadProps} fileList={[]}>
                    <Button icon={<UploadOutlined />}>Click para cargar</Button>
                </Upload>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Agregar Habitación
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RoomsComponent;
