import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const messageRoutes = Router();

messageRoutes.get('/', verifyToken, MessageController.getConversationList);
messageRoutes.post('/new', verifyToken, MessageController.create);
messageRoutes.get('/:user_id', verifyToken, MessageController.getConversationWithUser);

export default messageRoutes;