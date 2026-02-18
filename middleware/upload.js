import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Users from "../models/Users.js";

const createStorage = (folderName) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            const dest = `uploads/${folderName}/`;
            fs.mkdirSync(dest, {recursive: true});
            cb(null, dest);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = path.extname(file.originalname).toLowerCase();
            cb(null, file.fieldname + '-' + uniqueSuffix + ext);
        }
    });
};

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)!'), false);
    }
};

export const uploadUserPicture = multer({
    storage: createStorage('users'),
    fileFilter: fileFilter,
    limits: {fileSize: 2 * 1024 * 1024},
});
export const uploadRestaurantImage = multer({
    storage: createStorage('restaurants'),
    fileFilter: fileFilter,
    limits: {fileSize: 5 * 1024 * 1024}
});
export const uploadProductImages = multer({
    storage: createStorage('products'),
    fileFilter: fileFilter,
    limits: {fileSize: 5 * 1024 * 1024}
});