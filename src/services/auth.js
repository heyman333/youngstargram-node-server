import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import config from '../config';
import db from '../models';

const generateToken = (user) => {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    return jwt.sign(
        {
            email: user.email,
            nickname: user.nickname,
            exp: exp.getTime() / 1000,
        },
        config.jwtSecret
    );
};

export default class AuthService {
    constructor() {
        this.userModel = db.User;
    }

    async SignUp(userInput) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.createHmac('sha512', salt);
        hash.update(userInput.password);
        const passwordHash = hash.digest('hex');
        const updateUserinput = {
            ...userInput,
            password: passwordHash,
            salt,
        };

        await this.userModel.create(updateUserinput);

        const token = generateToken(userInput);

        if (!userInput) {
            throw new Error('User cannot be created');
        }

        delete updateUserinput.password;
        return token;
    }

    async SignIn(userInput) {
        const result = await this.userModel.findOne({
            where: {
                email: userInput.email,
            },
        });

        if (!result) {
            throw new Error('inccorect id or pwd');
        }

        const { salt, password } = result.dataValues;
        const hash = crypto.createHmac('sha512', salt);
        hash.update(userInput.password);
        const passwordHash = hash.digest('hex');

        if (passwordHash === password) {
            return generateToken(userInput);
        }

        throw new Error('inccorect id or pwd');
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

    async Getme(userEmail) {
        const user = await this.userModel.findOne({
            where: {
                email: userEmail,
            },
        });

        const newUser = { ...user.dataValues };
        delete newUser.password;
        delete newUser.salt;

        return newUser;
    }

    async UpdateUser(userInfo) {
        const user = await this.userModel.findOne({
            where: {
                id: userInfo.id,
            },
        });
        const newUser = { ...user.dataValues, ...userInfo };

        await this.userModel.update(userInfo, {
            where: { id: newUser.id },
        });

        delete newUser.salt;
        delete newUser.password;

        return newUser;
    }

    async Withdraw(email) {
        try {
            await this.userModel.destroy({
                where: { email },
            });
        } catch (e) {
            console.log(e);
        }
    }
}
