export interface CreateMessageDto {
    sender_id: number,
    receiver_id: number,
    content: string
}

export interface GetMessageFromUserDto {
    user_id: number
}