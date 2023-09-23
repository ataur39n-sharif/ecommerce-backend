import {Types} from "mongoose";

export type TCategory = {
    _id?: Types.ObjectId,
    name: string,
    slug: string,
    icon: string,
    parentId?: Types.ObjectId | null,
    tags?: string[],
    status: 'active' | 'inactive'
}