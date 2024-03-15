//Service
import { ApiService } from "../ApiService";

//Utils
import { ApiResponse } from "../../utils/interfaces/apiResponse/ApiResponseInterface";
import { CardSiteInterface } from '../../utils/interfaces/home/CardDataInterface';
import { SiteListInterface } from '../../utils/interfaces/home/SiteListDataInterface';

export const getDataSitesService = async (filter:string) => {
    const response = await ApiService.apiFetch(`site/filter?siteName=${filter}`, null, 'GET')
    const {data: responseGetSites, errors, status }: ApiResponse = await response.json()
    if (responseGetSites && status) {
        const responseSites = responseGetSites.map(( site: SiteListInterface ) => {
            return {
                label: site.site,
                value: site.site
            }
        })
        return responseSites
    } else {
          throw errors
    }
};

export const getAllSitesService = async () => {
    const response = await ApiService.apiFetch(`site`, null, 'GET')
    const {data: responseGetSites, errors, status }: ApiResponse = await response.json()
    if (responseGetSites && status) {
        const responseSites = responseGetSites.map(( site: CardSiteInterface ) => {
            return {
                site: site.site,
                country: site.country,
                image: site.image
            }
        })
        return responseSites
    } else {
          throw errors
    }
};

