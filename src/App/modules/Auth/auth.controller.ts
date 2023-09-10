import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {AuthServices} from "@/App/modules/Auth/auth.services";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {AuthValidation} from "@/App/modules/Auth/auth.validation";
import {z} from "zod";
import {MailService} from "@/App/modules/Mail/mail.service";

const singUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const data = pickFunction(req.body, ['name', 'email', 'password', 'phone'])
    const validate = AuthValidation.singUpPayload.parse(data)
    await AuthServices.CreateNewAccount(validate)
    /*
    * send email/phone for validate email/phone
    * */

    sendResponse.success(res, {
        statusCode: 201,
        message: 'Successfully created new account'
    })
})

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = pickFunction(req.body, ["email", "phone", 'password'])
    const validateData = AuthValidation.singIn.parse(data)

    const {accessToken, refreshToken} = await AuthServices.logIntoAccount(validateData)
    res.cookie('refreshToken', refreshToken)
    sendResponse.success(res, {
        data: {accessToken},
        message: "Successfully logged in",
        statusCode: 200
    })
})

const forgetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email} = pickFunction(req.body, ['email'])
    const validate = z.object({
        email: z.string().email()
    }).parse({email})

    const sendMail = await MailService.forgetPassword({
        userEmail: validate.email,
        callbackUrl: 'https://example.com/login'
    })

    sendResponse.success(res, {
        statusCode: 200,
        message: "An email is sent to your mail. Please follow the instructions."
    })

})

const restPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = pickFunction(req.body, ['password', 'email'])
    const validate = z.object({
        email: z.string(),
        password: z.string()
    }).parse(data)

    console.log(validate)
})

const changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = pickFunction(req.body, ['password', 'email'])
    const validate = z.object({
        email: z.string(),
        password: z.string()
    }).parse(data)

    console.log(validate)
})


export const AuthController = {
    singUp,
    login,
    forgetPassword,
    restPassword,
    changePassword
}