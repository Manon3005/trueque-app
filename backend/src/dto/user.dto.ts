export interface CreateUserDto {
    rut: string,
    email: string,
    username: string,
    password: string,
    region: string,
    city: string
}

export interface LoginUserDto {
    email: string,
    password: string
}


export interface UpdateUserDto {
    email: string,
    username: string,
    password: string,
    region: string,
    city: string
}

export interface UpdateIsSuspendedDto {
    is_suspended: boolean
}

export interface UpdatePictureDto {
    picture: Buffer
}

export interface GetAllUserDto {
    id: number,
    rut: string,
    email: string,
    username: string,
    is_suspended: boolean
}