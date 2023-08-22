import {IAuthWithName} from './auth.validation';
import CustomError from "@/Utils/errors/customErrror.class";
import {HashHelper} from "@/Utils/helper/hashHelper";
import {generateToken} from "@/Utils/helper/generateToken";
import {IAuthProperty} from "./auth.types";
import {AuthModel} from "./auth.model";
import {UserModel} from '../User/user.model';
import mongoose from 'mongoose';

const CreateNewAccount = async (data: IAuthWithName): Promise<IAuthProperty> => {
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

        const newUser = new AuthModel({
            email: data.email,
            password: data.password,
            uid: userData._id
        })
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
    const user: IAuthProperty | null = await AuthModel.findOne({email: data.email})

    const validPassword = user && await HashHelper.comparePassword(data.password as string, user.password)
    if (!validPassword) throw new CustomError('Invalid email or password', 401)

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


export const AuthServices = {
    CreateNewAccount,
    logIntoAccount
}