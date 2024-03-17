//Interfaces
import { HotelInterface } from '../../../../utils/interfaces/hotels/HotelDataInterface';

//Libraries
import React, { useEffect } from 'react';
import { Card } from "antd";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//Styles
import "./DescriptiveCardsComponent.scss";

//Redux
import { getHotels } from '../../../../redux/operations/hotelOperations';

interface DescriptiveCardsComponentProps {
    location: string,
    selectedDates: object
}
const DescriptiveCardsComponent: React.FC<DescriptiveCardsComponentProps> = ({ location, selectedDates }) => {
    const hotelsList: HotelInterface[] = useSelector((state: any) => state.hotels.hotels);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<any>(getHotels(location));
    }, [dispatch]);

    const filteredHotels = hotelsList.filter(hotel => hotel.status !== false);

    return (
        <div className="grid-container align-center-middle card-description">
            {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel: any, index: number) => {
                    return (
                        <Link to="/room-details" state={{ some: hotel, selectedDates: selectedDates }} key={hotel?.key}>
                            <Card
                                key={index}
                                type="inner"
                                className="card-description__container"
                                hoverable
                            >
                                <div className="grid-x">
                                    <img
                                        className="small-12 medium-4 card-description__image"
                                        alt="example"
                                        src={`/assets/images/hotels${hotel.image}`}
                                    />
                                    <div className="small-12 medium-8 card-description__description">
                                        <h4>{hotel?.name}</h4>
                                        <span>{hotel?.location}</span>
                                        <div className="grid-x card-description__tags align-middle card-description__sections">
                                            {hotel.packagesIncluded.map((item: any, index: any) => (
                                                <div key={item?.id}>
                                                    <span className="card-description__tags__text">{item?.name}</span>
                                                    {index < hotel.packagesIncluded.length - 1 && <span>, &nbsp; </span>}
                                                </div>
                                            ))}
                                        </div>
                                        <h6 className="card-description__footer__price">{hotel?.title}</h6>
                                        <span className="card-description__sections">{hotel?.description}</span>
                                        <div className="grid-x card-description__footer">
                                            <span>{hotel?.textOffer}</span>
                                            <h5 className="card-description__footer__price">{hotel?.price}</h5>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    )
                })
            ) : (
                <h3>No hay hoteles disponibles</h3>
            )}
    </div>
    );
};

export default DescriptiveCardsComponent;