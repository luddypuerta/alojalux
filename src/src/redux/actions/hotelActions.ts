import { SET_HOTELS } from '../actionTypes/hotelActionTypes';
import { HotelInterface } from '../../utils/interfaces/hotels/HotelDataInterface';

export interface SetHotelsAction {
  type: typeof SET_HOTELS;
  payload: HotelInterface[];
}

export type HotelAction = SetHotelsAction;

export const setHotels = (hotels: HotelInterface[]): SetHotelsAction => ({
  type: SET_HOTELS,
  payload: hotels,
});