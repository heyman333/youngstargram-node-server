import { Container } from 'typedi';

import Logger from './logger';
import dbController from '../models';
import AuthService from '../services/auth';

const initContainer = () => {
    Container.set('dbController', dbController);
    Container.set('logger', Logger);

    Container.set('AuthService', new AuthService(Container));

    return {
        dbController,
        Logger,
    };
};

export default initContainer;
