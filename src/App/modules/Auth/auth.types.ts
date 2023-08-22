import { Model, Types } from "mongoose";

export enum ERole {
    superAdmin = "superAdmin",
    admin = "admin",
    user = "user",
}

export interface IAuthProperty {
    _id?: string
    email: string
    password: string
    uid?: Types.ObjectId
    role?: ERole
    createdAt?: string
    updatedAt?: string
}

export interface IAuthModel extends Model<IAuthProperty> {
    isUserExist(key: keyof IAuthProperty, value: string | number | boolean): Promise<boolean>;
}