import 'dotenv/config';
import { Sequelize } from 'sequelize';
import fs from 'fs/promises';
import path from 'path';

const caFilePath = path.resolve('./config/certificates/ca.pem');

const {
    MYSQL_HOST,
    MYSQL_DATABASE,
    MYSQL_PASSWORD,
    MYSQL_USER,
    MYSQL_PORT
} = process.env;

export const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            ca: await fs.readFile(caFilePath),
            rejectUnauthorized: true
        }
    },
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connected successfully via Sequelize.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};
