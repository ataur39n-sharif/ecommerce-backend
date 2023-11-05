import {AuthValidation, IAuthWithName} from './auth.validation';
import CustomError from "@/Utils/errors/customErrror.class";
import {HashHelper} from "@/Utils/helper/hashHelper";
import {generateToken} from "@/Utils/helper/generateToken";
import {EAccountStatus, ERole, IAuthProperty} from "./auth.types";
import {AuthModel} from "./auth.model";
import {UserModel} from '../User/user.model';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import Config from "@/Config";
import {IJWTConfirmAccountPayload} from "@/App/modules/Mail/mail.types";
import {MailService} from "@/App/modules/Mail/mail.service";

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

const resendConfirmationMail = async (email: string) => {
    const user = await AuthModel.findOne({email}).lean()
    if (!user) throw new CustomError('Invalid user request.', 400)
    if (!(user.status === 'pending')) throw new CustomError('Unable to send new confirmation email.', 400)
    await MailService.confirmAccount({
        name: '',
        userEmail: email
    })
}

const confirmAccount = async (token: string): Promise<boolean> => {
    const validate = jwt.verify(token, String(Config.jwt))

    //user information
    const user = await AuthModel.findOne({email: (validate as IJWTConfirmAccountPayload).userEmail}).lean()
    console.log({user})
    if (!user || !(user.status === 'pending')) throw new CustomError('Invalid request', 400)

    //update user account status pending to active
    await AuthModel.findOneAndUpdate({email: (validate as IJWTConfirmAccountPayload).userEmail}, {
        status: EAccountStatus.active
    }, {
        new: true
    }).lean()

    return true
}

const resetPassword = async (email: string, password: string) => {
    //find user
    const user = await AuthModel.findOne({email: email}).lean()
    if (!user) throw new CustomError('Invalid request', 400)
    //update password
    const newPassword = await HashHelper.generateHashPassword(password)
    await AuthModel.findOneAndUpdate({email: email}, {
        password: newPassword
    }).lean()

    return true
}


export const AuthServices = {
    CreateNewAccount,
    logIntoAccount,
    resendConfirmationMail,
    confirmAccount,
    resetPassword
}