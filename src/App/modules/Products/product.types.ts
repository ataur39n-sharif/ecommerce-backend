import {IReview} from "@/App/modules/Reviews/review.types";
import {Types} from "mongoose";

export interface IProduct {
    _id?: Types.ObjectId,
    name: string,
    description: string,
    short_description?: string,
    price: number,
    stock?: number,
    category: string,
    images: string[],
    thumbnail: string,
    reviews: Types.ObjectId[] | IReview[],
    productType: 'simple_product' | 'variable_product',
    tags: string[],
    attributes: TProductAttribute[],
    discount?: TDiscount,
    status: 'published' | 'unpublished',
    variableProducts?: TVariableProductAttribute,
    createdAt?: Date,
    updatedAt?: Date
}

export interface ISingleProduct {
    _id?: string,
    name: string,
    description: string,
    short_description: string,
    price: number,
    stock: number,
    category: string,
    images?: string[],
    thumbnail: string,
    reviews?: Types.ObjectId[] | IReview[],
    productType: 'simple_product',
    tags: string[],
    attributes?: TProductAttribute[],
    discount?: TDiscount,
    status: 'published' | 'unpublished',
    createdAt?: Date,
    updatedAt?: Date
}

export interface IVariableProduct {
    _id?: string,
    name: string,
    description: string,
    short_description: string,
    category: string,
    images?: string[],
    thumbnail: string,
    reviews?: Types.ObjectId[] | IReview[],
    productType: 'variable_product',
    tags: string[],
    attributes: TProductAttribute[],
    status: 'published' | 'unpublished',
    variableProducts: TVariableProductAttribute[],
    createdAt?: Date,
    updatedAt?: Date
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