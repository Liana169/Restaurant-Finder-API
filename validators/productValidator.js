import Joi  from "joi";

export const createProductSchema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().optional(),
    price: Joi.number().min(0).required(),
    category: Joi.string().min(10).required(),
    isAvailable: Joi.boolean().optional()
});

export const updateProductSchema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().optional(),
    price: Joi.number().min(0).required(),
    category: Joi.string().min(10).required(),
    isAvailable: Joi.boolean().optional()
})