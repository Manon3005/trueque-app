import { State } from "./state";

export interface Product {
    id: number;
    title: string;
    descripcion: string;
    images: string[];
    state: State;
    location: string;
}
