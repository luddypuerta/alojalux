//Components
import BookingsModalComponent from './components/BookingsModalComponent';

//Interfaces
import { BookingInterface, ColumnInterface, bookingColumns } from '../../utils/interfaces/bookings/BookingDataInterface';
import { hotelData } from '../../utils/interfaces/hotels/HotelDataInterface'

//Libraries
import React, { useEffect, useState } from 'react';
import { Table, Button, Select } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

//Services
import { getAllBookingsService } from '../../services/bookings/bookingsService';

//Styles
import './BookingsPage.scss';

//Utils
import ErrorAlertComponent from '../../utils/alerts/error-alert.component';

const { Option } = Select;

const BookingsPage: React.FC = () => {
  const [selectedHotel, setSelectedHotel] = useState<string>('');
  const [modalBookingVisible, setModalBookingVisible] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingInterface | null>(null);
  const [bookingList, setBookings] = useState<BookingInterface[]>([]);


  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const responseAllBookings = await getAllBookingsService()
      setBookings(responseAllBookings ? responseAllBookings : []);
    } catch (error) {
      ErrorAlertComponent()
    }
  };

  const hotelChange = (value: string) => {
    setSelectedHotel(value);
  };

  const viewBookingDetails = (element: BookingInterface) => {
    setBookingDetails(element);
    setModalBookingVisible(true);
  };

  const closeModalBooking = () => {
    setModalBookingVisible(false);
  };

  const filteredBookings = selectedHotel ? bookingList.filter(data => data.idHotel === selectedHotel) : bookingList;

  const actionColumn = {
    title: 'Acciones',
    key: 'actions',
    render: (record: BookingInterface) => (
      <div className='bookings-page__table__container-buttons'>
        <Button className='bookings-page__table__button-actions' onClick={() => viewBookingDetails(record)} icon={<EyeOutlined />}></Button>
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
