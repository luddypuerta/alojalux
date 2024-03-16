// Interfaces
export interface PackagesIncludedInterface {
    name: string;
    icon: string;
}

export interface roomTypeInterface {
    id: string;
    name: string;
}

export interface RoomInterface {
    id: number;
    idHotel: number;
    name: string;
    price: string;
    image: string;
    status: boolean;
    packagesIncluded: PackagesIncludedInterface[];
    taxes:string;
    roomType:roomTypeInterface
}


