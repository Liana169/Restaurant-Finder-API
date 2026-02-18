import { Router } from 'express';
import {
        createRestaurant,
        getAllRestaurants,
        getNearbyRestaurants,
        getRestaurantById,
        updateRestaurant,
        deleteRestaurant
} from '../controllers/restaurantControllers.js';
import {uploadRestaurantImage} from "../middleware/upload.js";
import {authenticate} from "../middleware/authMiddleware.js";

const router = Router();
router.post('/',authenticate, uploadRestaurantImage.single('coverImage'),createRestaurant);
router.post('/:id',authenticate,uploadRestaurantImage.single('coverImage'), updateRestaurant);
router.get('/', getAllRestaurants);
router.get('/nearby', getNearbyRestaurants);
router.get('/:id', getRestaurantById);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

export default router;