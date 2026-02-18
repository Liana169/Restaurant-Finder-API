import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

class Restaurant extends Model {}

Restaurant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                len: [3, 255]
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        cuisineType: {
            type: DataTypes.STRING(100),
            field: 'cuisine_type'
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: false,
            validate: { min: -90, max: 90 },
        },
        longitude: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: false,
            validate: { min: -180, max: 180 },
        },

        location: {
            type: DataTypes.GEOMETRY('POINT', 4326),
            allowNull: false,
        },
        rating: {
            type: DataTypes.DECIMAL(2, 1),
            defaultValue: 0,
            validate: { min: 0, max: 5 },
        },
        priceRange: {
            type: DataTypes.ENUM('$', '$$', '$$$', '$$$$'),
            defaultValue: '$$',
            field: 'price_range'
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        isOpen: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'is_open'
        },
        coverImage: {
            type: DataTypes.STRING(500),
            allowNull: true,
            defaultValue: null,
            field: 'cover_image' ,
        },
    },
    {
        sequelize,
        modelName: 'Restaurant',
        timestamps: true,
        underscored: true,
        tableName: 'restaurants',

        hooks: {
            beforeValidate: (instance) => {
                if (instance.latitude && instance.longitude) {
                    instance.location = {
                        type: 'Point',
                        coordinates: [parseFloat(instance.longitude), parseFloat(instance.latitude)],
                    };
                }
            }
        }
    }
);

export default Restaurant;