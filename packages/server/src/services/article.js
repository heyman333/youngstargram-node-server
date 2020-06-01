import db from '../models';

export default class ArticleService {
    constructor() {
        this.articleModel = db.Article;
        this.articleImageModel = db.ArticleImage;
    }

    async Create(user, content) {
        const result = await this.articleModel.create({
            content,
            userid: user.id,
        });
        return result.dataValues;
    }

    async Read(id) {
        const result = await this.articleModel.findOne({
            where: {
                id,
            },
            attributes: { exclude: ['userid'] },
            include: [
                {
                    model: db.User,
                    attributes: {
                        exclude: ['password', 'salt'],
                    },
                },
                {
                    model: db.ArticleImage,
                },
            ],
        });

        return result.dataValues;
    }

    async ReadAllByPage(page) {
        const result = await this.articleModel.findAndCountAll({
            offset: 10 * page,
            limit: 10,
            attributes: { exclude: 'userid' },
            include: [
                {
                    model: db.User,
                    attributes: {
                        exclude: ['password', 'salt'],
                    },
                },
            ],
        });

        const isEnd = result.count <= 10 * page + 10;
        const articles = { items: result.rows, isEnd };
        delete articles.count;

        return articles;
    }

    async SaveArticleImages(articleid, files) {
        const promises = files.map((file) =>
            this.articleImageModel.create({
                imageurl: file.location,
                articleid,
            })
        );
        await Promise.all(promises);
    }
}
