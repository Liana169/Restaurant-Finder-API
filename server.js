import dotenv from 'dotenv';
import path from 'path';
import {fileURLToPath} from 'url';

dotenv.config();

import express from 'express';
import { sequelize, connectDB } from './config/database.js';


import User from './models/Users.js';
import Restaurant from './models/Restaurant.js';
import Product from './models/Product.js';


import authRoutes from './routes/authRotes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import productRoutes from './routes/productRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/restaurants/:restaurantId/products', productRoutes);



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const startServer = async () => {
    try {
        await connectDB();

        await sequelize.sync({ alter: true });
        console.log('Database synced successfully.');


        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
};

startServer();