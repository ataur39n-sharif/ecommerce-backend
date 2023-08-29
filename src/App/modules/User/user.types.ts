import {Model, Types} from "mongoose";
import {TAddress} from "@/Utils/types/customSchema.type";

export type TName = {
    firstName: string
    lastName: string
}

export interface IUser {
    _id?: string
    auid: Types.ObjectId,
    name: TName,
    address?: TAddress
    email: string
    image?: string
    createdAt?: string
    updatedAt?: string
}

export interface IUserModel extends Model<IUser> {
}