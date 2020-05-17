import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import AuthService from '../../services/auth';
import ArticleService from '../../services/article';
import middlewares from '../middlewares';
import LoggerInstance from '../../loaders/logger';
import upload from '../../upload';

const route = Router();

export default (app) => {
    app.use('/article', route);
    const articleInstance = new ArticleService();
    const authInstance = new AuthService();

    route.get('/:id', middlewares.isAuth(false), async (req, res) => {
        const article = await articleInstance.Read(req.params.id);
        return res.json(article);
    });

    route.post(
        '/create',
        middlewares.isAuth(true),
        celebrate({
            body: Joi.object({
                content: Joi.string(),
            }),
        }),
        async (authData, req, res, next) => {
            try {
                const { content } = req.body;
                const user = await authInstance.Getme(authData.email);
                const result = await articleInstance.Create(user, content);
                return res.json({ id: result.id });
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
        celebrate({
            body: Joi.object({
                articleid: Joi.string().required(),
                files: Joi.any(),
            }),
        }),
        async (req, res) => {
            if (req.files) {
                await articleInstance.SaveArticleImages(
                    req.body.articleid,
                    req.files
                );
                return res.json({ files: req.files });
            }
            return res.status(400).end();
        }
    );
};
