import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10),

    /**
     * mysql
     */
    databaseHOST: process.env.DB_HOST,
    databaseUSER: process.env.DB_USER,
    databasePWD: process.env.DB_PASSWORD,
    databaseNAME: process.env.DATABASE,

    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET,

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    /**
     * Agenda.js stuff
     */
    // agenda: {
    //   dbCollection: process.env.AGENDA_DB_COLLECTION,
    //   pooltime: process.env.AGENDA_POOL_TIME,
    //   concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
    // },

    // /**
    //  * Agendash config
    //  */
    // agendash: {
    //   user: "agendash",
    //   password: "123456",
    // },
    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
    /**
     * Mailgun email credentials
     */
    // emails: {
    //   apiKey: "API key from mailgun",
    //   domain: "Domain Name from mailgun",
    // },
    aws: {
        AccessKeyId: process.env.AWSAccessKeyId,
        SecretKey: process.env.AWSSecretKey,
        ImageStoragePrefix: process.env.AWSS3,
    },
};
