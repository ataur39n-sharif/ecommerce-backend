import {Types} from "mongoose";
import {TAddress} from "@/Utils/types/customSchema.type";

export type TOrderActivities = {
    time: Date,
    activity: string,
    actionBy: Types.ObjectId
}

export interface IOrder {
    _id?: string,
    uid: Types.ObjectId,
    products: [Types.ObjectId],
    shippingAddress: TAddress,
    subTotal: number,
    shippingCost: number,
    total: number,
    status: 'pending' | 'hold' | 'paid' | 'delivered' | 'shipped',
    activities: [TOrderActivities]
    createdAt: Date,
    updatedAt: Date
}