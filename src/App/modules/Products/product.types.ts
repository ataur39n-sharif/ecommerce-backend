import {IReview} from "@/App/modules/Reviews/review.types";
import {Types} from "mongoose";
import {TMetadata} from "@/Utils/types/customSchema.type";

export interface IProduct {
    _id?: Types.ObjectId | string,
    name: string,
    description: string,
    short_description?: string,
    category: string,
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
    price: string,
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
    price: string,
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