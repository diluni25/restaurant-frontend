import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import healthRoutes from './routes/health.routes.js';
import adminRoutes from './routes/admin.routes.js';
import menuRoutes from './routes/menu.routes.js';
import imageRoutes from './routes/image.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import { resolve } from 'node:path';
import { notFound, errorHandler } from './middleware/error.middleware.js';

export const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: env.frontendUrl }));
app.use(express.json({ limit: '1mb' }));

app.use('/api/health', healthRoutes);

// 2. Mount admin routes here
app.use('/api/admin', adminRoutes);
app.use('/api/menu',menuRoutes);
app.use('/api/menu-images',imageRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/orders',orderRoutes);
app.use('/uploads/menu', express.static(resolve('uploads/menu'),{index:false,dotfiles:'deny'}));

// Team modules get mounted here later, for example:
// app.use('/api/auth', authRoutes);
// app.use('/api/menu', menuRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/chefs', chefRoutes);
// app.use('/api/content', contentRoutes);
// app.use('/api/images', imageRoutes);
// app.use('/api/contact', contactRoutes);

app.use(notFound);
app.use(errorHandler);