import { Product } from "./product";
import { User } from "./user";

export interface PaginatedUser {
    users: Partial<User>[];
    totalPage: number;
}

export interface PaginatedProduct {
    products: Partial<Product>[];
    totalPage: number;
}