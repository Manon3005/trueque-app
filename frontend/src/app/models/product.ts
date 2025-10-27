import { State } from "./state";

export interface Product {
    id: number;
    title: string;
    description: string;
    images: string[];
    state: string;
    location: string;
    username: string;
}
