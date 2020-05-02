import jwt from 'jsonwebtoken';
import config from '../../config';
import Logger from '../../loaders/logger';

class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
        this.status = 401;
    }
}

const isAuth = (needAuthData) => (req, res, next) => {
    if (!req.headers.authorization) {
        next(new AuthError('unauthrized'));
        return;
    }

    if (req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            Logger.info(`token decoded ${JSON.stringify(decoded)}`);

            if (needAuthData && decoded) {
                next(decoded);
                return;
            }

            if (decoded) {
                next();
                return;
            }

            if (err) {
                next(err);
            }
        });
    } else {
        next(new AuthError('unauthrized'));
    }
};

export default isAuth;
