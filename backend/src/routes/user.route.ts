import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const userRoutes = Router();

userRoutes.get('/', verifyToken, UserController.getAll);
userRoutes.put('/', verifyToken, UserController.update);
userRoutes.post('/new', UserController.create);
userRoutes.post('/login', UserController.login);
userRoutes.patch('/:id/suspended', verifyToken, UserController.updateIsSuspended);

export default userRoutes;