import { configureStore } from '@reduxjs/toolkit';
import hotelReducer from './reducers/hotelReducer';
import roomReducer from './reducers/roomReducer';

const store = configureStore({
  reducer: {
    hotels: hotelReducer,
    room: roomReducer
  }
});

export default store;
