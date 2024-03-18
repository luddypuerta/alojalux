//Assets
import imageBackground from '@assets/images/hotels/hotel-alojalux.jpeg';

//Components
import LayoutHomeComponent from '../../components/layout-home/LayoutHomeComponent';
import SwipeableCardsComponent from './components/SwipeableCardsComponent';
import DescriptiveCardsComponent from './components/target/DescriptiveCardsComponent';

//Libraries
import React, { useEffect } from 'react';
import { ConfigProvider, DatePicker, InputNumber, Button, Select, Input, AutoComplete, Spin } from 'antd';
import { useState } from 'react';
import esES from 'antd/lib/locale/es_ES';
import { BankOutlined, UserOutlined } from '@ant-design/icons';
import { FaArrowLeft } from 'react-icons/fa';
import dayjs from 'dayjs';

//Services
import { getAllSitesService, getDataSitesService } from '../../services/home/homeServices';

//Styles
import "./HomePage.scss";

//Utils
import ErrorAlertComponent from '../../utils/alerts/error-alert.component';
import { CardSiteInterface } from '../../utils/interfaces/home/CardDataInterface';

const { RangePicker } = DatePicker;
const { Option } = Select;

const HomePage: React.FC = () => {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [numAdults, setNumAdults] = useState<number>(1);
    const [numRooms, setNumRooms] = useState<number>(1);
    const [numChildren, setNumChildren] = useState<number>(0);
    const [childAges, setChildAges] = useState<number[]>([]);
    const [cities, setCities] = useState<object[]>([]);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [isResult, setIsResult] = useState<boolean>(false);
    const MAX_CHILD_AGE = 17;
    const childAgeOptions = Array.from({ length: MAX_CHILD_AGE + 1 }, (_, i) => i);
    const [ cards, setCards ] = useState<CardSiteInterface[]>([]);
    const [datesFormatted, setDatesFormatted] = useState({});
    const [selectedDates, setSelectedDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);


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

    const selectCity = (value: string) => {
        setSearchText(value);
    };

    const selectDateChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null]) => {
        setSelectedDates(dates);
    };

    const getFormattedDates = () => {
        if ((selectedDates && selectedDates[0] && selectedDates[1])) {
            const startDate = selectedDates[0].format('YYYY-MM-DD');
            const endDate = selectedDates[1].format('YYYY-MM-DD');
            return { startDate, endDate };
        }
        return { startDate: '', endDate: '' };
    };
    const searchAccommodation = () => {

        const formattedDates = getFormattedDates();
        const { startDate, endDate } = formattedDates;

        if (!startDate || !endDate || !searchText) {
            ErrorAlertComponent('Por favor complete todos los campos requeridos', '');
            return;
        }
        setDatesFormatted(formattedDates);
        setIsSearch(prev => !prev);
    };

    useEffect(() => {
        searchCity()
        getSites()
    }, [])

    useEffect(() => {
        if (isSearch) {
            setTimeout(() => {
                setIsSearch(prev => !prev)
                setIsResult(true)
            }, 1500);
        }

    }, [isSearch])
    
    //Services
    const searchCity = async(value: string = "") => {
        try {
            setSearchText(value)
            if (value === "" || value.length > 2) {
                const responseFilteredCities = await getDataSitesService(value)
                setCities(responseFilteredCities)
            }
        } catch (error) {
            ErrorAlertComponent()
        }
    };
    const getSites = async () => {
        try {
            const responseAllSites = await getAllSitesService()
            setCards(responseAllSites)
        } catch (error) {
            ErrorAlertComponent()
        }
    }

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
                                    options={cities}
                                    onSelect={selectCity}
                                    onSearch={searchCity}
                                    className='home-page__autocomplete'
                                >
                                    <Input.Search className='home-page__input-search' placeholder="¿A dónde vas?" enterButton={<BankOutlined />} />
                                </AutoComplete>
                            </div>
                            <div className='cell small-12 large-3'>
                                <ConfigProvider locale={esES}>
                                    <RangePicker 
                                        onChange={(selectDateChange)}
                                    />
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
                                <button className='cell small-3 button home-page__button-search' onClick={(()=>{searchAccommodation()})}>
                                    Buscar
                                </button>
                                {isVisible && (
                                    <div className='home-page__selection-panel'>
                                        <div className='grid-x home-page__selection-panel__container-element'>
                                            <label className='cell small-6 home-page__selection-panel__title'>Habitaciones</label>
                                            <div className='cell small-6 grid-x text-center'>
                                                <div className='cell small-4'>
                                                    <Button className='home-page__selection-panel__button-control' onClick={() =>  setNumRooms(prevNumRooms => Math.max(prevNumRooms - 1, 1))}>-</Button>
                                                </div>
                                                <div className='cell small-4' >
                                                    <InputNumber className='home-page__selection-panel__number-field' min={1} value={numRooms} onChange={numRoomsChange} />
                                                </div>
                                                <div className='cell small-4' >
                                                    <Button className='home-page__selection-panel__button-control' onClick={() => setNumRooms(prevNumRooms => prevNumRooms + 1)}>+</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='grid-x home-page__selection-panel__container-element'>
                                            <label className='cell small-6 home-page__selection-panel__title'>Adultos</label>
                                            <div className='cell small-6 grid-x text-center'>
                                                <div className='cell small-4'>
                                                    <Button className='home-page__selection-panel__button-control' onClick={() => setNumAdults(prevNumAdults => Math.max(prevNumAdults - 1, 1))}>-</Button>
                                                </div>
                                                <div className='cell small-4' >
                                                    <InputNumber className='home-page__selection-panel__number-field' min={1} value={numAdults} onChange={numAdultsChange} />
                                                </div>
                                                <div className='cell small-4' >
                                                    <Button className='home-page__selection-panel__button-control' onClick={() => setNumAdults(prevNumAdults => prevNumAdults + 1)}>+</Button>
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
                {isSearch ?
                    <div className='grid-x align-center-middle home-page__spin'>
                        <Spin size='large' />
                    </div>
                    :
                    isResult ? (
                        <>
                            <div className='grid-container home-page__button-return'>
                                <button onClick={() => setIsResult(false)}>
                                    <FaArrowLeft /> Volver
                                </button>
                            </div>
                            <DescriptiveCardsComponent location={searchText} selectedDates={datesFormatted} />
                        </>
                    ) : (
                        <SwipeableCardsComponent cards={cards} />
                    )

                }
            </div>
        </LayoutHomeComponent>
    );
};

export default HomePage;
