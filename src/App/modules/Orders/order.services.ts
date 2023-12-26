import {IOrder, TOrderPayload} from "@/App/modules/Orders/order.types";
import {OrderModel} from "@/App/modules/Orders/order.model";
import {OrderUtils} from "@/App/modules/Orders/order.utils";
import {Types} from "mongoose";

const allOrders = async (): Promise<IOrder[]> => {
    return OrderModel.find().lean()
}

const allOrdersOfUser = async (uid: Types.ObjectId | string) => {
    return OrderModel.find({
        uid
    }).lean()
}

const singleOrder = async (_id: string): Promise<IOrder | null> => {
    return OrderModel.findOne({
        _id
    }).lean()
}

const createOrder = async (payload: TOrderPayload): Promise<IOrder> => {
    const {
        subTotal, shippingCost, total
    } = OrderUtils.processOrderAmountDetails(payload.lineItems)
    return OrderModel.create({
        ...payload,
        subTotal,
        shippingCost,
        total
    })
}

//status update
const updateStatus = async (id: Types.ObjectId | string, status: 'pending' | 'hold' | 'paid' | 'shipped' | 'delivered') => {
    return OrderModel.findOneAndUpdate({_id: id}, {
        $set: {
            status
        }
    }, {
        new: true
    }).lean()
}

const deleteOrder = async (_id: string) => {
    const result = await OrderModel.deleteOne({
        _id
    })
    console.log(result.deletedCount)
    if (result.deletedCount > 0) {
        return true
    } else {
        return false
    }

}


export const OrderService = {
    allOrders,
    allOrdersOfUser,
    singleOrder,
    createOrder,
    updateStatus,
    deleteOrder
}