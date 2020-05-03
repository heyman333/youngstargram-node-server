const Article = (sequelize, DataTypes) => {
    return sequelize.define(
        'article',
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: false,
            },
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
