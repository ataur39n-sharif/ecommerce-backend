import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {z} from "zod";

const getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = pickFunction(req.body, ['email'])
    // const validate =
})

const changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = pickFunction(req.body, ['password', 'email'])
    const validate = z.object({
        email: z.string(),
        password: z.string()
    }).parse(data)

    console.log(validate)
})
export const UserController = {
    getUser,
    changePassword
}