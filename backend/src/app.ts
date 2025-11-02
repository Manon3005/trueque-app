import express from 'express';
import cors, { CorsOptions } from 'cors';
import userRoutes from './routes/user.route';
import productRoutes from './routes/product.route';
import messageRoutes from './routes/message.route';

const app = express();
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({limit: '20mb', extended: true}));

const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes)
app.use('/api/messages', messageRoutes)

export default app;