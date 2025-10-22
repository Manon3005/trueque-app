import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';

const messageRoutes = Router();

messageRoutes.post('/', MessageController.getConversationList);
messageRoutes.post('/new', MessageController.create);
messageRoutes.post('/:user_id', MessageController.getConversationWithUser);

export default messageRoutes;