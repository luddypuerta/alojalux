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
                    name: booking.name,
                    email: booking.email,
                    telephone: booking.telephone,
                    documentType: booking.documentType,
                    documentNumber: booking.documentNumber,
                    checkInDate: booking.checkInDate,
                    checkOutDate: booking.checkOutDate,
                    roomName: booking.roomName,
                    roomType: booking.roomType,
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


export const createBookingsService = async (data:BookingInterface) => {
    const response = await ApiService.apiFetch(`booking`, data, 'POST')
    await response.json()
};
