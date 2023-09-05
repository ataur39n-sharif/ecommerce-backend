import {Types} from "mongoose";

export interface IProduct {
    _id?: Types.ObjectId,
    name: string,
    description: string,
    price?: number,
    stock?: number,
    category: string,
    images: [string],
    thumbnail: string,
    reviews: [],
    isVariableProduct: boolean,
    tags: [string],
    attributes: TSingleProductAttribute,
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
    price: number,
    stock: number,
    category: string,
    images: [string],
    thumbnail: string,
    reviews: [],
    isVariableProduct: boolean,
    tags: [string],
    attributes: TSingleProductAttribute,
    discount: TDiscount,
    status: 'published' | 'unpublished',
    createdAt?: Date,
    updatedAt?: Date
}

export interface IVariableProduct {
    _id?: string,
    name: string,
    description: string,
    category: string,
    images: [string],
    thumbnail: string,
    reviews: [],
    isVariableProduct: boolean,
    tags: [string],
    attributes: TSingleProductAttribute,
    status: 'published' | 'unpublished',
    variableProducts: TVariableProductAttribute,
    createdAt?: Date,
    updatedAt?: Date
}


export type TDiscount = {
    type: 'percentage' | 'fixed',
    value: number
}

export type TSingleProductAttribute = {
    labels: [string],
    values: [string]
}
type TVariableAttr = {
    label: string,
    value: string
}
export type TVariableProductAttribute = {
    image: string,
    price: number,
    stock: number,
    attributes: [TVariableAttr],
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