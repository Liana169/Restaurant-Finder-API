import joi from 'joi';


export const createRestaurantValidator = joi.object().keys({
    name: joi.string().min(3).required(),
    description: joi.string().optional(),
    cuisine_type: joi.string().optional(),
    address: joi.string().required(),
    latitude: joi.number().min(-90).max(90).required(),
    longitude: joi.number().min(-180).max(180).required(),
    rating: joi.number().min(0).max(10).required(),
    price_range: joi.string().valid("$", "$$", "$$$", "$$$$").optional(),
    phone: joi.string().optional(),
    is_open: joi.boolean().optional(),
});

export const searchNearbyValidator = joi.object().keys({
    latitude: joi.number().min(-90).max(90).required(),
    longitude: joi.number().min(-180).max(180).required(),
    radius: joi.number().max(50).default(5),
    limit: joi.number().max(100).default(10),
    cuisine_type: joi.string().optional(),
    min_rating: joi.number().min(0).max(5).optional(),

})