//Service
import { ApiService } from "../ApiService";

//Utils
import { ApiResponse } from "../../utils/interfaces/apiResponse/ApiResponseInterface";
import { LoginResponseInterface, LoginInterface } from "../../utils/interfaces/login/LoginDataInterface";

export const authService = async (nickName:string, password: string) => {

    const data: LoginInterface = { nickName, password }

    const response = await ApiService.apiFetch(`auth/login`, data, 'POST')
    const {data: responsePostLogin, errors, status }: ApiResponse = await response.json()
    if (responsePostLogin && status) {
        const responseLogin: LoginResponseInterface = responsePostLogin;

        return responseLogin
    } else {
          throw errors
    }
};

