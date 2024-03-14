//Interfaces
export interface BookingInterface {
    key: string;
    hotel: string;
    idHotel: string;
    guestName: string;
    guestEmail: string;
    guestTel: string;
    documentType: string;
    documentNumber: string;
    checkInDate: string;
    checkOutDate: string;
    roomName: string;
    typeRoom: string;
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
    { title: 'Nombre del Titular', dataIndex: 'guestName', key: 'guestName' },
    { title: 'Fecha de Entrada', dataIndex: 'checkInDate', key: 'checkInDate' },
    { title: 'Fecha de Salida', dataIndex: 'checkOutDate', key: 'checkOutDate' },
];

export const bookingData: BookingInterface[] = [
    {
        key: '1',
        hotel: 'Hotel Capital Bogotá',
        idHotel: '1',
        guestName: 'Juan Pérez',
        guestEmail: 'juan@example.com',
        guestTel: '+573005114723',
        documentType: 'CC',
        documentNumber: '12345678',
        checkInDate: '2024-03-15',
        checkOutDate: '2024-03-20',
        roomName: 'Habitación Estándar',
        typeRoom: 'Sencilla',
        guests: [
            {
                id: 1,
                name: 'Juan Pérez',
                documentType: 'DNI',
                documentNumber: '12345678',
                birthdate: '1990-05-15',
                gender: 'Masculino',
                email: 'emailjuan2@gmail.com',
                telephone: '+573006778909',
            }
        ],
        emergencyContact: {
            name: 'Ana Pérez',
            phone: '123456789',
        }
    },
    {
        key: '2',
        hotel: 'Hotel de Lujo en Medellín',
        idHotel: '2',
        guestName: 'María García',
        guestEmail: 'maria@example.com',
        guestTel: '+573005124723',
        documentType: 'DNI',
        documentNumber: '87654321',
        checkInDate: '2024-04-10',
        checkOutDate: '2024-04-15',
        roomName: 'Suite Presidencial',
        typeRoom: 'Suite',
        guests: [
            {
                id: 2,
                name: 'María García',
                documentType: 'CE',
                documentNumber: '12345678',
                birthdate: '1988-07-20',
                gender: 'Femenino',
                email: 'emailmaria1@gmail.com',
                telephone: '+573101772909',
            },
            {
                id: 3,
                name: 'Pedro García',
                documentType: 'CC',
                documentNumber: '87654321',
                birthdate: '1991-10-25',
                gender: 'Masculino',
                email: 'emailpedro3@gmail.com',
                telephone: '+573106274909',
            }
        ],
        emergencyContact: {
            name: 'José García',
            phone: '987654321',
        }
    },
    {
        key: '3',
        hotel: 'Hotel Sunshine en Cali',
        idHotel: '3',
        guestName: 'Ana Martínez',
        guestEmail: 'ana@example.com',
        guestTel: '+573103124723',
        documentType: 'CE',
        documentNumber: '13579246',
        checkInDate: '2024-05-05',
        checkOutDate: '2024-05-10',
        roomName: 'Habitación de Lujo',
        typeRoom: 'Preferencial',
        guests: [
            {
                id: 4,
                name: 'Ana Martínez',
                documentType: 'CE',
                documentNumber: '13579246',
                birthdate: '1995-02-10',
                gender: 'Femenino',
                email: 'emailana2@gmail.com',
                telephone: '+573112344909',
            },
            {
                id: 5,
                name: 'David Martínez',
                documentType: 'CC',
                documentNumber: '24681357',
                birthdate: '1993-09-18',
                gender: 'Masculino',
                email: 'emaildavid1@gmail.com',
                telephone: '+5731034562909',
            }
        ],
        emergencyContact: {
            name: 'Laura Martínez',
            phone: '123987654',
        }
    },
    {
        key: '4',
        hotel: 'Hotel Bucaramanga',
        idHotel: '4',
        guestName: 'Luis Hernández',
        guestEmail: 'luis@example.com',
        guestTel: '+573102114723',
        documentType: 'CC',
        documentNumber: '98765432',
        checkInDate: '2024-06-01',
        checkOutDate: '2024-06-05',
        roomName: 'Habitación Estándar',
        typeRoom: 'Sencilla',
        guests: [
            {
                id: 6,
                name: 'Luis Hernández',
                documentType: 'CC',
                documentNumber: '98765432',
                birthdate: '1985-12-12',
                gender: 'Masculino',
                email: 'emailluis@gmail.com',
                telephone: '+57310627409',
            }
        ],
        emergencyContact: {
            name: 'María Hernández',
            phone: '987654321',
        }
    },
    {
        key: '5',
        hotel: 'Hotel Pereira',
        idHotel: '5',
        guestName: 'Carolina Ramírez',
        guestEmail: 'carolina@example.com',
        guestTel: '+573102114123',
        documentType: 'CE',
        documentNumber: '65432198',
        checkInDate: '2024-07-10',
        checkOutDate: '2024-07-15',
        roomName: 'Habitación Deluxe',
        typeRoom: 'Suite',
        guests: [
            {
                id: 7,
                name: 'Carolina Ramírez',
                documentType: 'CE',
                documentNumber: '65432198',
                birthdate: '1992-09-25',
                gender: 'Femenino',
                email: 'emailcarolina11@gmail.com',
                telephone: '+573002321919',
            },
            {
                id: 8,
                name: 'Andrés Ramírez',
                documentType: 'CC',
                documentNumber: '36925814',
                birthdate: '1990-03-18',
                gender: 'Masculino',
                email: 'emailandres2@gmail.com',
                telephone: '+573206172909',
            }
        ],
        emergencyContact: {
            name: 'Camilo Ramírez',
            phone: '987654321',
        }
    },
    {
        key: '6',
        hotel: 'Hotel Santa Marta',
        idHotel: '6',
        guestName: 'Alejandro Gómez',
        guestEmail: 'alejandro@example.com',
        guestTel: '+573123514723',
        documentType: 'CC',
        documentNumber: '74185296',
        checkInDate: '2024-08-20',
        checkOutDate: '2024-08-25',
        roomName: 'Habitación Estándar',
        typeRoom: 'Sencilla',
        guests: [
            {
                id: 9,
                name: 'Alejandro Gómez',
                documentType: 'CC',
                documentNumber: '74185296',
                birthdate: '1987-06-08',
                gender: 'Masculino',
                email: 'emailalejandro3@gmail.com',
                telephone: '+573006172909',
            },
            {
                id: 10,
                name: 'Laura Gómez',
                documentType: 'CC',
                documentNumber: '36985214',
                birthdate: '1990-12-15',
                gender: 'Femenino',
                email: 'emaillaura2@gmail.com',
                telephone: '+573006274919',
            }
        ],
        emergencyContact: {
            name: 'María Gómez',
            phone: '987654321',
        }
    },
    {
        key: '7',
        hotel: 'Hotel Ibagué',
        idHotel: '7',
        guestName: 'Daniel López',
        guestEmail: 'daniel@example.com',
        guestTel: '+573123512713',
        documentType: 'CC',
        documentNumber: '85296314',
        checkInDate: '2024-09-15',
        checkOutDate: '2024-09-20',
        roomName: 'Habitación de Lujo',
        typeRoom: 'Preferencial',
        guests: [
            {
                id: 11,
                name: 'Daniel López',
                documentType: 'CC',
                documentNumber: '85296314',
                birthdate: '1989-10-22',
                gender: 'Masculino',
                email: 'emaildaniel2@gmail.com',
                telephone: '+573001232909',
            },
            {
                id: 12,
                name: 'Ana López',
                documentType: 'CC',
                documentNumber: '15963248',
                birthdate: '1993-04-30',
                gender: 'Femenino',
                email: 'emailana23@gmail.com',
                telephone: '+573002345619',
            }
        ],
        emergencyContact: {
            name: 'María López',
            phone: '987654321',
        }
    },
    {
        key: '8',
        hotel: 'Hotel Pereira',
        idHotel: '8',
        guestName: 'Carolina Martínez',
        guestEmail: 'carolina@example.com',
        guestTel: '+573231514723',
        documentType: 'CC',
        documentNumber: '96325874',
        checkInDate: '2024-10-10',
        checkOutDate: '2024-10-15',
        roomName: 'Habitación Estándar',
        typeRoom: 'Sencilla',
        guests: [
            {
                id: 13,
                name: 'Carolina Martínez',
                documentType: 'CC',
                documentNumber: '96325874',
                birthdate: '1992-09-12',
                gender: 'Femenino',
                email: 'emailcarolina3@gmail.com',
                telephone: '+573001224109',
            },
            {
                id: 14,
                name: 'David Martínez',
                documentType: 'CC',
                documentNumber: '25896314',
                birthdate: '1995-07-28',
                gender: 'Masculino',
                email: 'emaildavid5@gmail.com',
                telephone: '+573001222311',
            }
        ],
        emergencyContact: {
            name: 'Pedro Martínez',
            phone: '987654321',
        }
    },
    {
        key: '9',
        hotel: 'Hotel Santa Marta',
        idHotel: '9',
        guestName: 'Elena Rodríguez',
        guestEmail: 'elena@example.com',
        guestTel: '+573231512323',
        documentType: 'CC',
        documentNumber: '14785236',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        roomName: 'Habitación de Lujo',
        typeRoom: 'Preferencial',
        guests: [
            {
                id: 15,
                name: 'Elena Rodríguez',
                documentType: 'CC',
                documentNumber: '14785236',
                birthdate: '1985-03-18',
                gender: 'Femenino',
                email: 'emailelena2@gmail.com',
                telephone: '+573123473201',
            }
        ],
        emergencyContact: {
            name: 'Juan Rodríguez',
            phone: '987654321',
        }
    },
    {
        key: '10',
        hotel: 'Hotel Ibagué',
        idHotel: '10',
        guestName: 'Andrés Gutiérrez',
        guestEmail: 'andres@example.com',
        guestTel: '+573231512322',
        documentType: 'CC',
        documentNumber: '36914785',
        checkInDate: '2024-12-01',
        checkOutDate: '2024-12-06',
        roomName: 'Habitación Estándar',
        typeRoom: 'Sencilla',
        guests: [
            {
                id: 16,
                name: 'Andrés Gutiérrez',
                documentType: 'CC',
                documentNumber: '36914785',
                birthdate: '1993-08-25',
                gender: 'Masculino',
                email: 'emailandres15@gmail.com',
                telephone: '+573123456109',
            },
            {
                id: 17,
                name: 'María Gutiérrez',
                documentType: 'CC',
                documentNumber: '78596314',
                birthdate: '1995-11-30',
                gender: 'Femenino',
                email: 'emailmaria3@gmail.com',
                telephone: '+573001272934',
            }
        ],
        emergencyContact: {
            name: 'Luis Gutiérrez',
            phone: '987654321',
        }
    }
]

