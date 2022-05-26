const debug = require('debug');

// export const handleTokenError: express.ErrorRequestHandler = (err: any, req: IRequest, res: express.Response, next: express.NextFunction) => {
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).json({ message: 'The token is invalid' });
//     }
// }

const handleError = (err, req, res, next) => {
    if (!err) {
        return next();
    }
    let errorResponse = {};
    if (err.output && err.output.payload) {
        errorResponse = {
            stack: err.stack,
            error: err.output.payload.message,
            message: err.output.payload.error,
            statusCode: err.output.payload.statusCode || 404
        };
    } else {
        errorResponse = {
            stack: err.stack,
            error: err.error || err.type || err.message,
            message: err.message,
            statusCode: err.statusCode || 404
        };
    }


    debug('Error :: ');
    debug(JSON.stringify(errorResponse));
    res.status(err.statusCode ? err.statusCode : err.statusCode || 404).json(errorResponse);
    res.end();
};

module.exports = { handleError };