import { SET_HOTELS } from '../actionTypes/hotelActionTypes';
import { HotelInterface } from '../../utils/interfaces/hotels/HotelDataInterface';

interface SetHotelsAction {
  type: typeof SET_HOTELS;
  payload: HotelInterface[];
}

export const setHotels = (hotels: HotelInterface[]): SetHotelsAction => ({
  type: SET_HOTELS,
  payload: hotels,
});