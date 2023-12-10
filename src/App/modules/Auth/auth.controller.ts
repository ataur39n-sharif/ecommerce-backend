import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {AuthServices} from "@/App/modules/Auth/auth.services";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {AuthValidation} from "@/App/modules/Auth/auth.validation";
import {z} from "zod";
import {MailService} from "@/App/modules/Mail/mail.service";
import jwt from "jsonwebtoken";
import config from "@/Config";
import {ERole} from "@/App/modules/Auth/auth.types";
import CustomError from "@/Utils/errors/customError.class";

const singUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const data = pickFunction(req.body, ['name', 'email', 'password', 'phone'])
    const validate = AuthValidation.authPayload.parse(data)
    await AuthServices.CreateNewAccount(validate)

    MailService.confirmAccount({
        name: validate.name.firstName,
        userEmail: validate.email
    })

    sendResponse.success(res, {
        statusCode: 201,
        message: "An confirmation email was sent to your mail. Please follow that instructions."
    })
})

const createAccountByAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const data = pickFunction(req.body, ['name', 'email', 'password', 'phone', 'role'])
    const validate = AuthValidation.authPayload.extend({
        role: z.enum([ERole.admin, ERole.customer, ERole.administration, ERole.editor]),
    }).parse(data)
    await AuthServices.CreateNewAccount(validate)

    MailService.confirmAccount({
        name: validate.name.firstName,
        userEmail: validate.email
    })

    sendResponse.success(res, {
        statusCode: 201,
        message: "An confirmation email was sent to your mail. Please follow that instructions."
    })
})


const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = pickFunction(req.body, ["email", "phone", 'password'])
    const validateData = AuthValidation.singIn.parse(data)

    const {refreshToken, ...info} = await AuthServices.logIntoAccount(validateData)
    res.cookie('refreshToken', refreshToken)
    sendResponse.success(res, {
        data: {...info},
        message: "Successfully logged in",
        statusCode: 200
    })
})

const adminLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = pickFunction(req.body, ["email", 'password'])
    const validateData = AuthValidation.singIn.parse(data)

    const {refreshToken, ...info} = await AuthServices.logIntoAccount(validateData)

    if (info.role !== 'admin') throw new CustomError('Invalid credentials', 401)

    res.cookie('refreshToken', refreshToken)
    sendResponse.success(res, {
        data: {...info},
        message: "Successfully logged in",
        statusCode: 200
    })
})


const resendConfirmationMail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = pickFunction(req.body, ['email'])
    const validate = z.object({
        email: z.string(),
    }).parse(data)

    await AuthServices.resendConfirmationMail(validate.email)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'We send a new confirmation email. The confirmation email is valid for 5 minutes.',
    })
})

const forgetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email} = pickFunction(req.body, ['email', 'phoneNumber'])

    //todo: when user input phone number , action will perform by sms.

    const validate = z.object({
        email: z.string().email()
    }).parse({email})

    await MailService.forgetPassword({
        userEmail: validate.email
    })

    sendResponse.success(res, {
        statusCode: 200,
        message: "An email is sent to your mail. Please follow the instructions."
    })
})

const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = pickFunction({...req.body, ...req.headers}, ['newPassword', 'token'])
    const token = z.string().parse(data.token)
    const validateToken = jwt.verify(token, String(config.jwt.common)) as { userEmail: string }

    const validate = z.object({
        email: z.string(),
        password: z.string()
    }).parse({
        email: validateToken.userEmail,
        password: data.newPassword
    })

    console.log({validate})

    await AuthServices.resetPassword(validate.email, validate.password)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Password reset successfully.',
    })
})

const confirmAccount = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = pickFunction(req.query, ['token'])
    console.log(token)
    const validate = z.object({
        token: z.string(),
    }).parse(token)

    await AuthServices.confirmAccount(validate.token)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Confirmed successfully. Account is activated now.'
    })

})

const changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = pickFunction(req.body, ['oldPassword', 'newPassword', 'email'])
    const {email, newPassword, oldPassword} = AuthValidation.changePassword.parse(data)

    await AuthServices.changePassword(email, oldPassword, newPassword)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Password changed successfully.',
    })
})

export const AuthController = {
    singUp,
    login,
    adminLogin,
    resendConfirmationMail,
    forgetPassword,
    resetPassword,
    changePassword,
    confirmAccount,
    createAccountByAdmin
}