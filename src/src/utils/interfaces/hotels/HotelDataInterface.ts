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
export const hotelData: HotelInterface[] = [
    {
        key: '1',
        stars: 5,
        name: "Hotel Capital Bogotá",
        location: "Bogotá",
        title: "Estancia confortable en la capital",
        description: "Disfruta de una estancia cómoda y conveniente en el corazón de Bogotá.",
        textOffer: "¡Reserva ahora y obtén un desayuno gratis!",
        price: "COP 280.000",
        image: "/hotel-capital-bogota.jpg",
        packagesIncluded: [
            {
               id: '1',
               name:  "Wifi gratuito",
            },
            {
                id: '2',
                name:  "Desayuno gratis",
            }
        ],
        status: true
    },
    {
        key: '2',
        stars: 4,
        name: "Medellín Grand Hotel",
        location: "Medellín",
        title: "Lujo urbano en Medellín",
        description: "Sumérgete en el lujo y la vibrante vida urbana de Medellín en nuestro hotel de primera clase.",
        textOffer: "¡Reserva ahora y recibe una upgrade de habitación gratuita!",
        price: "COP 320.000",
        image: "/medellin-grand-hotel.jpg",
        packagesIncluded: [
            {
                id: '3',
                name: "Wifi gratuito",
            },
            {
                id: '4',
                name: "Upgrade de habitación gratuita",
            }
        ],
        status: true
    },
    {
        key: '3',
        stars: 3,
        name: "Cali Sunshine Hotel",
        location: "Cali",
        title: "Descubre la alegría de Cali",
        description: "Experimenta la alegría y la energía de Cali desde la comodidad de nuestro hotel.",
        textOffer: "¡Reserva ahora y obtén un masaje relajante de cortesía!",
        price: "COP 300.000",
        image: "/cali-sunshine-hotel.jpg",
        packagesIncluded: [
            {
                id: '5',
                name:  "Servicios de spa",
            },
            {
                id: '6',
                name: "Masaje relajante de cortesía",
            }
        ],
        status: true
    },
    {
        key: '4',
        stars: 4,
        name: "Barranquilla Beach Resort",
        location: "Barranquilla",
        title: "Relájate junto al mar",
        description: "Relájate y rejuvenece en nuestro resort frente al mar en Barranquilla.",
        textOffer: "¡Reserva ahora y recibe un 15% de descuento en tratamientos de spa!",
        price: "COP 350.000",
        image: "/barranquilla-beach-resort.jpg",
        packagesIncluded: [
            {
                id: '7',
                name: "Acceso directo a la playa",
            },
            {
                id: '8',
                name: "15% de descuento en tratamientos de spa",
            }
        ],
        status: true
    },
    {
        key: '5',
        stars: 5,
        name: "Cartagena Colonial Hotel",
        location: "Cartagena",
        title: "Explora la magia de Cartagena",
        description: "Sumérgete en la historia y el encanto colonial de Cartagena en nuestro hotel boutique.",
        textOffer: "¡Reserva ahora y disfruta de un recorrido gratuito por la ciudad!",
        price: "COP 400.000",
        image: "/cartagena-colonial-hotel.jpg",
        packagesIncluded: [
            {
                id: '9',
                name: "Recorrido gratuito por la ciudad",
            },
            {
                id: '10',
                name: "Experiencia colonial única",
            }
        ],
        status: true
    },
    {
        key: '6',
        stars: 3,
        name: "Cúcuta Plaza Hotel",
        location: "Cúcuta",
        title: "Descubre Cúcuta en comodidad",
        description: "Explora la ciudad fronteriza de Cúcuta desde la comodidad de nuestro hotel céntrico.",
        textOffer: "¡Reserva ahora y obtén un 10% de descuento en comidas!",
        price: "COP 260.000",
        image: "/cucuta-plaza-hotel.jpg",
        packagesIncluded: [
            {
                id: '11',
                name: "Descuento del 10% en comidas",
            },
            {
                id: '12',
                name: "Ubicación céntrica",
            } 
        ],
        status: true
    },
    {
        key: '7',
        stars: 5,
        name: "Bucaramanga Mountain Retreat",
        location: "Bucaramanga",
        title: "Escápate a la naturaleza",
        description: "Disfruta de una escapada tranquila y relajante en las montañas de Bucaramanga.",
        textOffer: "¡Reserva ahora y recibe una noche adicional gratis!",
        price: "COP 380.000",
        image: "/bucaramanga-mountain-retreat.jpg",
        packagesIncluded: [
            {
                id: '13',
                name: "Vistas panorámicas a las montañas",
            },
            {
                id: '14',
                name: "Noche adicional gratis",
            } 
        ],
        status: true
    },
    {
        key: '8',
        stars: 3,
        name: "Pereira Valley Resort",
        location: "Pereira",
        title: "Retiro en el valle de Pereira",
        description: "Disfruta de la serenidad del valle de Pereira en nuestro resort de lujo.",
        textOffer: "¡Reserva ahora y obtén un masaje de bienvenida gratuito!",
        price: "COP 340.000",
        image: "/pereira-valley-resort.jpg",
        packagesIncluded: [
            {
                id: '15',
                name: "Entorno natural tranquilo",
            },
            {
                id: '16',
                name: "Masaje de bienvenida gratuito",
            } 
        ],
        status: true
    },
    {
        key: '9',
        stars: 5,
        name: "Santa Marta Beachfront Hotel",
        location: "Santa Marta",
        title: "Lujo frente al mar en Santa Marta",
        description: "Disfruta de unas vacaciones de ensueño frente al mar en nuestro hotel de primera clase en Santa Marta.",
        textOffer: "¡Reserva ahora y obtén un cocktail de bienvenida gratis!",
        price: "COP 420.000",
        image: "/santa-marta-beachfront-hotel.jpg",
        packagesIncluded: [
            {
                id: '17',
                name:  "Acceso directo a la playa",
            },
            {
                id: '18',
                name: "Cocktail de bienvenida gratis"
            } 
        ],
        status: true
    },
    {
        key: '10',
        stars: 5,
        name: "Ibagué Green Valley Resort",
        location: "Ibagué",
        title: "Retiro tranquilo en Ibagué",
        description: "Escápate del ajetreo y el bullicio de la ciudad y sumérgete en la tranquilidad de nuestro resort en Ibagué.",
        textOffer: "¡Reserva ahora y obtén un paseo en bicicleta gratuito por el valle!",
        price: "COP 300.000",
        image: "/ibague-green-valley-resort.jpg",
        packagesIncluded: [
            {
                id: '19',
                name: "Paseo en bicicleta por el valle",
            },
            {
                id: '20',
                name: "Ambiente tranquilo y relajado",
            } 
        ],
        status: true
    }
];

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
