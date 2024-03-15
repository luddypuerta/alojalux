import { configureStore } from '@reduxjs/toolkit';
import hotelReducer from './reducers/hotelReducer';

const store = configureStore({
  reducer: {
    hotels: hotelReducer,
  }
});

export default store;
