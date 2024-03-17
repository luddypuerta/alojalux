// Interfaces
export interface PackagesIncludedInterface {
    name: string;
    icon: string;
}

export interface roomTypeInterface {
    value: string;
    label: string;
}

export interface RoomInterface {
    id: number;
    idHotel: string;
    name: string;
    price: string;
    image: string;
    status: boolean;
    packagesIncluded: PackagesIncludedInterface[];
    taxes:string;
    roomType:roomTypeInterface
    location: string
}

//Data
export const typeRoomData: roomTypeInterface[] = [
    {value: '1', label: 'Sencilla'},
    {value: '2', label: 'Preferencial'},
    {value: '3', label: 'Suite'},
]

//Initial values
export const roomInitialValues: RoomInterface = {
    id: 0,
    idHotel: '',
    name: '',
    price: '',
    image: '',
    status: true,
    packagesIncluded: [],
    taxes: '',
    roomType: {value: '1', label: 'Sencilla'},
    location: ''
}


