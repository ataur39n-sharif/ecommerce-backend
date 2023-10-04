import {Types} from "mongoose";

export interface ICategory {
    _id?: Types.ObjectId,
    name: string,
    slug: string,
    icon: string,
    parentId?: Types.ObjectId | ICategory | null,
    tags?: string[],
    status: 'active' | 'inactive'
}

export interface ICategoryWithSub extends ICategory {
    subCategory?: ICategory[];
}

export type TBulkUpdatePayload = {
    status: 'active' | 'inactive',
    tags: string[],
}