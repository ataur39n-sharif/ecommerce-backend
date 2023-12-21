import {Types} from "mongoose";
import {TMetadata} from "@/Utils/types/customSchema.type";

export interface ICategory {
    _id?: Types.ObjectId,
    name: string,
    slug: string,
    icon: string,
    parentId?: Types.ObjectId | ICategory | null,
    blog?: string,
    tags?: string[],
    metadata: TMetadata,
    status: 'active' | 'inactive'
}

export interface ICategoryWithSub extends ICategory {
    subCategory?: ICategory[];
}

export type TBulkUpdatePayload = {
    status: 'active' | 'inactive',
    tags: string[],
}