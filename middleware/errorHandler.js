import multer from 'multer';
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            error: 'File too large',
            message: 'Max allowed file size: 2MB for profile'
        });
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
            success: false,
            error: 'Unexpected file fiel',
            message: 'Check the field name used in your request'
        });
    }

    if(err.message === 'Only image files are allowed(jpeg, jpg, png, gif, webp)'){
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            success: false,
            error: 'Validation Error',
            details: err.errors.map(e => ({ field: e.path, message: e.message }))
        });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            success: false,
            error: 'Duplicate entry'
        });
    }

    if (err.name === 'SequelizeDatabaseError') {
        return res.status(500).json({
            success: false,
            error: 'Database error',
            message: err.message
        });
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        error: statusCode === 500 ? 'Internal server error' : 'Error',
        message: err.message
    });

};

export default errorHandler;
