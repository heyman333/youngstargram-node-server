export default class AuthService {
    constructor(userModel, logger) {
        this.userModel = userModel;
        this.logger = logger;
    }

    async SignUp(userInputDTO) {
        try {
            await this.userModel.create(userInputDTO);
        } catch (e) {
            console.log(e);
        }
    }
}
