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
        });

        return result.dataValues;
    }

    async SaveArticleImages(articleid, files) {
        const promises = files.map((file) =>
            this.articleImageModel.create({
                imageurl: file.location.replace(
                    'https://youngstargram-test.s3.ap-northeast-2.amazonaws.com/images',
                    ''
                ),
                articleid,
            })
        );
        await Promise.all(promises);
    }
}
