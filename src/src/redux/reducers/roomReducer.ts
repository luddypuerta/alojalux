import { RoomInterface } from "../../utils/interfaces/rooms/RoomInterface";
import { SET_ROOM } from "../actionTypes/roomActionTypes";

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
    default:
      return state;
  }
};

export default roomReducer;