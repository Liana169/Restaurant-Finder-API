import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import { registerSchema, loginSchema} from "../validators/authValidator.js";


export const register = async (req, res,next) => {
    try {
        const {email, value} = registerSchema.validate(req.body, {abortEarly: false});
        if (error) return res.status(400).json({success: false, errors: error.details});


        const exitingUser = await User.findOne({where: {email: value.email}})
        if (exitingUser) {
            return res.status(409).json({success: false, error: 'Email already registered'});

        }
        const user = await User.create(value)
        const token = jwt.sign({id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            data: {id: user.id, username: user.username, email: user.email},
        });
    }catch(err){
        next(err);
    }
};
export const login = async (req, res,next) => {
    try {
        const {error, value} = loginSchema.validate(req.body);
        if (error) return res.status(400).json({success: false, error: error.message});

        const user = await User.findOne({where: {email: value.email}});
        if (!user) {
            return res.status(401).json({success: false, error: 'Invalid credentials'});

        }
        const isMatch = await user.comparePassword(value.password);
        if (!isMatch) {
            return res.status(401).json({success: false, error: 'Invalid credentials'});
        }
        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            data: {id: user.id, username: user.username, email: user.email}
        });
    } catch (err) {
        next(err);
    }
}
