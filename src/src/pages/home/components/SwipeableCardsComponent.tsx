//Interfaces
import { CardData } from '../../../utils/interfaces/home/CardDataInterface';

//Libraries
import React from 'react';
import { Carousel, Card } from 'antd';

//Styles
import './SwipeableCardsComponent.scss';

interface SwipeableCardsProps {
  cards: CardData[];
}

const SwipeableCardsComponent: React.FC<SwipeableCardsProps> = ({ cards }) => {

  const changeSwipeCard = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <div className="cards-container">
      <div className="grid-container cards-container__swipeable-cards">
        <h3>Explora increíbles opciones de hospedaje en los destinos más visitados</h3>
        <Carousel afterChange={changeSwipeCard} slidesToShow={4}>
          {cards.map((card, index) => (
            <div key={index} className='cards-container__card'>
              <Card
                 className='cards-container__card__image'
                 style={{ backgroundImage: `url(${card.image})` }}
                 >
              </Card>
              <div className="cards-container__card__content">
                  <label>{card.site}</label>
                  <span>{card.country}</span>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default SwipeableCardsComponent;
