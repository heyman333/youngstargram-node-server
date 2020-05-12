import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import ArticleService from '../../services/article';
import middlewares from '../middlewares';
import LoggerInstance from '../../loaders/logger';
import upload from '../../upload';

const route = Router();

export default (app) => {
    app.use('/article', route);
    const articleInstance = new ArticleService();

    route.get('/', (req, res) => {
        res.status(200).end();
    });

    route.post(
        '/create',
        middlewares.isAuth(false),
        celebrate({
            body: Joi.object({
                ccontent: Joi.string(),
            }),
        }),
        async (req, res, next) => {
            try {
                const { content } = req.body;
                await articleInstance.Create(content);
                return res.status(200).end();
            } catch (e) {
                LoggerInstance.error('🔥 error: %o', e);
                return next(e);
            }
        }
    );

    route.post(
        '/image-upload',
        middlewares.isAuth(false),
        upload.array('file', 6),
        (req, res) => {
            if (req.files) {
                return res.status(200).end();
            }
            return res.status(400).end();
        }
    );
};
