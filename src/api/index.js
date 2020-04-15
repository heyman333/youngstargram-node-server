import { Router } from 'express';
import auth from './routes/auth';

// guaranteed to get dependencies
export default () => {
    const app = Router();
    auth(app);

    return app;
};
