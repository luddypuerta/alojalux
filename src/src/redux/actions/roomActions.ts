import { SET_ROOM } from "../actionTypes/roomActionTypes";
import { RoomInterface } from "../../utils/interfaces/rooms/RoomInterface";

interface SetRoomAction {
  type: typeof SET_ROOM;
  payload: RoomInterface[];
}

export const setRoom = (room: RoomInterface[]): SetRoomAction => ({
  type: SET_ROOM,
  payload: room,
});