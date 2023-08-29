import {Model, Types} from "mongoose";

export enum ERole {
    admin = 'admin',
    administration = 'administration',
    editor = 'editor',
    customer = 'customer'
}

export interface IAuthProperty {
    _id?: string
    email: string
    phone: string
    password: string
    uid: Types.ObjectId
    role: ERole
    createdAt?: string
    updatedAt?: string
}

export interface IAuthModel extends Model<IAuthProperty> {
    isUserExist(key: keyof IAuthProperty, value: string | number | boolean): Promise<boolean>;
}