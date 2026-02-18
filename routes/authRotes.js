import { Router } from 'express';
import { register, login } from '../controllers/authControllers.js';
import {uploadUserPicture} from "../middleware/upload.js";
import {authenticate} from "../middleware/authMiddleware.js";
import {updateRestaurant} from "../controllers/restaurantControllers.js";

const router = Router();
router.post('/register', uploadUserPicture.single('profilePicture'), register);
router.post('/register', register);
router.post('/login', login);
router.patch('/picture',authenticate,uploadUserPicture.single('profilePicture'),updateRestaurant);

export default router;