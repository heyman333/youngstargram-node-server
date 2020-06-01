import config from '.';

const configs = {
    development: {
        username: config.databaseUSER,
        password: config.databasePWD,
        database: config.databaseNAME,
        host: config.databaseHOST,
        dialect: 'mysql',
    },
    production: {
        username: config.databaseUSER,
        password: config.databasePWD,
        database: config.databaseNAME,
        host: config.databaseHOST,
        dialect: 'mysql',
    },
};

export default configs[process.env.NODE_ENV];
