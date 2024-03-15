import { HotelInterface } from '../../utils/interfaces/hotels/HotelDataInterface' ;
import { SET_HOTELS } from '../actionTypes/hotelActionTypes';

interface HotelState {
  hotels: HotelInterface[];
}

const initialState: HotelState = {
  hotels: [],
};

const hotelReducer = (state = initialState, action: any): HotelState => {
  switch (action.type) {
    case SET_HOTELS:
      return {
        ...state,
        hotels: action.payload,
      };
    default:
      return state;
  }
};

export default hotelReducer;