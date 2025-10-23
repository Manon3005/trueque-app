import { Request, Response } from 'express';
import { JsonResponse } from '../models/json-response';
import { CreateMessageDto } from '../dto/message.dto';
import { MessageRepository } from '../repositories/message.repository';
import { AuthenticatedRequest } from '../models/authenticated-request';

async function create(req: AuthenticatedRequest, res: Response) {
  try {
    const body = req.body as CreateMessageDto;

    const product = await MessageRepository.create(req.userId!, body.receiver_id, body.content);
    const result: JsonResponse = {
        code: 200,
        message: "Message created successfully.",
        data: product
    }
    res.status(200).json(result);
  } catch (error) {
    const result: JsonResponse = {
      code: 400,
      message: "Error in creating message.",
      data: null
    }
    res.status(400).json(result);
  }
};

async function getConversationWithUser(req: AuthenticatedRequest, res: Response) {
  try {
    const messages = await MessageRepository.getConversation(req.userId!, parseInt(req.params.user_id));
    await MessageRepository.updateConversationWasSeen(req.userId!, parseInt(req.params.user_id));

    const result: JsonResponse = {
      code: 200,
      message: "Messages sent successfully.",
      data: messages
    }
    res.status(200).json(result);
  } catch (error) {
    const result: JsonResponse = {
      code: 400,
      message: "Error in getting messages.",
      data: null
    }
    res.status(400).json(result);
  }
}

async function getConversationList(req: AuthenticatedRequest, res: Response) {
  try {
    const messages = await MessageRepository.getFromUser(req.userId!);
    
    let lastMessages = null;
    if (messages) {
        const latestByUser = new Map<number, typeof messages[0]>();
        for (const msg of messages) {
            const otherUserId = msg.sender_user_id === req.userId! ? msg.receiver_user_id : msg.sender_user_id;
            if (!latestByUser.has(otherUserId)) {
                latestByUser.set(otherUserId, msg);
            }
        }
        lastMessages = Array.from(latestByUser.values());
    } 
    
    const result: JsonResponse = {
      code: 200,
      message: "Messages sent successfully.",
      data: lastMessages
    }
    res.status(200).json(result);
  } catch (error) {
    const result: JsonResponse = {
      code: 400,
      message: "Error in getting messages.",
      data: null
    }
    res.status(400).json(result);
  }
}

export const MessageController = {
    create,
    getConversationWithUser,
    getConversationList
}
