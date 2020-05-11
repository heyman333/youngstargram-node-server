const Article = (sequelize, DataTypes) => {
    return sequelize.define(
        'article',
        {
            content: {
                type: DataTypes.TEXT,
                allowNull: true,
                unique: false,
            },
        },
        { timestamps: true }
    );
};

export default Article;
