import { Router } from 'express';
import { getAll } from '../controllers/user.controller';

const userRoutes = Router();

userRoutes.get('/', getAll);

export default userRoutes;