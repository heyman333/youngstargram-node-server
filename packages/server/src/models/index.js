import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/config';
import User from './user';
import Article from './article';
import ArticleImage from './articleImage';

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
db.Article = Article(sequelize, Sequelize);
db.ArticleImage = ArticleImage(sequelize, Sequelize);

db.Article.hasMany(db.ArticleImage, {
    foreignKey: {
        name: 'articleid',
        allowNull: true,
    },
});
db.Article.belongsTo(db.User, {
    foreignKey: {
        name: 'userid',
        allowNull: false,
    },
});

export default db;
