import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const productRoutes = Router();

productRoutes.get('/', verifyToken, ProductController.getAll);
productRoutes.get('/user', verifyToken, ProductController.getAllFromUser);
productRoutes.get('/:id', verifyToken, ProductController.get);
productRoutes.post('/new', verifyToken, ProductController.create);
productRoutes.patch('/:id/denounced', verifyToken, ProductController.updateIsDenounced);
productRoutes.patch('/:id/favorite', verifyToken, ProductController.updateIsFavorite);
productRoutes.put('/:id', verifyToken, ProductController.update);
productRoutes.delete('/:id', verifyToken, ProductController.remove);


export default productRoutes;