const User = (sequelize, DataTypes) => {
    return sequelize.define(
        'user',
        {
            email: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: false,
            },
            salt: {
                type: DataTypes.STRING(32),
                allowNull: false,
                unique: true,
            },
            nickname: { type: DataTypes.STRING(10), allowNull: true },
            profileurl: { type: DataTypes.STRING(30), allowNull: true },
        },
        { timestamps: true }
    );
};

export default User;
