//Components
import HotelModalComponent from './components/HotelModalComponent';

//Interfaces
import { Hotel, Column, hotelColumns, hotelData } from '../../utils/interfaces/hotels/HotelDataInterface'

//Libraries
import React, { useState } from 'react';
import { Table } from 'antd';
import { EditOutlined, EyeOutlined, StopOutlined } from '@ant-design/icons';


//Styles
import './HotelsPage.scss'

const HotelsPage: React.FC = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const openModalHotel = () => {
    setModalVisible(true);
    setIsAdding(true);
  };

  const editHotel = () => {
    setModalVisible(true);
    setIsAdding(false);
  };

  const closeModalHotel = () => {
    setModalVisible(false);
  };

  const detailsHotel = (record: Hotel) => {
    console.log(record)
  };

  const disableHotel = (record: Hotel) => {
    console.log(record)
  };

  const actionColumn = {
    title: 'Acciones',
    key: 'actions',
    dataIndex: 'actions',
    render: (record: Hotel) => (
      <div className='hotels-page__table__container-buttons'>
        <button className='hotels-page__table__button-actions' onClick={editHotel}> <EditOutlined /></button>
        <button className='hotels-page__table__button-actions' onClick={() => detailsHotel(record)}><EyeOutlined /></button>
        <button className='hotels-page__table__button-actions' onClick={() => disableHotel(record)}><StopOutlined /></button>
      </div>
    ),
  };

  const columnsWithActions: Column[] = [...hotelColumns, actionColumn];


  return (
    <div className='hotels-page'>
      <div className='grid-x align-center'>
        <button 
            className='hotels-page__button-add button'
            onClick={openModalHotel}>
            Agregar Hotel
        </button>
      </div>
      <h4>Lista de Hoteles</h4>
      <Table className='hotels-page__table' columns={columnsWithActions} dataSource={hotelData} />
      <HotelModalComponent open={modalVisible} onCancel={closeModalHotel} isAdding={isAdding} />
    </div>
  );
};

export default HotelsPage;
