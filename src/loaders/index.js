import expressLoader from './express';
import Logger from './logger';
import dbController from '../models';
import initCotainer from './container';

export default async ({ expressApp }) => {
    // const mongoConnection = await mongooseLoader();
    initCotainer();
    Logger.info('✌️ initCotainer!!');

    /**
     * WTF is going on here?
     *
     * We are injecting the mongoose models into the DI container.
     * I know this is controversial but will provide a lot of flexibility at the time
     * of writing unit tests, just go and check how beautiful they are!
     */

    // const userModel = {
    //     name: 'userModel',
    //     // Notice the require syntax and the '.default'
    //     model: require('../models/user').default,
    // };

    // // It returns the agenda instance because it's needed in the subsequent loaders
    // const { agenda } = await dependencyInjectorLoader({
    //     mongoConnection,
    //     models: [
    //         userModel,
    //         // salaryModel,
    //         // whateverModel
    //     ],
    // });
    // Logger.info('✌️ Dependency Injector loaded');

    // await jobsLoader({ agenda });
    // Logger.info('✌️ Jobs loaded');

    await expressLoader({ app: expressApp });
    Logger.info('express loaded');

    await dbController.sequelize.sync();
    Logger.info('sequelize sync end');
};
