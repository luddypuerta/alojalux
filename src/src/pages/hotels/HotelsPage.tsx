//Components
import HotelModalComponent from './components/modal/HotelsModalComponent';

//Interfaces
import { ColumnInterface, HotelInterface, hotelColumns } from '../../utils/interfaces/hotels/HotelDataInterface';

//Libraries
import { useEffect, useState } from 'react';
import { Table, Button, Select } from 'antd';
import { EditOutlined, StopOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

//Redux
import { getHotels } from '../../redux/operations/hotelOperations';

//Styles
import './HotelsPage.scss'

const { Option } = Select;

const HotelsPage: React.FC = () => {
  const [modalHotelVisible, setModalHotelVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<string>('');

  const hotelsList = useSelector((state: any) => state.hotels.hotels);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getHotels()); 
  }, [dispatch]);

  const openModalHotel = () => {
    setModalHotelVisible(true);
    setIsAdding(true);
  };

  const editHotel = () => {
    setModalHotelVisible(true);
    setIsAdding(false);
  };

  const closeModalHotel = () => {
    setModalHotelVisible(false);
  };

  const disableHotel = (record: HotelInterface) => {
    console.log(record)
  };

  const handleHotelChange = (value: string) => {
    setSelectedHotel(value);
  };

  const filteredHotels = selectedHotel ? hotelsList.filter((hotel: any) => hotel.key === selectedHotel) : hotelsList;

  const actionColumn = {
    title: 'Acciones',
    key: 'actions',
    render: (record: ColumnInterface) => (
      <div className='hotels-page__table__container-buttons'>
        <Button className='hotels-page__table__button-actions' onClick={editHotel} icon={<EditOutlined />}></Button>
        <Button className='hotels-page__table__button-actions' onClick={() => disableHotel(record)} icon={<StopOutlined />}></Button>
      </div>
    ),
  };

  const columnsWithActions: ColumnInterface[] = [
    ...hotelColumns,
    actionColumn
  ];

  return (
    <div className='hotels-page'>
      <div className='grid-x align-center'>
        <button
          className='hotels-page__button-add button'
          onClick={openModalHotel}>
          Agregar Hotel
        </button>
      </div>
      <h4 className='hotels-page__title'>Lista de Hoteles</h4>
      <Select
        className='hotels-page__hotel-selector'
        placeholder='Seleccionar hotel'
        onChange={handleHotelChange}
        value={selectedHotel}
      >
        <Option
          className='hotels-page__hotel-selector__option'
          value=''>
          Todos los hoteles
        </Option>
        {hotelsList.map((hotel: HotelInterface) => (
          <Option
            key={hotel.key}
            className='hotels-page__hotel-selector__option'
            value={hotel.key}>
            {hotel.name}
          </Option>
        ))}
      </Select>
      <Table className='hotels-page__table' columns={columnsWithActions} dataSource={filteredHotels} />
      <HotelModalComponent open={modalHotelVisible} onCancel={closeModalHotel} isAdding={isAdding} />
    </div>
  );
};

export default HotelsPage;
