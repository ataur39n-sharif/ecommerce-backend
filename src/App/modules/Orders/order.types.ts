import {Types} from "mongoose";
import {TAddress} from "@/Utils/types/customSchema.type";

export type TOrderActivities = {
    time: Date,
    activity: string,
    actionBy: Types.ObjectId
}

export type TOrderLineItems = {
    product: Types.ObjectId | string,
    variation?: Types.ObjectId | string,
    quantity: number,
    price: number,
}

export type TOrderPayload = {
    uid: Types.ObjectId | string,
    lineItems: TOrderLineItems[],
    shippingAddress: TAddress,
}

export interface IOrder {
    _id?: string,
    uid: Types.ObjectId | string,
    lineItems: TOrderLineItems[],
    shippingAddress: TAddress,
    subTotal: number,
    shippingCost: number,
    total: number,
    status: 'pending' | 'hold' | 'paid' | 'shipped' | 'delivered',
    activities?: [TOrderActivities]
    createdAt?: Date,
    updatedAt?: Date
}