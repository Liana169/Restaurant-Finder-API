import 'dotenv/config';
import {Sequelize} from 'sequelize';
import fs from 'fs/promises';
import path from 'path';


const caFilePath = path.resolve( './config/certificates/ca.pem');

const {MYSQL_HOST,
    MYSQL_DATABASE,
    MYSQL_PASSWORD,
    MYSQL_USER,
    MYSQL_PORT
}=process.env;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD,{
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
} );
try{
    await sequelize.authenticate();
    console.log('Sequelize Sequelize Connected successfully.');
} catch(error){
    console.error(error);
}
export default sequelize;


