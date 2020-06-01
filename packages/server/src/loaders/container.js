import { Container } from 'typedi';

import Logger from './logger';

const initContainer = () => {
    Container.set('logger', Logger);
    return {
        Logger,
    };
};

export default initContainer;
