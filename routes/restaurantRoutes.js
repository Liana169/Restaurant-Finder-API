import express from 'express'
import {createRestaurant,getAllRestaurants,
        getRestaurantById,findNearbyRestaurants,
        updateRestaurant,   deleteRestaurant} from '../controllers/restaurantControllers.js';

const router = express.Router();

router.get('/', createRestaurant);
router.get('/',getAllRestaurants);
router.get('/:id', getRestaurantById);
router.get('/nearby', findNearbyRestaurants);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

export default router;