import { Dispatch } from 'redux';
import { getAllHotelsService } from '../../services/hotels/hotelsService';
import { setHotels } from '../actions/hotelActions';

export const getHotels = (city?: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const responseAllHotels = await getAllHotelsService(city || '');
      dispatch(setHotels(responseAllHotels ? responseAllHotels : []));
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };
};

