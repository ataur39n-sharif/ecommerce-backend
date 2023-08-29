import {model, Schema} from "mongoose";
import {IUser, IUserModel} from "@/App/modules/User/user.types";
import {NameSchema} from "@/Utils/schema/name.schema";
import {AddressSchema} from "@/Utils/schema/address.schema";

const dataSchema = new Schema<IUser, IUserModel>({
    auid: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: NameSchema,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    address: {
        type: AddressSchema,
    }
}, {
    timestamps: true,
    versionKey: false
})


export const UserModel = model<IUser, IUserModel>('user', dataSchema)