import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const userRoutes = Router();

userRoutes.get('/', verifyToken, UserController.getAll);
userRoutes.patch('/picture', UserController.updatePicture);
userRoutes.put('/', verifyToken, UserController.update);
userRoutes.post('/new', UserController.create);
userRoutes.post('/login', UserController.login);
userRoutes.patch('/:id/suspended', verifyToken, UserController.updateIsSuspended);
userRoutes.delete('/', verifyToken, UserController.remove);

export default userRoutes;