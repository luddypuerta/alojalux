//Components
import BookingsModalComponent from './components/BookingsModalComponent';

//Libraries
import React, { useState } from 'react';
import { Table, Button, Select } from 'antd';
import { EyeOutlined, StopOutlined } from '@ant-design/icons';

//Styles
import './BookingsPage.scss';

//Utils
import { BookingInterface, ColumnInterface, bookingData, bookingColumns } from '../../utils/interfaces/bookings/BookingDataInterface';
import { hotelData } from '../../utils/interfaces/hotels/HotelDataInterface'

const { Option } = Select;

const BookingsPage: React.FC = () => {
  const [selectedHotel, setSelectedHotel] = useState<string>('');
  const [modalBookingVisible, setModalBookingVisible] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingInterface | null>(null);

  const hotelChange = (value: string) => {
    setSelectedHotel(value);
  };

  const viewBookingDetails = (record: BookingInterface) => {
    setBookingDetails(record);
    setModalBookingVisible(true);
  };

  const disableBooking = (record: BookingInterface) => {
    console.log(record);
  };

  const closeModalBooking = () => {
    setModalBookingVisible(false);
  };

  const filteredBookings = selectedHotel ? bookingData.filter(data => data.idHotel === selectedHotel) : bookingData;

  const actionColumn = {
    title: 'Acciones',
    key: 'actions',
    render: (record: BookingInterface) => (
      <div className='bookings-page__table__container-buttons'>
        <Button className='bookings-page__table__button-actions' onClick={() => viewBookingDetails(record)} icon={<EyeOutlined />}></Button>
        <Button className='bookings-page__table__button-actions' onClick={() => disableBooking(record)} icon={<StopOutlined />}></Button>
      </div>
    ),
  };

  const columnsWithActions: ColumnInterface[] = [...bookingColumns, actionColumn];

  return (
    <div className='bookings-page'>
      <h4 className='bookings-page__title'>Lista de Reservas</h4>
      <Select
        className='bookings-page__hotel-selector'
        placeholder='Seleccionar hotel'
        onChange={hotelChange}
        value={selectedHotel}
      >
        <Option
          className='bookings-page__hotel-selector__option'
          value=''>
          Todos los hoteles
        </Option>
        {hotelData.map(hotel => (
          <Option
            key={hotel.key}
            className='bookings-page__hotel-selector__option'
            value={hotel.key}>
            {hotel.name}
          </Option>
        ))}
      </Select>
      <Table className='bookings-page__table' columns={columnsWithActions} dataSource={filteredBookings} />
      <BookingsModalComponent open={modalBookingVisible} onCancel={closeModalBooking} bookingDetails={bookingDetails} />
    </div>
  );
};

export default BookingsPage;
