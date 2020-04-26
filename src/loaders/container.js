import { Container } from 'typedi';

import Logger from './logger';
import dbController from '../models';
import AuthService from '../services/auth';

const initContainer = () => {
    Container.set('dbController', dbController);
    Container.set('AuthService', new AuthService(Container));
    Container.set('logger', Logger);
};

export default initContainer;
