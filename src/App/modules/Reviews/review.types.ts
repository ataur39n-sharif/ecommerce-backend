import {Types} from "mongoose";

export interface IReview {
    _id?: string
    uid: Types.ObjectId
    orderId: Types.ObjectId
    rating: number
    comment: string
    status: 'pending' | 'approved' | 'rejected'
}