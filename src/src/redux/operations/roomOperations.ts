import { Dispatch } from 'redux';
import { getRoomByIdService } from '../../services/room/roomServices';
import { setRoom } from '../actions/roomActions';

export const getRoomById = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const responseRoom = await getRoomByIdService();
      dispatch(setRoom(responseRoom ? responseRoom : []));
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };
};

