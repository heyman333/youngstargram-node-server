import db from '../models';

export default class ArticleService {
    constructor() {
        this.articleModel = db.Article;
    }

    async Create(content) {
        await this.articleModel.create({ content });
    }
}
