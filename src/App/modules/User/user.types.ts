import {Model} from "mongoose";

export type TName = {
    firstName: string
    lastName: string
}

export interface IUser {
    _id?: string
    name: TName,
    email: string
    image?: string
    createdAt?: string
    updatedAt?: string
}

export interface IUserModel extends Model<IUser> {
}