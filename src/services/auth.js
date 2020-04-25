import { Container } from 'typedi';
import dbController from '../models';

export default class AuthService {
    constructor(container) {
        this.userModel = dbController.user;
        this.logger = container.get('logger');
    }

    async SignUp(userInput) {
        try {
            // 비지니스 로직이 들어감
            await this.userModel.create(userInput);
        } catch (e) {
            console.log(e);
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

Container.set('AuthService', new AuthService(Container));
