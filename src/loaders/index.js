import expressLoader from './express';
import Logger from './logger';
import db from './db';

export default async ({ expressApp }) => {
    // const mongoConnection = await mongooseLoader();
    // Logger.info('✌️ DB loaded and connected!');

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

    await db.connect();
    Logger.info('db loaded');

    await expressLoader({ app: expressApp });
    Logger.info('express loaded');
};
