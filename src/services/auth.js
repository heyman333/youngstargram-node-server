export default class AuthService {
    constructor(userModel, logger) {
        this.userModel = userModel;
        this.logger = logger;
    }

    async SignUp(userInput) {
        try {
            // 비지니스 로직이 들어감
            await this.userModel.create(userInput);
        } catch (e) {
            console.log(e);
        }
    }
}
