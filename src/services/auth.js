export default class AuthService {
    constructor(container) {
        this.userModel = container.get('dbController').User;
    }

    async SignUp(userInput) {
        try {
            // 비지니스 로직이 들어감
            await this.userModel.create(userInput);
        } catch (e) {
            console.log(e);
        }
    }

    async GetUser(userId) {
        try {
            const result = await this.userModel.findOne({
                where: {
                    id: userId,
                },
            });
            return result.dataValues;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async UpdateUser(userInfo) {
        try {
            const user = await this.userModel.findOne({
                where: {
                    id: userInfo.id,
                },
            });
            const newUser = { ...user.dataValues, ...userInfo };

            await this.userModel.update(newUser, {
                where: { id: newUser.id },
            });

            return newUser;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async Withdraw(userId) {
        try {
            const result = await this.userModel.destroy({
                where: { id: userId },
            });
            console.log('result', result);
        } catch (e) {
            console.log(e);
        }
    }
}
