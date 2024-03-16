//Service
import { ApiService } from "../ApiService";

//Utils
import { ApiResponse } from "../../utils/interfaces/apiResponse/ApiResponseInterface";
import { RoomInterface } from "../../utils/interfaces/rooms/RoomInterface";

export const getRoomByIdService = async () => {
    const response = await ApiService.apiFetch(`room/hotel/6`, null, 'GET')
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
                    roomType:room.roomType
                }
            });
            return responseRoom
        }
    } else {
          throw errors
    }
};

