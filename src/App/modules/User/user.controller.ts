import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";

const getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = pickFunction(req.body, ['email'])
    // const validate =
})
export const UserController = {}