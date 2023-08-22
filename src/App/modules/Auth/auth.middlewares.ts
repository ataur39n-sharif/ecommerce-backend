import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {UserModel} from "@/App/modules/User/user.model";
import CustomError from "@/Utils/errors/customErrror.class";
import { AuthModel } from "./auth.model";

const userExists = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email} = pickFunction(req.body, ['email'])
    const user = await AuthModel.isUserExist('email', email)
    if (!user) throw new CustomError('Invalid user', 404)
    next()
})

export const AuthMiddleware = {
    userExists
}