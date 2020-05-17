const ArticleImage = (sequelize, DataTypes) => {
    return sequelize.define(
        'articleimage',
        {
            articleid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: false,
            },
            imageurl: {
                type: DataTypes.STRING(200),
                allowNull: false,
                unique: true,
            },
        },
        { timestamps: true }
    );
};

export default ArticleImage;
