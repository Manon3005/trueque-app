import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const userRoutes = Router();

userRoutes.get('/', UserController.getAll);
userRoutes.post('/new', UserController.create);
userRoutes.post('/:id', UserController.update);
userRoutes.post('/:id/suspended', UserController.updateIsSuspended);

export default userRoutes;