import { Router } from 'express';
import auth from './routes/auth';
import article from './routes/article';

// guaranteed to get dependencies
export default () => {
    const app = Router();
    auth(app);
    article(app);

    return app;
};
