import { Router } from 'express';
import {
    createProduct,
    getProductsByRestaurant,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productControllers.js';
import { authenticate } from '../middleware/authMiddleware.js';
import {uploadProductImages} from "../middleware/upload.js";

const router = Router({ mergeParams: true });
router.post('/',authenticate, uploadProductImages.array('images', 5), createProduct);
router.put('/:id',authenticate, uploadProductImages.array('images', 5), updateProduct);


router.use(authenticate);
router.post('/', createProduct);
router.get('/', getProductsByRestaurant);
router.get('/:productId', getProductById);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

export default router;