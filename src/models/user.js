const User = (sequelize, DataTypes) => {
    return sequelize.define(
        'user',
        {
            email: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
            nickname: { type: DataTypes.STRING(10), allowNull: true },
            profileurl: { type: DataTypes.STRING(30), allowNull: true },
            accesstoken: { type: DataTypes.STRING(50), allowNull: true },
        },
        { timestamps: true }
    );
};

export default User;
