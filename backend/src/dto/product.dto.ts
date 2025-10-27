import { State } from "../generated/prisma";

export interface CreateProductDto {
    title: string,
    description: string,
    images: Buffer[],
    state: State,
    location: string
}

export interface UpdateIsDenouncedDto {
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
    is_favorite: boolean
}

export interface GetProductRequestDto {
    request: string 
}