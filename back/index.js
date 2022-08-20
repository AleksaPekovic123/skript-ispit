import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './auth/routes/auth.routes.js';
import entityRoutes from './database/routes/entity.routes.js';
import userRoutes from './database/routes/user.routes.js';
import reviewRoutes from './database/routes/review.routes.js';
import path from 'path';
import history from 'connect-history-api-fallback';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/auth', authRoutes);
app.use('/entities', entityRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);

const PORT = process.env.PORT || 3000;

const middleware = express.static(path.join(__dirname, 'dist'));

app.use(middleware);
app.use(history({ index: '/index.html' }));
app.use(middleware);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
