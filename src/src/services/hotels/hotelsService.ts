//Service
import { ApiService } from "../ApiService";

//Utils
import { ApiResponse } from "../../utils/interfaces/apiResponse/ApiResponseInterface";
import { HotelInterface } from "../../utils/interfaces/hotels/HotelDataInterface";

export const getAllHotelsService = async (city?: string) => {
    try {
        const response = await ApiService.apiFetch(`hotel?location=${city}`, null, 'GET');
        const { data: responseGetAllHotels, errors, status }: ApiResponse = await response.json();

        if (responseGetAllHotels && status) {
            if (Array.isArray(responseGetAllHotels)) {
                const responseAllHotels = responseGetAllHotels.map((hotel: HotelInterface) => {
                    return {
                        key: hotel.key,
                        name: hotel.name,
                        location: hotel.location,
                        stars: hotel.stars,
                        title: hotel.title,
                        description: hotel.description,
                        textOffer: hotel.textOffer,
                        price: hotel.price,
                        image: hotel.image,
                        packagesIncluded: hotel.packagesIncluded,
                        status: hotel.status
                    };
                });
                return responseAllHotels;
            }
        } else {
            throw errors;
        }
    } catch (error) {
        throw error;
    }
};


export const createHotelService = async (data: HotelInterface) => {
    try {
        const response = await ApiService.apiFetch(`hotel`, data, 'POST');
        const { data: responseCreateHotels, errors, status }: ApiResponse = await response.json();

        if (responseCreateHotels && status) {
            return responseCreateHotels;
        } else {
            throw errors
        }
    } catch {
        throw new Error('Error al crear el hotel');
    }
};

export const updateHotelService = async (hotel: HotelInterface) => {
    try {
        const response = await ApiService.apiFetch(`hotel/${hotel.key}`, hotel, 'PATCH');
        const { errors, status }: ApiResponse = await response.json();
        if (status) {
            return status;
        } else {
            throw errors
        }
    } catch {
        throw new Error('Error al actualizar el hotel');
    }
};

