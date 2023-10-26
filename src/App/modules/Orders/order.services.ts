import {IOrder, TOrderPayload} from "@/App/modules/Orders/order.types";
import {OrderModel} from "@/App/modules/Orders/order.model";
import {OrderUtils} from "@/App/modules/Orders/order.utils";


const allOrders = async (): Promise<IOrder[]> => {
    return OrderModel.find()
}

const allOrdersOfUser = async (uid: string) => {
    return OrderModel.find({
        uid
    })
}

const singleOrder = async (_id: string): Promise<IOrder | null> => {
    return OrderModel.findOne({
        _id
    })
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
const updateStatus = async (id: string, status: 'pending' | 'hold' | 'paid' | 'shipped' | 'delivered') => {
    return OrderModel.findOneAndUpdate({_id: id}, {
        status
    })
}

const deleteOrder = async (_id: string) => {
    return OrderModel.findOneAndDelete({
        _id
    })
}


export const OrderService = {
    allOrders,
    allOrdersOfUser,
    singleOrder,
    createOrder,
    updateStatus,
    deleteOrder
}