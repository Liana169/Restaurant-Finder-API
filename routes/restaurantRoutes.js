import { Router } from 'express';
import {
        createRestaurant,
        getAllRestaurants,
        getNearbyRestaurants,
        getRestaurantById,
        updateRestaurant,
        deleteRestaurant
} from '../controllers/restaurantControllers.js';

const router = Router();

router.post('/', createRestaurant);
router.get('/', getAllRestaurants);
router.get('/nearby', getNearbyRestaurants);
router.get('/:id', getRestaurantById);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

export default router;