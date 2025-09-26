import { CategoryAPI } from "./category-api";

export interface ProductAPI {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: CategoryAPI;
}