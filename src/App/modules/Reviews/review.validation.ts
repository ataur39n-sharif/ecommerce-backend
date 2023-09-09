import {z} from "zod";
import {Types} from "mongoose";

const reviewZodSchema = z.object({
    uid: z.instanceof(Types.ObjectId, {
        message: 'Invalid user.'
    }),
    orderId: z.instanceof(Types.ObjectId, {
        message: 'Invalid order info..'
    }),
    rating: z.number(),
    comment: z.string(),
    status: z.enum(["pending", "approved", "rejected"]).default('pending'),
});

export const ReviewValidation = {
    reviewZodSchema
}
