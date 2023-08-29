import {model, Schema} from "mongoose";
import {IReview} from "@/App/modules/Reviews/review.types";

const dataSchema = new Schema<IReview>({
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        required: true
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})


export const ReviewModel = model('Review', dataSchema)