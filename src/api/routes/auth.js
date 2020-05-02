import { Router } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';

import AuthService from '../../services/auth';
import middlewares from '../middlewares';
import LoggerInstance from '../../loaders/logger';

const route = Router();

export default (app) => {
    app.use('/auth', route);
    const authInstance = new AuthService();
    const logger = Container.get('logger');

    route.get('/', (req, res) => {
        res.status(200);
    });

    route.post(
        '/signup',
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                password: Joi.string()
                    .regex(/\S{6,12}/)
                    .required(),
                nickname: Joi.string(),
                profileurl: Joi.string(),
            }),
        }),
        async (req, res, next) => {
            logger.debug('Calling Sign-Up endpoint with body: ', req.body);

            try {
                const token = await authInstance.SignUp(req.body);
                return res.status(201).json({ token });
            } catch (e) {
                LoggerInstance.error('🔥 error: %o', e);
                return next(e);
            }
        }
    );

    route.post(
        '/signin',
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                password: Joi.string()
                    .regex(/\S{6,12}/)
                    .required(),
            }),
        }),
        async (req, res, next) => {
            logger.debug('Calling Sign-In endpoint with body: ', req.body);

            try {
                const token = await authInstance.SignIn(req.body);
                return res.status(200).json({ token });
            } catch (e) {
                LoggerInstance.error('🔥 error: %o', e);
                return next(e);
            }
        }
    );

    route.get('/me', middlewares.isAuth(true), async (auth, req, res, next) => {
        if (auth instanceof Error) {
            return next(auth);
        }

        try {
            const result = await authInstance.Getme(auth.email);
            return res.json(result);
        } catch (e) {
            LoggerInstance.error('🔥 error: %o', e);
            return next(e);
        }
    });

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
        middlewares.isAuth(false),
        celebrate({
            body: Joi.object({
                id: Joi.number().required(),
                nickname: Joi.string(),
                profileurl: Joi.string(),
            }),
        }),
        async (req, res, next) => {
            try {
                const result = await authInstance.UpdateUser(req.body);
                return res.json(result);
            } catch (e) {
                LoggerInstance.error('🔥 error: %o', e);
                return next(e);
            }
        }
    );

    /**
     * @TODO Let's leave this as a place holder for now
     * The reason for a logout route could be deleting a 'push notification token'
     * so the device stops receiving push notifications after logout.
     *
     * Another use case for advance/enterprise apps, you can store a record of the jwt token
     * emitted for the session and add it to a black list.
     * It's really annoying to develop that but if you had to, please use Redis as your data store
     */
    route.post('/logout', middlewares.isAuth(false), async (req, res, next) => {
        try {
            return res.status(200).end();
        } catch (e) {
            logger.error('🔥 error %o', e);
            return next(e);
        }
    });

    route.post(
        '/delete',
        middlewares.isAuth(true),
        async (auth, req, res, next) => {
            if (auth instanceof Error) {
                return next(auth);
            }

            try {
                await authInstance.Withdraw(auth.email);
                return res.status(200).end();
            } catch (e) {
                logger.error('🔥 error %o', e);
                return next(e);
            }
        }
    );
};
