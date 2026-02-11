import { DataTypes, Model } from 'sequelize';
import db from '../config/database.js';


class Restaurant extends Model {
    static async seedIfEmpty() {
        const count = await this.count();
        if (count > 0) {
            console.log("Restaurants table already has data");
            return;
        }
        await this.bulkCreate([
            {
                name: "Pizza Palace",
                description: "Best pizza in town",
                cuisine_type: "Italian",
                address: "123 Main St, New York",
                latitude: 40.7128,
                longitude: -74.0060,
                rating: 4.5,
                price_range: "$$",
                phone: "+1-111-111-1111",
                is_open: true,
            },
        ]);
    }
}

Restaurant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        cuisine_type: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.DECIMAL(),
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DECIMAL(),
            allowNull: false,
        },
        rating: {
            type: DataTypes.DECIMAL(),
            defaultValue: 0,
        },
        price_range: {
            type: DataTypes.ENUM('$', '$$', '$$$', ''),
        },
        phone: {
            type: DataTypes.STRING,
        },
        is_open: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    },
    {
        sequelize: db,
        modelName: 'restaurant',
        tableName: 'restaurant',
        timestamps: true
    }
);

export default Restaurant;