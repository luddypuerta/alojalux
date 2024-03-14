//Libraries
import React from 'react';
import { Card } from "antd";
import { Link } from 'react-router-dom';

//Styles
import "./DescriptiveCardsComponent.scss";

//Utils
import { hotelData } from '../../../../utils/interfaces/hotels/HotelDataInterface'

const DescriptiveCardsComponent: React.FC = () => {

  return (
    <div className="grid-container align-center-middle card-description">
      {hotelData.map((hotel,index)=>{
        return(
          <Link to="/room-details" key={hotel?.key}>
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
                    {hotel.packagesIncluded.map((item, index) => (
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
      })}
    </div>
  );
};
  
  export default DescriptiveCardsComponent;