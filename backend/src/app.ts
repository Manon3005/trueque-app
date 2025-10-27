import express from 'express';
import userRoutes from './routes/user.route';
import productRoutes from './routes/product.route';
import messageRoutes from './routes/message.route';

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes)
app.use('/api/messages', messageRoutes)

export default app;