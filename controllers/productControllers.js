import Product from '../models/Product.js';
import Restaurant  from "../models/Restaurant.js";
import {createProductSchema,updateProductSchema} from "../validators/productValidator.js";


const isValidId = (id) => !isNaN(parseInt(id)) && parseInt(id) > 0;

export const createProduct = async (req, res,next) => {
    try{
        const {restaurantId} = req.params;
if(!isValidId(restaurantId))return res.status(400).json({success: false, error: 'Invalid or expired token'});

const restaurant= await Restaurant.findByPk(restaurantId);
if(!restaurant) return res.status(404).json({success: false, error: 'Restaurant not found'});

const {error, value} = createProductSchema.validate(req.body,{abortEarly: false});
if(error) return res.status(400).json({success: false, errors: error.details});

const product = await Product.create({...value,restaurantId: parseInt(restaurantId)});
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });
    }catch(err){
        next(err);
    }
};

export const getProductsByRestaurant = async (req, res, next) => {
    try{
   const {restaurantId} = req.params;
   if (!isValidId(restaurantId)) return res.status(400).json({success: false, error: 'Invalid restaurant id'});

   const restaurant = await Restaurant.findByPk(restaurantId);
   if (!restaurant) return res.status(404).json({ success: false, error: 'Restaurant not found' });

const products = await Product.findAll({
    where: {restaurantId},
    order: [['createdAt', 'DESC']],
})
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    }catch(err){
        next(err);
    }
};


export const getProductById = async (req, res, next) => {
    try{
        const {restaurantId,productId} = req.params;
        if (!isValidId(restaurantId) || !isValidId(productId)) {
            return res.status(400).json({success: false, error: 'Invalid ID parameters'});

        }
        const product = await Product.findOne({
        where: {id: restaurantId,restaurantId}
        });
            if (!product) return res.status(404).json({ success: false, error: 'Product not found in this restaurant' });
            res.status(200).json({ success: true, data: product });
    }catch(err){
        next(err);
    }
};

export const updateProduct = async (req, res, next) => {
    try{
      const {restaurantId,productId} = req.params;
      if (!isValidId(restaurantId) || !isValidId(productId)) {
          return res.status(400).json({success: false, error: 'Invalid id parameters'});
      }
        const product = await Product.findOne({ where: { id: productId, restaurantId } });
        if (!product) return res.status(404).json({ success: false, error: 'Product not found' });

        const { error, value } = updateProductSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ success: false, errors: error.details });

        await product.update(value)
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    }catch(err){
        next(err);
    }
};
export const deleteProduct = async (req, res, next) => {
    try{
    const {restaurantId,productId } = req.params;
        if (!isValidId(restaurantId) || !isValidId(productId)) {
            return res.status(400).json({success: false, error: 'Invalid id parameters'});
        }

        const product = await Product.findOne({ where: { id: productId, restaurantId } });
        if (!product) return res.status(404).json({ success: false, error: 'Product not found' });

        await product.destroy();

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully' });
    }catch(err){
        next(err);
    }
}























































