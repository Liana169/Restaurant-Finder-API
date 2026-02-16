import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Restaurant from './Restaurant.js';

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'restaurant_id'
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [2, 255]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_available'
    }
}, {
    sequelize,
    tableName: 'products',
    timestamps: true,
    underscored: true,
    modelName: 'Product'
});


Product.belongsTo(Restaurant, {
    foreignKey: 'restaurantId',
    as: 'restaurant'
});

Restaurant.hasMany(Product, {
    foreignKey: 'restaurantId',
    as: 'products',
    onDelete: 'CASCADE'
});

export default Product;