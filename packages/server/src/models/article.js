const Article = (sequelize, DataTypes) => {
    return sequelize.define(
        'article',
        {
            content: {
                type: DataTypes.TEXT,
                allowNull: true,
                unique: false,
            },
            userid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: false,
            },
        },
        { timestamps: true }
    );
};

export default Article;
