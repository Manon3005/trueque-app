import { Request, Response } from 'express';
import { jsonResponse } from '../models/json-response';
import { CreateMessageDto, GetMessageFromUserDto } from '../dto/message.dto';
import { MessageRepository } from '../repositories/message.repository';

async function create(req: Request, res: Response) {
  try {
    const body = req.body as CreateMessageDto;

    const product = await MessageRepository.create(body.sender_id, body.receiver_id, body.content);
    const result: jsonResponse = {
        code: 200,
        message: "Message created successfully.",
        data: product
    }
    res.json(result);
  } catch (error) {
    const result: jsonResponse = {
      code: 400,
      message: "Error in creating message.",
      data: null
    }
    res.json(result);
  }
};

async function getConversationWithUser(req: Request, res: Response) {
  try {
    const body = req.body as GetMessageFromUserDto;
    const messages = await MessageRepository.getConversation(parseInt(req.params.user_id), body.user_id);
    await MessageRepository.updateConversationWasSeen(body.user_id, parseInt(req.params.user_id));

    const result: jsonResponse = {
      code: 200,
      message: "Messages sent successfully.",
      data: messages
    }
    res.json(result);
  } catch (error) {
    const result: jsonResponse = {
      code: 400,
      message: "Error in getting messages.",
      data: null
    }
    res.json(result);
  }
}

async function getConversationList(req: Request, res: Response) {
  try {
    const body = req.body as GetMessageFromUserDto;
    const messages = await MessageRepository.getFromUser(body.user_id);
    
    let lastMessages = null;
    if (messages) {
        const latestByUser = new Map<number, typeof messages[0]>();
        for (const msg of messages) {
            const otherUserId = msg.sender_user_id === body.user_id ? msg.receiver_user_id : msg.sender_user_id;
            if (!latestByUser.has(otherUserId)) {
                latestByUser.set(otherUserId, msg);
            }
        }
        lastMessages = Array.from(latestByUser.values());
    } 
    
    const result: jsonResponse = {
      code: 200,
      message: "Messages sent successfully.",
      data: lastMessages
    }
    res.json(result);
  } catch (error) {
    const result: jsonResponse = {
      code: 400,
      message: "Error in getting messages.",
      data: null
    }
    res.json(result);
  }
}

export const MessageController = {
    create,
    getConversationWithUser,
    getConversationList
}
