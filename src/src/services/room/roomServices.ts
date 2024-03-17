//Service
import { ApiService } from "../ApiService";

//Utils
import { ApiResponse } from "../../utils/interfaces/apiResponse/ApiResponseInterface";
import { RoomInterface } from "../../utils/interfaces/rooms/RoomDataInterface";

export const getRoomByIdService = async (id:string) => {
    const response = await ApiService.apiFetch(`room/hotel/${id}`, null, 'GET')
    const {data: responseGetRoomById, errors, status }: ApiResponse = await response.json()

    if (responseGetRoomById && status) {
        if (Array.isArray(responseGetRoomById)) {
            const responseRoom = responseGetRoomById.map(( room: RoomInterface ) => {
                return {
                    id:room.id,
                    idHotel:room.idHotel,
                    name:room.name,
                    price:room.price,
                    image:room.image,
                    status: room.status,
                    packagesIncluded: room.packagesIncluded,
                    taxes:room.taxes,
                    roomType:room.roomType,
                    location:room.location
                }
            });
            return responseRoom
        }
    } else {
          throw errors
    }
};

export const createRoomsService = async (data: RoomInterface[]) => {
    try {
        const response = await ApiService.apiFetch(`room`, data, 'POST');
        const { errors, status }: ApiResponse = await response.json();
        if (status) {
            return status;
        } else {
            throw errors
        }
    } catch {
        throw new Error('Error al crear las habitaciones');
    }
};
export const updateRoomsService = async (data: RoomInterface[]) => {
    try {
        const response = await ApiService.apiFetch(`room`, data, 'PATCH');
        const { errors, status }: ApiResponse = await response.json();
        if (status) {
            return status;
        } else {
            throw errors
        }
    } catch {
        throw new Error('Error al actualizar las habitaciones');
    }
};

