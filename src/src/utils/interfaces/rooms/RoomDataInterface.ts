//Interfaces
export interface RoomData {
    roomName: string;
    roomType: string;
    baseCost: number;
    taxes: number;
    images: any[];
    location : string;
    status: boolean;
}

export interface TypeRoom {
    id: string;
    name: string;
}

//Data
export const typeRoomData: TypeRoom[] = [
    {id: '1', name: 'Sencilla'},
    {id: '2', name: 'Preferencial'},
    {id: '3', name: 'Suite'},
]


