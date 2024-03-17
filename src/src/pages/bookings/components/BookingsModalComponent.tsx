//Libraries
import React from 'react';
import { Modal, Table } from 'antd';

//Interfaces
import { BookingInterface, guestsColumns } from '../../../utils/interfaces/bookings/BookingDataInterface';

//Styles
import './BookingsModalComponent.scss'

interface BookingsModalComponentProps {
  open: boolean;
  onCancel: () => void;
  bookingDetails: BookingInterface | null;
}

const BookingsModalComponent: React.FC<BookingsModalComponentProps> = ({ open, onCancel, bookingDetails }) => {
  if (!bookingDetails) {
    return (
      <Modal title="Detalles de la Reserva" open={open} onCancel={onCancel} footer={null}>
        <p>No se encontraron detalles de reserva.</p>
      </Modal>
    );
  }

  return (
    <Modal
      title="Detalles de la Reserva"
      open={open} onCancel={onCancel}
      footer={null}
      width="600"
      style={{ maxWidth: '900px' }}
      className='booking-modal'
    >
      <div className='grid-container'>
        <div className='grid-x booking-modal__content'>
          <h5 className='cell small-12 booking-modal__title'>Datos del Titular</h5>
          <div className='cell small-12 medium-6 grid-x'>
            <label className='cell small-6 booking-modal__label'>Nombre del Hotel:</label>
            <span className='cell small-6'>{bookingDetails.hotel}</span>
          </div>
          <div className='cell small-12 medium-6 grid-x'>
            <label className='cell small-6 booking-modal__label'>Nombre del Titular:</label>
            <span className='cell small-6'>{bookingDetails.name}</span>
          </div>
          <div className='cell small-12 medium-6 grid-x'>
            <label className='cell small-6 booking-modal__label'>Correo del Titular:</label>
            <span className='cell small-6'>{bookingDetails.email}</span>
          </div>
          <div className='cell small-12 medium-6 grid-x'>
            <label className='cell small-6 booking-modal__label'>Teléfono del Titular:</label>
            <span className='cell small-6'>{bookingDetails.telephone}</span>
          </div>
          <div className='cell small-12 medium-6 grid-x'>
            <label className='cell small-6 booking-modal__label'>Fecha de Entrada:</label>
            <span className='cell small-6'>{bookingDetails.checkInDate}</span>
          </div>
          <div className='cell small-12 medium-6 grid-x'>
            <label className='cell small-6 booking-modal__label'>Fecha de Salida:</label>
            <span className='cell small-6'>{bookingDetails.checkOutDate}</span>
          </div>
          <div className='cell small-12 medium-6 grid-x'>
            <label className='cell small-6 booking-modal__label'>Nombre de la Habitación:</label>
            <span className='cell small-6'>{bookingDetails.roomName}</span>
          </div>
          <div className='cell small-12 medium-6 grid-x'>
            <label className='cell small-6 booking-modal__label'>Tipo de Habitación:</label>
            <span className='cell small-6'>{bookingDetails.roomType.label}</span>
          </div>
        </div>
        <div className='grid-x booking-modal__content'>
          <h5 className='cell small-12 booking-modal__title'>Contacto de Emergencia</h5>
          <div className='cell small-12 medium-6 grid-x'>
            <label className='cell small-6 booking-modal__label'>Nombre:</label>
            <span className='cell small-6'>{bookingDetails.emergencyContact.name}</span>
          </div>
          <div className='cell small-12 medium-6 grid-x'>
            <label className='cell small-6 booking-modal__label'>Teléfono:</label>
            <span className='cell small-6'>{bookingDetails.emergencyContact.phone}</span>
          </div>
        </div>
        <h5 className='cell small-12 booking-modal__title'>Lista de Huéspedes</h5>
        <Table
          columns={guestsColumns}
          className='booking-modal__table'
          dataSource={bookingDetails.guests.map((guest, index) => ({ ...guest, key: index }))}
        />
      </div>
    </Modal>
  );
};

export default BookingsModalComponent;
