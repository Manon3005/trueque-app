import express from 'express';
import cors, { CorsOptions } from 'cors';
import userRoutes from './routes/user.route';
import productRoutes from './routes/product.route';
import messageRoutes from './routes/message.route';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { Role } from './generated/prisma';

const app = express();
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({limit: '20mb', extended: true}));

const corsOptions: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes)
app.use('/api/messages', messageRoutes)

export default app;

async function ensureAdminExists() {
  const adminEmail = "admin@trueque.com";

  const admin = await UserRepository.getByEmail(adminEmail)

  if (!admin) {
    UserRepository.create(
      "00000000-0",
      adminEmail,
      "Admin",
      await bcrypt.hash("ADmin123", 2),
      "Región Metropolitana de Santiago",
      "Santiago",
      Role.ADMIN
    )
  }
}

ensureAdminExists();