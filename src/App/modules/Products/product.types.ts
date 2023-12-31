import {IReview} from "@/App/modules/Reviews/review.types";
import {Types} from "mongoose";
import {TMetadata} from "@/Utils/types/customSchema.type";

export interface IProduct {
    _id?: Types.ObjectId | string,
    name: string,
    slug: string,
    description: string,
    short_description?: string,
    category: string | Types.ObjectId,
    images: string[],
    thumbnail: string,
    reviews: Types.ObjectId[] | IReview[],
    productType: 'simple_product' | 'variable_product',
    tags: string[],
    attributes: TProductAttribute[],
    status: 'published' | 'unpublished',
    metadata: TMetadata,
    createdAt?: Date,
    updatedAt?: Date
}

export interface ISingleProduct extends IProduct {
    price: number,
    stock: number,
    discount?: TDiscount,
}

export interface IVariableProduct extends IProduct {
    variableProducts: TVariableProductAttribute[],
}


export type TDiscount = {
    type: 'percentage' | 'fixed',
    value: number
}

export type TProductAttribute = {
    label: string,
    values: string[]
}
export type TVariableAttr = {
    label: string,
    value: string
}
export type TVariableProductAttribute = {
    image: string,
    price: number,
    stock: number,
    attributes: TVariableAttr[],
    discount: TDiscount
}

export type TBulkProductPayload = {
    stock?: number
    status?: 'published' | 'unpublished'
}

export type TExtraProductKeysType = 'keys' | 'specific'
export type TExtraProductKeys = {
    fieldName: string,
    fieldType: string,
}

export interface IProductImages {
    thumbnail?: Express.Multer.File[],
    images?: Express.Multer.File[],
}