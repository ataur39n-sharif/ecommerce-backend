import {model, Schema} from "mongoose";
import {IOrder, TOrderActivities, TOrderLineItems} from "@/App/modules/Orders/order.types";
import {AddressSchema} from "@/Utils/schema/address.schema";

const orderActivitySchema = new Schema<TOrderActivities>({
    time: {
        type: Date,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    actionBy: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    versionKey: false
})

const OrderLineItemSchema = new Schema<TOrderLineItems>({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    variation: {
        type: Schema.Types.ObjectId,
        default: null,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    versionKey: false,
    _id: false
})

const dataSchema = new Schema<IOrder>({
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lineItems: {
        type: [OrderLineItemSchema],
        required: true
    },
    shippingAddress: {
        type: AddressSchema,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    shippingCost: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'hold', 'paid', 'shipped', 'delivered'],
        default: 'pending',
        required: true
    },
    activities: {
        type: [orderActivitySchema],
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export const OrderModel = model('Order', dataSchema)