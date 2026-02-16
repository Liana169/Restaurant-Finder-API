import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const authorHeader = req.headers.authorization;
    if (!authorHeader || !authorHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            error: 'No token provided',
        });
    }
    const token = authorHeader.split(' ')[1];

    try{
   const decoded = jwt.verify(token, process.env.SECRET);
   req.user = decoded;
   next();

    }catch (error){
        return res.status(401).json({success: false, error: 'Invalid or expired token'});

    }
}