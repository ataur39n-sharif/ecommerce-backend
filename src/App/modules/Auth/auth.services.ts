import {AuthValidation, IAuthWithName} from './auth.validation';
import CustomError from "@/Utils/errors/customErrror.class";
import {HashHelper} from "@/Utils/helper/hashHelper";
import {generateToken} from "@/Utils/helper/generateToken";
import {EAccountStatus, ERole, IAuthProperty} from "./auth.types";
import {AuthModel} from "./auth.model";
import {UserModel} from '../User/user.model';
import mongoose from 'mongoose';

const CreateNewAccount = async (data: Partial<IAuthWithName>): Promise<IAuthProperty> => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const exist = await UserModel.findOne({email: data.email}).session(session)
        if (exist) throw new CustomError(`User with ${data.email} already exists`, 400)

        const userData = new UserModel({
            email: data.email,
            name: data.name
        })
        await userData.save({session})

        const validateUserCreation = AuthValidation.createAccount.parse({
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            uid: userData._id,
            role: data.role || ERole.customer, // only admin can define role in user created time
            status: EAccountStatus.pending
        })
        const newUser = new AuthModel(validateUserCreation)
        await newUser.save({session})
        await session.commitTransaction()
        await session.endSession()
        return newUser
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw error
    }
}
const logIntoAccount = async (data: Partial<IAuthProperty>) => {
    let user: IAuthProperty | null = null;
    if (data.phone) {
        user = await AuthModel.findOne({phone: data.phone})
    } else {
        user = await AuthModel.findOne({email: data.email})
    }

    const validPassword = user && await HashHelper.comparePassword(data.password as string, user.password)
    if (!validPassword || !user) throw new CustomError('Invalid email or password', 401)

    const tokenData = {
        id: user._id,
        role: user.role
    }

    const accessToken = generateToken.accessToken(tokenData)
    const refreshToken = generateToken.refreshToken(tokenData)

    return {
        accessToken,
        refreshToken
    }
}

const forgetPassword = async (email: string) => {
    /*
    * send email to user with a token for update password
    * */
}

export const AuthServices = {
    CreateNewAccount,
    logIntoAccount
}