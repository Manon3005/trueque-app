import {Role} from './role.enum';

export interface User {
    id: number;
    rut: string;
    email: string;
    username: string;
    role: Role;
    city: string;
    region: string;
    is_suspended: boolean;
    password?: string;
}