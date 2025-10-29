import { State } from "./state";

export interface Product {
    id: number;
    title: string;
    descripcion: string;
    images?: any[];
    state: State;
    location: string;
    created_at: Date;
    userId: number;
}
