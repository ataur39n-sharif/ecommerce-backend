import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {AuthServices} from "@/App/modules/Auth/auth.services";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {AuthValidation} from "@/App/modules/Auth/auth.validation";

const singUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = pickFunction(req.body, ['name', 'email', 'password'])
    const validate = AuthValidation.singUp.parse(data)
    const user = await AuthServices.CreateNewAccount(validate)

    sendResponse.success(res, {
        statusCode: 201,
        message: 'Successfully created new account'
    })
})

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = pickFunction(req.body, ["email", "password"])
    const validateData = AuthValidation.singIn.parse(data)
    const {accessToken, refreshToken} = await AuthServices.logIntoAccount(validateData)

    res.cookie('refreshToken', refreshToken)
    sendResponse.success(res, {
        data: {accessToken},
        message: "Successfully logged in",
        statusCode: 200
    })
})


export const AuthController = {
    singUp,
    login
}