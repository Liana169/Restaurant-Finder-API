import { Router } from 'express';
import {
    createProduct,
    getProductsByRestaurant,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productControllers.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router({ mergeParams: true });


router.use(authenticate);

router.post('/', createProduct);
router.get('/', getProductsByRestaurant);
router.get('/:productId', getProductById);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

export default router;