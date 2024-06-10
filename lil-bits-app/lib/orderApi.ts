import axios, { AxiosResponse } from 'axios';
import { OrderRequest, OrderItem, OrderResponse } from './utils';

export type Provision = {
    id: string;
    name: string;
    description: string;
    imageSource: string;
    price: number;
    category: string;
    amount: number;
};

export type Dish = Provision & {
    cousine: string;
};

export type Drink = Provision & {
    brewer: string;
};

export type Order = {
    id: number;
    name: string;
    email: string;
    dishes: Dish[];
    drinks: Drink[];
    count: number;
    date: Date;
};

export type OrderInput = Omit<Order, 'id'>;

export type DeleteOrderApiResponse =
    | { success: true; deletedorder: Order }
    | { success: false; error: string };

export type OrderApiResponse = { success: true; order: Order } | { success: false; error: string };

const axiosInstance = axios.create({ baseURL: 'http://localhost:3001' });

export const createOrder = async (order: OrderRequest): Promise<void> => {
    await axiosInstance.post<OrderApiResponse, AxiosResponse<OrderApiResponse>, OrderInput>(
        '/api/create-order',
        convertItemsResponseToOrder(order)
    );
};

export const getOrdersByEmail = async (email: string): Promise<OrderResponse[]> => {
    const response = await axiosInstance.get<Order[]>(`/api/order/${email}`);

    const items: OrderResponse[] = response.data.flatMap((data) => ({
        name: data.name,
        count: data.count,
        id: data.id,
        email: data.email,
        items: [...data.dishes.map(convertToOrderItems), ...data.drinks.map(convertToOrderItems)],
        date: data.date.toString(),
    }));
    console.log(items);
    return items;
};

export const deleteOrder = async (idOrEmail: number | string): Promise<DeleteOrderApiResponse> => {
    const response = await axiosInstance.delete<DeleteOrderApiResponse>(`/api/order/${idOrEmail}`);
    return response.data;
};

const convertToOrderItems = (provision: Dish | Drink): OrderItem => ({
    id: provision.id,
    name: provision.name,
    price: provision.price,
    type: 'cousine' in provision ? 'dish' : 'drink',
    amount: provision.amount,
    thumbnail: provision.imageSource,
});

const convertItemsResponseToOrder = (itemsResponse: OrderRequest): OrderInput => {
    const convertOrderItemToProvision = (item: OrderItem): Dish | Drink => {
        const baseProvision: Provision = {
            id: item.id,
            name: item.name,
            description: '',
            imageSource: item.thumbnail,
            price: item.price,
            category: '',
            amount: item.amount,
        };

        if (item.type === 'dish') {
            return { ...baseProvision, cousine: '' } as Dish;
        } else {
            return { ...baseProvision, brewer: '' } as Drink;
        }
    };

    const dishItems = itemsResponse.items.filter((item) => item.type === 'dish');
    const drinkItems = itemsResponse.items.filter((item) => item.type === 'drink');

    const dishes: Dish[] = dishItems.map((item) => convertOrderItemToProvision(item) as Dish);
    const drinks: Drink[] = drinkItems.map((item) => convertOrderItemToProvision(item) as Drink);

    return {
        name: itemsResponse.name,
        email: itemsResponse.email,
        dishes,
        drinks,
        count: itemsResponse.count,
        date: new Date(itemsResponse.date),
    };
};
