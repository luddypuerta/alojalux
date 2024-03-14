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

  const getSlidesToShow = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1024) {
      return 4;
    } else if (windowWidth >= 640) {
      return 3;
    } else {
      return 1;
    }
  };

  return (
    <div className="cards-container">
      <div className="grid-container cards-container__swipeable-cards">
        <h3>Increíbles opciones de hospedaje en los destinos más visitados</h3>
        <Carousel slidesToShow={getSlidesToShow()}>
          {cards.map((card, index) => (
            <div key={index} className={`small-12 medium-${12 / getSlidesToShow()} cards-container__card`}>
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
