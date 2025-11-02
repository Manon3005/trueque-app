import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import multer from 'multer';
const upload = multer();

const userRoutes = Router();

userRoutes.get('/me', verifyToken, UserController.get);
userRoutes.get('/', verifyToken, UserController.getAll);
userRoutes.patch('/picture', verifyToken, upload.single('picture'), UserController.updatePicture);
userRoutes.put('/', verifyToken, UserController.update);
userRoutes.post('/new', UserController.create);
userRoutes.post('/login', UserController.login);
userRoutes.patch('/:id/suspended', verifyToken, UserController.updateIsSuspended);
userRoutes.delete('/', verifyToken, UserController.remove);

export default userRoutes;