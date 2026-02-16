import { Model, DataTypes } from "sequelize";
import { sequelize } from '../config/database.js';
import { hashPassword, comparePassword } from "../utils/hashpassword.js";

class User extends Model {
    async comparePassword(plainPassword) {
        return comparePassword(plainPassword, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 100]
        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [6, 255]
        },
    },
}, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    underscored: true,
    modelName: 'User',
    hooks: {
        beforeCreate: async (user) => {
            user.password = await hashPassword(user.password);
        }
    }
});

export default User;