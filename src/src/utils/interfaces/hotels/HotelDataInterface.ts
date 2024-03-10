export interface Hotel {
    key: string;
    name: string;
    location: string;
    stars: number;
}

export interface Column {
    title: string;
    dataIndex: string;
    key: string;
}

export const hotelData: Hotel[] = [
    {
        key: '1',
        name: 'Hotel A',
        location: 'Ciudad A',
        stars: 4,
    },
    {
        key: '2',
        name: 'Hotel B',
        location: 'Ciudad B',
        stars: 5,
    },
];

export const hotelColumns: Column[] = [
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
