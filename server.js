import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import Restaurant from './models/Restaurant.js';

dotenv.config();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/restaurants', restaurantRoutes);
app.get('/', (req, res) => {
    res.send('Restaurant Finder API is running...');
});

const PORT = 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        await Restaurant.seedIfEmpty();

        app.listen(PORT, () => {
            console.log(`Server is running: http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Server start error:', error);
        process.exit(1);
    }
};

startServer();