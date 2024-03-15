//Service
import { ApiService } from "../ApiService";

//Utils
import { ApiResponse } from "../../utils/interfaces/apiResponse/ApiResponseInterface";
import { HotelInterface } from "../../utils/interfaces/hotels/HotelDataInterface";

export const getAllHotelsService = async () => {
    const response = await ApiService.apiFetch(`hotel`, null, 'GET')
    const {data: responseGetAllHotels, errors, status }: ApiResponse = await response.json()

    if (responseGetAllHotels && status) {
        if (Array.isArray(responseGetAllHotels)) {
            const responseAllHotels = responseGetAllHotels.map(( hotel: HotelInterface ) => {
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
                }
            });
            return responseAllHotels
        }
    } else {
          throw errors
    }
};

