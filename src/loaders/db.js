import mysql from 'mysql';
import config from '../config';

const db = mysql.createConnection({
    host: config.databaseHOST,
    user: config.databaseUSER,
    password: config.databasePWD,
    database: config.databaseNAME,
});

export default db;
