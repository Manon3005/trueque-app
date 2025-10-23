import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const userRoutes = Router();

userRoutes.get('/', verifyToken, UserController.getAll);
userRoutes.post('/', verifyToken, UserController.update);
userRoutes.post('/new', UserController.create);
userRoutes.post('/login', UserController.login);
userRoutes.post('/:id/suspended', verifyToken, UserController.updateIsSuspended);

export default userRoutes;