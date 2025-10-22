import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const productRoutes = Router();

productRoutes.get('/', ProductController.getAll);
productRoutes.post('/', ProductController.getAllWithRequest);
productRoutes.post('/:id/favorite', ProductController.updateIsFavorite);
productRoutes.post('/:id/denounced', ProductController.updateIsDenounced);
productRoutes.get('/:id', ProductController.get);
productRoutes.delete('/:id', ProductController.remove);
productRoutes.post('/new', ProductController.create);
productRoutes.post('/user', ProductController.getAllFromUser);
productRoutes.post('/:id', ProductController.update);

export default productRoutes;