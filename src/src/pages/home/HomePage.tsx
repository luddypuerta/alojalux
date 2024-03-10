//Assets
import imageBackground from '@assets/images/hotel-alojalux.jpeg';
import imageBarcelona from '@assets/images/tourism-barcelona.jpeg';
import imageCartagena from '@assets/images/tourism-cartagena.webp';
import imageMadrid from '@assets/images/tourism-madrid.webp';
import imageMedellin from '@assets/images/tourism-medellin.jpeg';
import imageNewyork from '@assets/images/tourism-newyork.webp';
import imageSanandres from '@assets/images/tourism-sanandres.jpeg';
import imageSantamarta from '@assets/images/tourism-santamarta.jpeg';
import imageValledupar from '@assets/images/tourism-valledupar.jpeg';

//Components
import LayoutHomeComponent from '../../components/layout-home/LayoutHomeComponent';
import SwipeableCardsComponent from './components/SwipeableCardsComponent';

//Libraries
import React from 'react';
import { ConfigProvider, DatePicker, InputNumber, Button, Select, Input, AutoComplete } from 'antd';
import { useState } from 'react';
import esES from 'antd/lib/locale/es_ES';
import { BankOutlined, UserOutlined } from '@ant-design/icons';

//Styles
import "./HomePage.scss";

interface HomePageProps {
  
}

const { RangePicker } = DatePicker;
const { Option } = Select;

