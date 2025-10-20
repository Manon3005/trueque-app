import { State } from "../generated/prisma";

export interface CreateProductDto {
    user_id: number,
    title: string,
    description: string,
    images: Buffer[],
    state: State,
    location: string
}

export interface UpdateIsDenouncedDto {
    user_id: number,
    is_denounced: boolean
}

export interface UpdateProductDto {
    title: string,
    description: string,
    images: Buffer[],
    state: State,
    location: string
}

export interface UpdateIsFavoriteDto {
    user_id: number,
    is_favorite: boolean
}

export interface GetProductRequestDto {
    request: string 
}

export interface GetProductFromUserDto {
    user_id: number 
}