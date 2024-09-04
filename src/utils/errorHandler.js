function errorHandler(err, req, res, next) {
    console.error(err.stack);

    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err.name === 'CastError') {
        // Kesalahan akibat ID yang tidak valid
        statusCode = 400;
        message = 'Invalid ID format';
    } else if (err.name === 'ValidationError') {
        // Kesalahan validasi pada schema Mongoose
        statusCode = 400;
        message = err.message;
    } else if (err.status) {
        // Kesalahan yang sudah ditentukan dalam controller
        statusCode = err.status;
        message = err.message;
    }

    res.status(statusCode).json({ message: message });
}

module.exports = errorHandler;
