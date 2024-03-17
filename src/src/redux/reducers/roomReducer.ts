//Interfaces
import { RoomInterface } from "../../utils/interfaces/rooms/RoomDataInterface";

import { SET_ROOM, RESET_ROOM } from "../actionTypes/roomActionTypes";

interface RoomState {
  room: RoomInterface[];
}

const initialState: RoomState = {
  room: [],
};

const roomReducer = (state = initialState, action: any): RoomState => {
  switch (action.type) {
    case SET_ROOM:
      return {
        ...state,
        room: action.payload,
      };
    case RESET_ROOM:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default roomReducer;