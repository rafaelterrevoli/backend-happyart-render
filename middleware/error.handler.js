
const errorlogs = (err, req, res, next) => {
    console.error('errorlogs', err);
    next(err);
}

const errorHandler = (err, req, res, next) => {
    console.error('errorHandler', err);
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
}

module.exports = {
    errorHandler,
    errorlogs
}