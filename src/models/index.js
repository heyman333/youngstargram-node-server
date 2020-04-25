import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { Container, Service } from 'typedi';
import config from '../config/config.sequelize';
import User from './user';

const basename = path.basename(__filename);
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User(sequelize, Sequelize);

const SequelizeRepository = Service(() => ({
    getSequelize() {
        return sequelize;
    },
}));

const UserRepository = Service(() => ({
    getUser() {
        return db.User;
    },
}));

const DBController = Service(
    [SequelizeRepository, UserRepository],
    (sequelizeRepo, userRepo) => {
        return {
            sequelize: sequelizeRepo.getSequelize(),
            user: userRepo.getUser(),
        };
    }
);

const dbController = Container.get(DBController);

export default dbController;
