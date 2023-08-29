import {Types} from "mongoose";

export type TCategory = {
    _id?: Types.ObjectId,
    name: string,
    slug: string,
    icon: string,
    parent?: Types.ObjectId,
    tags?: [string],
    status: 'active' | 'inactive'
}