const HomePage: React.FC<HomePageProps> = () => {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [numAdults, setNumAdults] = useState<number>(1);
    const [numRooms, setNumRooms] = useState<number>(1);
    const [numChildren, setNumChildren] = useState<number>(0);
    const [childAges, setChildAges] = useState<number[]>([]);
    const [cities, setCities] = useState<string[]>([
        'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena',
        'Cúcuta', 'Bucaramanga', 'Pereira', 'Santa Marta', 'Ibagué',
    ]);
    const [originalCities] = useState<string[]>(cities);
    const MAX_CHILD_AGE = 17;
    const childAgeOptions = Array.from({ length: MAX_CHILD_AGE + 1 }, (_, i) => i);
    const cards = [
        { site: 'Barcelona', country: 'España', image: imageBarcelona },
        { site: 'Cartagena', country: 'Colombia', image: imageCartagena },
        { site: 'Madrid', country: 'España', image: imageMadrid },
        { site: 'Medellin', country: 'Colombia', image: imageMedellin },
        { site: 'Nueva York', country: 'Estados Unidos', image: imageNewyork },
        { site: 'San Andrés', country: 'Colombia', image: imageSanandres },
        { site: 'Santa Marta', country: 'Colombia', image: imageSantamarta },
        { site: 'Valledupar', country: 'Colombia', image: imageValledupar },
    ];

    const addAdult = () => {
        setNumAdults(prevNumAdults => prevNumAdults + 1);
    };

    const removeAdult = () => {
        setNumAdults(prevNumAdults => Math.max(prevNumAdults - 1, 0));
    };

    const addRoom = () => {
        setNumRooms(prevNumRooms => prevNumRooms + 1);
    };

    const removeRoom= () => {
        setNumRooms(prevNumRooms => Math.max(prevNumRooms - 1, 0));
    };

    const addChild = () => {
        if (numChildren < 100) {
            setNumChildren(prevNumChildren => prevNumChildren + 1);
            setChildAges(prevChildAges => [...prevChildAges, 0]);
        }
    };

    const removeChild = () => {
        setNumChildren(prevNumChildren => Math.max(prevNumChildren - 1, 0));
        setChildAges(prevChildAges => prevChildAges.slice(0, -1));
    };

    const numRoomsChange = (value: number | null) => {
        if (typeof value === 'number') {
            setNumRooms(value);
        }
    };

    const numAdultsChange = (value: number | null) => {
        if (typeof value === 'number') {
            setNumAdults(value);
        }
    };

    const numChildrenChange = (value: number | null) => {
        if (value && value < 100) {
            if (typeof value === 'number') {
                setNumChildren(value);
                const newChildAges = Array.from({ length: value }, () => 0);
                setChildAges(newChildAges);
            }
        }
    };

    const childAgeChange = (value: number, index: number) => {
        if (typeof value === 'number') {
            setChildAges(prevChildAges => {
                const newChildAges = [...prevChildAges];
                newChildAges[index] = value;
                return newChildAges;
            });
        }
    };

    const modalVisibility = () => {
        setIsVisible(prev => !prev);
    };

    const searchCity = (value: string) => {
        
        setSearchText(value);
        const filteredCities = originalCities.filter(city =>
            city.toLowerCase().includes(value.toLowerCase())
        );
        setCities(filteredCities);
    };

    const selectCity = (value: string) => {
        setSearchText(value);
    };


    return (
        <LayoutHomeComponent>
            <div className="home-page">
                <div className='home-page__background'>
                    <img src={imageBackground} alt="Imagen" className="home-page__image" />
                    <div className="home-page__text">
                        <h1>Encuentra el alojamiento perfecto</h1>
                        <h1>para tu viaje soñado</h1>
                        <h3>Disfruta de una estadía inolvidable en un hotel de ensueño.</h3>
                    </div>
                    <div className='home-page__container-search'>
                        <div className='grid-x align-center-middle home-page__search-hotel'>
                            <div className='cell small-12 large-4'>
                                <AutoComplete
                                    value={searchText}
                                    options={cities.map(city => ({ value: city }))}
                                    onSelect={selectCity}
                                    onSearch={searchCity}
                                >
                                    <Input.Search className='home-page__input-search' placeholder="¿A dónde vas?" enterButton={<BankOutlined />} />
                                </AutoComplete>
                            </div>
                            <div className='cell small-12 large-3'>
                                <ConfigProvider locale={esES}>
                                    <RangePicker />
                                </ConfigProvider>
                            </div>
                            <div className='cell small-12 large-5 grid-x home-page__panel-search'>
                                <div className='cell small-9'>
                                    <button className='home-page__panel-visibility' onClick={modalVisibility}>
                                        <UserOutlined className='home-page__panel-visibility__icon-user' />
                                        <span> {numRooms} habitaciones - </span>
                                        <span> {numAdults} adultos - </span>
                                        <span> {numChildren} niños </span>
                                    </button>
                                </div>
                                <button className='cell small-3 button home-page__button-search'>
                                    Buscar
                                </button>
                                {isVisible && (
                                    <div className='home-page__selection-panel'>
                                        <div className='grid-x home-page__selection-panel__container-element'>
                                            <label className='cell small-6 home-page__selection-panel__title'>Habitaciones</label>
                                            <div className='cell small-6 grid-x text-center'>
                                                <div className='cell small-4'>
                                                    <Button className='home-page__selection-panel__button-control' onClick={removeRoom}>-</Button>
                                                </div>
                                                <div className='cell small-4' >
                                                    <InputNumber className='home-page__selection-panel__number-field' min={1} value={numRooms} onChange={numRoomsChange} />
                                                </div>
                                                <div className='cell small-4' >
                                                    <Button className='home-page__selection-panel__button-control' onClick={addRoom}>+</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='grid-x home-page__selection-panel__container-element'>
                                            <label className='cell small-6 home-page__selection-panel__title'>Adultos</label>
                                            <div className='cell small-6 grid-x text-center'>
                                                <div className='cell small-4'>
                                                    <Button className='home-page__selection-panel__button-control' onClick={removeAdult}>-</Button>
                                                </div>
                                                <div className='cell small-4' >
                                                    <InputNumber className='home-page__selection-panel__number-field' min={1} value={numAdults} onChange={numAdultsChange} />
                                                </div>
                                                <div className='cell small-4' >
                                                    <Button className='home-page__selection-panel__button-control' onClick={addAdult}>+</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='grid-x home-page__selection-panel__container-element'>
                                            <label className='cell small-6 home-page__selection-panel__title'>Niños</label>
                                            <div className='cell small-6 grid-x text-center'>
                                                <div className='cell small-4'>
                                                    <Button className='home-page__selection-panel__button-control' onClick={removeChild}>-</Button>
                                                </div>
                                                <div className='cell small-4'>
                                                    <InputNumber className='home-page__selection-panel__number-field' min={0} value={numChildren} onChange={numChildrenChange} />
                                                </div>
                                                <div className='cell small-4'>
                                                    <Button className='home-page__selection-panel__button-control' onClick={addChild}>+</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='grid-x'>
                                            {childAges.map((age, index) => (
                                                <div key={index} className='cell small-4'>
                                                    <label className='home-page__selection-panel__title'>Niño {index + 1}</label>
                                                    <Select
                                                        value={age}
                                                        onChange={(value: number) => childAgeChange(value, index)}
                                                    >
                                                        {childAgeOptions.map((age) => (
                                                            <Option key={age} value={age}>
                                                                {age} años
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={modalVisibility}
                                            className='cell small-3 button home-page__selection-panel__button-ready'>
                                            Listo
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <SwipeableCardsComponent cards={cards}/>
            </div>
        </LayoutHomeComponent>
    );
};

export default HomePage;
