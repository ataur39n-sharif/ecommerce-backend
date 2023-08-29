import {z, ZodType} from "zod";
import {ERole, IAuthProperty} from "./auth.types";
import {Types} from "mongoose";

export interface IAuthWithName extends IAuthProperty {
    name: {
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
    password: z.string(),
    uid: z.instanceof(Types.ObjectId, {
        message: 'Something is wrong. '
    }),
    role: z.enum([ERole.admin, ERole.customer, ERole.administration, ERole.editor])
})

const singIn: ZodType<Partial<IAuthProperty>> = z.object({
    email: z.string().email(),
    password: z.string()
})

export const AuthValidation = {
    singUp,
    singIn
}