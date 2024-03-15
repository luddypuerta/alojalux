//Service
import { ApiService } from "../ApiService";

//Utils
import { ApiResponse } from "../../utils/interfaces/apiResponse/ApiResponseInterface";
import { BookingInterface } from "../../utils/interfaces/bookings/BookingDataInterface";

export const getAllBookingsService = async () => {
    const response = await ApiService.apiFetch(`booking`, null, 'GET')
    const {data: responseGetAllBookings, errors, status }: ApiResponse = await response.json()

    if (responseGetAllBookings && status) {
        if (Array.isArray(responseGetAllBookings)) {
            const responseAllBookings = responseGetAllBookings.map(( booking: BookingInterface ) => {
                return {
                    key: booking.key,
                    hotel: booking.hotel,
                    idHotel: booking.idHotel,
                    guestName: booking.guestName,
                    guestEmail: booking.guestEmail,
                    guestTel: booking.guestTel,
                    documentType: booking.documentType,
                    documentNumber: booking.documentNumber,
                    checkInDate: booking.checkInDate,
                    checkOutDate: booking.checkOutDate,
                    roomName: booking.roomName,
                    typeRoom: booking.typeRoom,
                    guests: booking.guests,
                    emergencyContact: booking.emergencyContact,
                }
            });
            return responseAllBookings
        }
    } else {
          throw errors
    }
};
