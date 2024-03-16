//Components
import RoomsComponent from '../rooms/RoomsComponent';

//Interfaces
import { HotelInterface, PackageInterface, hotelInitialValues } from '../../../../utils/interfaces/hotels/HotelDataInterface';

//Libraries
import React, { useEffect, useState } from 'react';
import { Modal, Steps, Form, Input, InputNumber, Checkbox, Tag, Button, Upload, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

//Styles
import './HotelsModalComponent.scss'

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
    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleCancel = () => {
        onCancel();
        setCurrentStep(0);
    };

    const handleFinish = () => {
        onCancel();
        setCurrentStep(0);
    };

    const handleChange = (fieldName: string, value: any) => {
        setHotelData({
            ...hotelData,
            [fieldName]: value
        });
    };

    const handleAddPackage = () => {
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

    const handleRemovePackage = (packageToRemoveId: string) => {
        const updatedPackages: PackageInterface[] = hotelData.packagesIncluded.filter((packageItem) => packageItem.id !== packageToRemoveId);
        setHotelData({
            ...hotelData,
            packagesIncluded: updatedPackages
        });
    };

    const props: UploadProps = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file && info.file.status === 'done' && info.file.response) {
                const imageUrl = info.file.name;
                setHotelData({
                    ...hotelData,
                    image: imageUrl
                });
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <Modal
            open={open}
            onCancel={handleCancel}
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
                        <Form onFinish={handleNext} initialValues={hotelData}>
                            <div className='grid-x hotels-modal__form'>
                                <div className="cell small-12 medium-6">
                                    <Item label="Nombre del hotel" name="name" className='hotels-modal__content'>
                                        <Input 
                                            className='hotels-modal__content__input' 
                                            value={hotelData?.name}
                                            onChange={(e) => handleChange('name', e.target.value)} />
                                    </Item>
                                </div>
                                <div className="cell small-12 medium-6">
                                    <Item label="Ubicación" name="location" className='hotels-modal__content'>
                                        <Input
                                            placeholder='Bogotá'
                                            className='hotels-modal__content__input-text'
                                            value={hotelData.location} 
                                            onChange={(e) => handleChange('location', e.target.value)} />
                                    </Item>
                                </div>
                                <div className="cell small-12 medium-12">
                                    <Item label="Título de la reseña" name="title" className='hotels-modal__content'>
                                        <Input
                                            className='hotels-modal__content__input-text'
                                            placeholder='¡Relájate junto al mar!'
                                            value={hotelData.title}
                                            onChange={(e) => handleChange('title', e.target.value)}
                                        />
                                    </Item>
                                </div>
                                <div className="cell small-12 medium-12">
                                    <Item label="Descripción de la reseña" name="description" className='hotels-modal__content'>
                                        <Input.TextArea
                                            placeholder='¡Relájate y rejuvenece en nuestro resort frente al mar en Barranquilla.!'
                                            value={hotelData.description} 
                                            onChange={(e) => handleChange('description', e.target.value)} />
                                    </Item>
                                </div>
                                <div className="cell small-12 medium-12">
                                    <Item label="Texto de la oferta" name="textOffer" className='hotels-modal__content'>
                                        <Input.TextArea
                                            value={hotelData.textOffer}
                                            placeholder='¡Reserva ahora y obtén un masaje relajante de cortesía!'
                                            onChange={(e) => handleChange('textOffer', e.target.value)}
                                        />
                                    </Item>
                                </div>
                                <div className="cell small-5 medium-6">
                                    <Item label="Precio" name="price" className='hotels-modal__content'>
                                        <InputNumber
                                            placeholder='000000'
                                            value={hotelData.price} onChange={(value) => handleChange('price', value)} />
                                    </Item>
                                </div>
                                <div className="cell small-3 medium-3">
                                    <Item label="Estrellas" name="stars" className='hotels-modal__content'>
                                        <InputNumber
                                            placeholder='1'
                                            value={hotelData.stars} onChange={(value) => handleChange('stars', value)} />
                                    </Item>
                                </div>
                                <div className="cell small-3 medium-3">
                                    <Item label="Habilitado" name="status" className='hotels-modal__content'>
                                        <div className='hotels-modal__content__checkbox'>
                                            <Checkbox
                                                checked={hotelData.status}
                                                onChange={(e) => handleChange('status', e.target.checked)}
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
                                                onPressEnter={handleAddPackage}
                                                onBlur={handleAddPackage}
                                                className='hotels-modal__input-package'
                                                placeholder="Agregar paquete, Ej: Wifi gratuito"
                                            />
                                            <Button type="primary"
                                                onClick={handleAddPackage}
                                                className='hotels-modal__btn-package'>
                                                Añadir
                                            </Button>
                                            <div className='hotels-modal__container-package'>
                                                {hotelData.packagesIncluded.map((item, index) => (
                                                    <Tag
                                                        key={index}
                                                        closable
                                                        onClose={() => handleRemovePackage(item?.id)}
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
                                        <Upload {...props}
                                            listType="picture"
                                            maxCount={1}
                                            accept=".png,.jpg"
                                            className='hotels-modal__container-upload'
                                        >
                                            <Button className='hotels-modal__btn-upload' icon={<UploadOutlined />}>Cargar Foto</Button>
                                        </Upload>
                                    </Item>
                                </div>
                            </div>
                        </Form>
                        <button onClick={handleNext} type="submit" className="button hotels-modal__btn-control">Siguiente</button>
                    </div>
                )}
                {currentStep === 1 && (
                    <div>
                        <RoomsComponent
                            hotelData={hotelData}
                            setHotelData={setHotelData}
                        />
                        <div className='grid-x align-justify'>
                            <button onClick={handlePrev} className="button secondary hotels-modal__btn-control">Anterior</button>
                            <button onClick={handleFinish} className="button primary hotels-modal__btn-control">{isAdding ? 'Añadir' : 'Editar'}</button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default HotelModalComponent;
