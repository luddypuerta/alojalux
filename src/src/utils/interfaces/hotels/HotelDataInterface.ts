//Interfaces
export interface HotelInterface {
    key: string;
    name: string;
    location: string;
    stars: number;
    title: string;
    description: string;
    textOffer: string;
    price: string;
    image: string;
    packagesIncluded: PackageInterface[];
    status: boolean;
}
export interface PackageInterface {
    id: string;
    name: string;
}

export interface ColumnInterface {
    title: string;
    dataIndex?: string;
    key: string;
}

//Data

export const hotelColumns: ColumnInterface[] = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Ubicación',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'Estrellas',
        dataIndex: 'stars',
        key: 'stars',
    },
];


//Initial Values
export const hotelInitialValues: HotelInterface = {
    key: '',
    name: '',
    location: '',
    stars: 0,
    title: '',
    description: '',
    textOffer: '',
    price: '',
    image: '',
    packagesIncluded: [],
    status: true
}
