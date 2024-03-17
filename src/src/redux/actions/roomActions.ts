//Imterfaces
import { RoomInterface } from "../../utils/interfaces/rooms/RoomDataInterface";

import { SET_ROOM, RESET_ROOM } from "../actionTypes/roomActionTypes";

export interface SetRoomAction {
  type: typeof SET_ROOM;
  payload: RoomInterface[];
}

export interface ResetRoomAction {
  type: typeof RESET_ROOM;
}

export type RoomAction = SetRoomAction | ResetRoomAction;

//Setters

export const setRoom = (room: RoomInterface[]): SetRoomAction => ({
  type: SET_ROOM,
  payload: room,
});

export const resetRoom = (): ResetRoomAction => ({
  type: RESET_ROOM,
});