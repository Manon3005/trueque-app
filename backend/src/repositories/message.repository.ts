import { prisma } from "../config/db";
import { Message, Prisma } from "../generated/prisma";

async function create(senderId: number, receiverId: number, content: string): Promise<Message | null> {
    return await prisma.message.create({
        data: {
            sender_user_id: senderId,
            receiver_user_id: receiverId,
            content: content
        }
    })
}

async function getConversation(firstUserId: number, secondUserId: number): Promise<Message[] | null> {
    return await prisma.message.findMany({
        where: {
            OR: [
                {
                   sender_user_id: firstUserId,
                   receiver_user_id: secondUserId
                },
                { 
                    sender_user_id: secondUserId,
                    receiver_user_id: firstUserId
                },
            ],
        }
    })
}

async function updateConversationWasSeen(userConnected: number, otherUser: number): Promise<Prisma.BatchPayload> {
    return await prisma.message.updateMany({
        data: {
            was_seen: true
        },
        where: {
            sender_user_id: otherUser,
            receiver_user_id: userConnected
        }
    })
}

async function getFromUser(userId: number): Promise<Message[] | null> {
    return await prisma.message.findMany({
        where: {
            OR: [
                { sender_user_id: userId },
                { receiver_user_id: userId },
            ],
        },
        orderBy: { sent_at: 'desc' },
        include: {
            sender: {
                select: {
                    id: true,
                    username: true,
                    is_suspended: true
                },
            },
            receiver: {
                select: {
                    id: true,
                    username: true,
                    is_suspended: true
                },
            },
        },
    })
}

export const MessageRepository = {
    create,
    getConversation,
    getFromUser,
    updateConversationWasSeen
}