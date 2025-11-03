import { State } from "./state";

export interface Product {
    id: number;
    title: string;
    description: string;
    images: string[];
    state: string;
    location: string;
    created_at: Date;
    user?: string;
    isFavorite?: boolean;
    user_id?: number;
}
