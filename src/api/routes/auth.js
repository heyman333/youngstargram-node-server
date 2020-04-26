import { Router } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';

import AuthService from '../../services/auth';
import middlewares from '../middlewares';
import LoggerInstance from '../../loaders/logger';

const route = Router();

export default (app) => {
    app.use('/auth', route);
    const authInstance = Container.get('AuthService');
    const logger = Container.get('logger');

    route.post(
        '/signup',
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                nickname: Joi.string(),
                profileurl: Joi.string(),
            }),
        }),
        async (req, res, next) => {
            logger.debug('Calling Sign-Up endpoint with body: ', req.body);

            try {
                await authInstance.SignUp(req.body);

                return res.status(201).json({ message: 'user created!' });
            } catch (e) {
                LoggerInstance.error('🔥 error: %o', e);
                return next(e);
            }
        }
    );

    route.get('/user/:id', async (req, res, next) => {
        try {
            const result = await authInstance.GetUser(req.params.id);

            if (result) {
                return res.json(result);
            }

            throw new Error();
        } catch (e) {
            LoggerInstance.error('🔥 error: %o', e);
            return next(e);
        }
    });

    route.post(
        '/update',
        celebrate({
            body: Joi.object({
                id: Joi.number().required(),
                nickname: Joi.string(),
                profileurl: Joi.string(),
                accesstoken: Joi.string(),
            }),
        }),
        async (req, res, next) => {
            try {
                const result = await authInstance.UpdateUser(req.body);

                if (result) {
                    return res.json(result);
                }

                throw new Error();
            } catch (e) {
                LoggerInstance.error('🔥 error: %o', e);
                return next(e);
            }
        }
    );

    route.post('/signin', async (req, res, next) => {
        logger.debug('Calling Sign-In endpoint with body: %o', req.body);
        try {
            const { email, password } = req.body;
            const authServiceInstance = Container.get(AuthService);
            const { user, token } = await authServiceInstance.SignIn(
                email,
                password
            );
            return res.json({ user, token }).status(200);
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });

    /**
     * @TODO Let's leave this as a place holder for now
     * The reason for a logout route could be deleting a 'push notification token'
     * so the device stops receiving push notifications after logout.
     *
     * Another use case for advance/enterprise apps, you can store a record of the jwt token
     * emitted for the session and add it to a black list.
     * It's really annoying to develop that but if you had to, please use Redis as your data store
     */
    route.post('/logout', middlewares.isAuth, (req, res, next) => {
        logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
        try {
            // @TODO AuthService.Logout(req.user) do some clever stuff
            return res.status(200).end();
        } catch (e) {
            logger.error('🔥 error %o', e);
            return next(e);
        }
    });

    route.post(
        '/delete',
        celebrate({
            body: Joi.object({
                id: Joi.number().required(),
            }),
        }),
        (req, res, next) => {
            logger.debug('Calling delete endpoint with body: ', req.body);
            authInstance.Withdraw(req.body.id);
            try {
                return res.status(200).end();
            } catch (e) {
                logger.error('🔥 error %o', e);
                return next(e);
            }
        }
    );
};
