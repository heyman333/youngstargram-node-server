import express from 'express';
import config from './config';

import Logger from './loaders/logger';

async function startServer() {
    const app = express();

    /**
     * A little hack here
     * Import/Export can only be used in 'top-level code'
     * Well, at least in node 10 without babel and at the time of writing
     * So we are using good old require.
     * */

    // eslint-disable-next-line global-require
    await require('./loaders').default({ expressApp: app });

    app.listen(config.port, (err) => {
        if (err) {
            Logger.error(err);
            process.exit(1);
            return;
        }
        console.log("sever runs on port:" + config.port)
    });
}

startServer();
