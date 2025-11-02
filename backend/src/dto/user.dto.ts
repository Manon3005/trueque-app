export interface CreateUserDto {
    rut: string,
    email: string,
    username: string,
    password: string,
    region: string,
    city: string
}

export interface GetUserDto {
    id: number,
    rut: string,
    email: string,
    username: string,
    region: string,
    city: string,
    picture: Uint8Array | null,
    pictureMime: string | null
}

export interface LoginUserDto {
    email: string,
    password: string
}


export interface UpdateUserDto {
    email: string,
    username: string,
    region: string,
    city: string
}

export interface UpdateIsSuspendedDto {
    is_suspended: boolean
}

export interface GetAllUserDto {
    id: number,
    rut: string,
    email: string,
    username: string,
    is_suspended: boolean
}