import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import multer from 'multer';
const upload = multer();

const productRoutes = Router();

productRoutes.get('/', verifyToken, ProductController.getAll);
productRoutes.get('/user', verifyToken, ProductController.getAllFromUser);
productRoutes.get('/favorite', verifyToken, ProductController.getUserFavorite);
productRoutes.get('/denounced', verifyToken, ProductController.getDenounced);
productRoutes.get('/:id', verifyToken, ProductController.get);
productRoutes.post('/new', verifyToken, upload.array('images', 3), ProductController.create);
productRoutes.patch('/denounced/:id', verifyToken, ProductController.updateIsDenounced);
productRoutes.patch('/favorite/:id', verifyToken, ProductController.updateIsFavorite);
productRoutes.put('/:id', verifyToken, ProductController.update);
productRoutes.delete('/:id', verifyToken, ProductController.remove);


export default productRoutes;