//Components
import ModalCardsComponent from '../modal-cards/ModalCardsComponent';
import LayoutHomeComponent from '../../../../components/layout-home/LayoutHomeComponent';

//Interfaces
import { roomDetailData } from '../../../../utils/interfaces/rooms/RoomDetailDataInterface';

//Libraries
import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaBed, FaCar, FaUsers, FaUtensils, FaWifi } from 'react-icons/fa';

//Styles
import './RoomDetailsComponent.scss';

const getIconComponent = (iconName: string) => {
    switch (iconName) {
        case 'FaUsers':
            return <FaUsers />;
        case 'FaUtensils':
            return <FaUtensils />;
        case 'FaWifi':
            return <FaWifi />;
        case 'FaCar':
            return <FaCar />;
        case 'FaBed':
            return <FaBed />;
        default:
            return null;
    }
};

const RoomDetailsComponent: React.FC = () => {
    const [modalCardVisible, setModalCardVisible] = useState<boolean>(false);

    const openModalCard = () => {
        setModalCardVisible(true);
    };

    const closeModalCard = () => {
        setModalCardVisible(false);
    };

    return (
        <LayoutHomeComponent>
            <div className="room-details grid-container">
                <div className="room-details__header">
                    <Link to="/" className="room-details__back-button">
                        <FaArrowLeft /> Volver
                    </Link>
                    <h4 className='room-details__title-room'>Elige tu habitación de Preferencia</h4>
                </div>
                <div className='grid-x'>
                    {roomDetailData.map(room => (
                        <div key={room.id} className="small-12 medium-6 large-4 room-details__card">
                            <Card className="room-details__content">
                                <div className="room-details__image">
                                    <img
                                        alt={room.name}
                                        src={`assets/images/rooms/${room.image}`}
                                    />
                                </div>
                                <div className="room-details__info">
                                    <h4>{room.name}</h4>
                                    <div className="room-details__amenities">
                                        {room.packagesIncluded.map((packageItem, index) => (
                                            <div className="room-details__amenity" key={index}>
                                                {getIconComponent(packageItem.icon)}
                                                <span className='room-details__amenity__items'>{packageItem.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="room-details__price">{room.price}</p>
                                    <Button type="primary" className="room-details__button" onClick={openModalCard}>
                                        Reservar Ahora
                                    </Button>
                                </div>
                            </Card>
                        </div>

                    ))}
                </div>
                <ModalCardsComponent open={modalCardVisible} onCancel={closeModalCard} />
            </div>
        </LayoutHomeComponent>
    );
};

export default RoomDetailsComponent;
