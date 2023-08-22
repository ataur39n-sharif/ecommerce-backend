import {z, ZodType} from "zod";
import {IUser} from "@/App/modules/User/user.types";
import { IAuthProperty } from "./auth.types";

export interface IAuthWithName extends IAuthProperty{
    name:{
        firstName: string
        lastName: string
    }
}

const singUp: ZodType<IAuthWithName> = z.object({
    name: z.object({
        firstName: z.string(),
        lastName: z.string(),
    }),
    email: z.string().email(),
    password: z.string()
})

const singIn: ZodType<Partial<IAuthProperty>> = z.object({
    email: z.string().email(),
    password: z.string()
})

export const AuthValidation = {
    singUp,
    singIn
}