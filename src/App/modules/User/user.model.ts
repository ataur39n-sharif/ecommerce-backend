import { model, Schema } from "mongoose";
import { IUser, IUserModel } from "@/App/modules/User/user.types";
import { HashHelper } from "@/Utils/helper/hashHelper";
import { NameSchema } from "@/Utils/schema/name.schema";

const dataSchema = new Schema<IUser, IUserModel>({
    name: {
        type: NameSchema,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})


export const UserModel = model<IUser, IUserModel>('user', dataSchema)