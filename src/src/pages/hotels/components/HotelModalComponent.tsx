// HotelModalComponent
import RoomsComponent from './RoomsComponent';
import React, { useState } from 'react';
import { Modal, Steps, Form, Input } from 'antd';

const { Step } = Steps;
const { Item } = Form;

const HotelModalComponent: React.FC<{ open: boolean; onCancel: () => void; isAdding: boolean }> = ({
    open,
    onCancel,
    isAdding,
}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [hotelData, setHotelData] = useState<any>({});

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

    return (
        <Modal
            open={open}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose={true}
        >
            <Steps current={currentStep}>
                <Step title="Información del hotel" />
                <Step title="Agregar habitación" />
            </Steps>
            <div>
                {currentStep === 0 && (
                    <Form onFinish={handleNext}>
                        <Item label="Nombre del hotel" name="name">
                            <Input />
                        </Item>
                        <Item label="Ubicación" name="location">
                            <Input />
                        </Item>
                        <Item label="Estrellas" name="stars">
                            <Input />
                        </Item>
                        <button type="submit">Siguiente</button>
                    </Form>
                )}
                {currentStep === 1 && (
                    <div>
                        <RoomsComponent
                            hotelData={hotelData}
                            setHotelData={setHotelData}
                        />
                        <div>
                            <button onClick={handlePrev}>Anterior</button>
                            <button onClick={handleFinish}>{isAdding ? 'Añadir' : 'Editar'}</button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default HotelModalComponent;
