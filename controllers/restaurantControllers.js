import Restaurant  from "../models/Restaurant.js";
import {calculateDistance} from "../utils/distanceCalculator.js";


export const createRestaurant = async (req, res) => {
    try{
        const{name, address, cuisine}= req.body;

        if(!name || !address || !cuisine){
            return res.status(400).json({
                success: false,
                error: 'Please enter a valid name'
            });
        }
        const Restaurant = await Restaurant.create(req.body);

        res.status(201).json({
            success: true,
            data: Restaurant,
            message: 'Restaurant created successfully.'
        })
    }catch(error){
        console.error('Error creating Restaurant', error)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


export const getAllRestaurants = async(req,res)=>{
    try{

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const where = {};
    if(req.query.cuisine_type) where.cuisine_type = req.query.cuisine_type;
    if(req.query.price_range)where.price_range = req.query.price_range;

const {rows,count} = await Restaurant.findAndCountAll({
    where,
    offset,
    limit,
})
res.json({
    success: true,
    data: rows,
    count: rows.length,
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
})

}catch (error){
    res.status(500).json({success: false,
        error: 'server error',
    })
}
};


export const getRestaurantById = async(req,res)=>{
    try{
const restaurant = await Restaurant.findByPk(req.params.id);
if(!restaurant)
    return res.status(404).json({success: false,
        message: 'No restaurant found.'
    })
    res.json({success: true,
        data: restaurant})
    }catch(error){
res.status(500).json({success: false,
    error: 'server error',
})
    }
}

export const findNearbyRestaurants  = async(req,res)=>{
const latitude =parseFloat(req.query.latitude) ;
const longitude = parseFloat(req.query.longitude) ;
const radius = parseFloat(req.query.radius) ;


const nearby = restaurantsData.filter(r => r.is_open).map(r =>({
    ...r,
    distance: calculateDistance(latitude, longitude,r.latitude,r.longitude),
    distance_unit: 'km'
}))
    .filter(r=> r.distance <=radius)
    .sort((a, b) => a.distance - a.distance)

    res.json({
        success: true,
        count: nearby.length,
        search_location: { latitude, longitude },
        radius,
        unit: "km",
        data: nearby,
    });
}

export const updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);

        if (!restaurant)
            return res.status(404).json({ success: false, error: "Restaurant not found" });

        await restaurant.update(req.body);

        res.json({
            success: true,
            message: "Restaurant updated successfully",
            data: restaurant,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};

export const deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);

        if (!restaurant)
            return res.status(404).json({ success: false,
                error: "Restaurant not found"
            });

        await restaurant.update({ is_open: false });

        res.json({ success: true,
            message: "Restaurant deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};