import { Dispatch } from 'redux';
import { getRoomByIdService } from '../../services/room/roomServices';
import { setRoom } from '../actions/roomActions';

export const getRoomById = (id:string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const responseRoom = await getRoomByIdService(id);
      dispatch(setRoom(responseRoom ? responseRoom : []));
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };
};

