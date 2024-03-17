//Interfaces
export interface BookingInterface {
    key?: string;
    hotel: string;
    idHotel: string;
    name: string;
    email: string;
    telephone: string;
    documentType: string;
    documentNumber: string;
    checkInDate: string;
    checkOutDate: string;
    roomName: string;
    roomType: TypeRoomInterface;
    guests: GuestInterface[];
    emergencyContact: EmergencyContactInterface;
}

export interface GuestInterface {
    id: number;
    name: string;
    documentType: string;
    documentNumber: string;
    birthdate: string;
    gender: string;
    email: string;
    telephone: string;
    isTitular?: boolean; 
}

export interface EmergencyContactInterface {
    name: string;
    phone: string;
}

export interface TypeRoomInterface {
    value:string,
    label:string
}

export interface ColumnInterface {
    title: string;
    dataIndex?: string;
    key: string;
}

//Data
export const guestsColumns: ColumnInterface[] = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Fecha de Nacimiento', dataIndex: 'birthdate', key: 'birthdate' },
    { title: 'Género', dataIndex: 'gender', key: 'gender' },
    { title: 'Numero de Identificación', dataIndex: 'documentNumber', key: 'documentNumber' },
    { title: 'Correo electrónico', dataIndex: 'email', key: 'email' },
    { title: 'Teléfono', dataIndex: 'telephone', key: 'telephone' },
];

export const bookingColumns: ColumnInterface[] = [
    { title: 'Nombre del Hotel', dataIndex: 'hotel', key: 'hotel' },
    { title: 'Nombre del Titular', dataIndex: 'name', key: 'name' },
    { title: 'Fecha de Entrada', dataIndex: 'checkInDate', key: 'checkInDate' },
    { title: 'Fecha de Salida', dataIndex: 'checkOutDate', key: 'checkOutDate' },
];