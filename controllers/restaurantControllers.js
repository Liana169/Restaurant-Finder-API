import {sequelize} from "../config/database.js";
import { QueryTypes } from  'sequelize';
import Restaurant from '../models/Restaurant.js';
import {createRestaurantSchema,
         updateRestaurantSchema,
         nearbyQuerySchema,
         getAllQuerySchema} from "../validators/restaurantValidator.js";

export const createRestaurant = async (req, res,next) => {
    try{
         const {error, value}  =  createRestaurantSchema.validate(req.body,{abortEarly: false});
               if(error) return res.status(400).json({
                   success: false,
                   error: error.details});

               const restaurant = await Restaurant.create(value);
               const data = restaurant.toJSON();
               delete data.location  ;
                  res.status(201).json({
                        success: true,
                        message: 'Restaurant created successfully',
                        data
                         });
    }catch(err){
         next(err);
    }
};
  export const getAllRestaurants = async (req, res,next) => {
      try{
         const { error, value } = getAllQuerySchema.validate(req.query);
         if (error) return res.status(400).json({ success: false, error: error.message });

       const { page, limit, cuisineType, priceRange } = value;
        const offset = (page - 1) * limit;

        const where = {};
            if (cuisineType) where.cuisineType = cuisineType
            if (priceRange) where.priceRange = priceRange;

            const { count, rows } = await Restaurant.findAndCountAll({
                  where,
                  limit,
                  offset,
                  attributes: { exclude: ['location'] },
                  order: [['createdAt', 'DESC']]
                });
           res.status(200).json({
                 success: true,
                 count: rows.length,
                 total: count,
                 page,
                 totalPages: Math.ceil(count / limit),
                 data: rows
                    });
               
      }catch(err){
          next(err);
      }
  };

       export const getRestaurantById = async (req, res, next) => {
         try {
           const id = parseInt(req.params.id);
           if (isNaN(id) || id <= 0) return res.status(400).json({ success: false, error: 'Invalid ID' });
       
           const restaurant = await Restaurant.findByPk(id, { attributes: { exclude: ['location'] } });
           if (!restaurant) return res.status(404).json({ success: false, error: 'Restaurant not found' });
       
           res.status(200).json({ success: true, data: restaurant });
         } catch (err) {
           next(err);
         }
       };


       export const getNearbyRestaurants = async (req, res, next) => {
         try {
              const nearby = await nearbyQuerySchema.validate()
           const { latitude, longitude, radius, limit, cuisineType, minRating } = req.query;


           const query = `
             SELECT id, name, cuisine_type, address, latitude, longitude, rating, price_range, phone, is_open,
                    ROUND(ST_Distance_Sphere(location, ST_GeomFromText(CONCAT('POINT(', :lon, ' ', :lat, ')'), 4326)), 1) AS distanceMetres
             FROM restaurants
             WHERE is_open = true
             AND ST_Distance_Sphere(location, ST_GeomFromText(CONCAT('POINT(', :lon, ' ', :lat, ')'), 4326)) <= :radius
           `;


           const restaurants = await sequelize.query(query, {
             replacements: { lon: longitude, lat: latitude, radius, limit },
             type: QueryTypes.SELECT
           });

           res.status(200).json({
             success: true,
             count: restaurants.length,
             searchLocation: { latitude, longitude },
             radiusMetres: radius,
             data: restaurants
           });
         } catch (err) {
           next(err);
         }
       };



       export const updateRestaurant = async (req, res, next) => {
         try {
           const id = parseInt(req.params.id);
           if (isNaN(id)) return res.status(400).json({ success: false, error: 'Invalid ID' });

           const { error, value } = updateRestaurantSchema.validate(req.body, { abortEarly: false });
           if (error) return res.status(400).json({ success: false, errors: error.details });

           const restaurant = await Restaurant.findByPk(id);
           if (!restaurant) return res.status(404).json({ success: false, error: 'Restaurant not found' });

           await restaurant.update(value);
           await restaurant.reload({ attributes: { exclude: ['location'] } });

           res.status(200).json({ success: true, message: 'Restaurant updated successfully', data: restaurant });
         } catch (err) {
           next(err);
         }
       };



export const deleteRestaurant = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) return res.status(404).json({ success: false, error: 'Restaurant not found' });

    await restaurant.destroy();
    res.status(200).json({ success: true, message: 'Restaurant deleted successfully' });
  } catch (err) {
    next(err);
  }
};