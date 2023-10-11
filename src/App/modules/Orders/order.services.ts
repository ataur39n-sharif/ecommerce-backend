import {IOrder, TOrderPayload} from "@/App/modules/Orders/order.types";
import {OrderModel} from "@/App/modules/Orders/order.model";
import {OrderUtils} from "@/App/modules/Orders/order.utils";

const createOrder = async (payload: TOrderPayload):Promise<IOrder> => {
    const {
        subTotal,shippingCost,total
    } = OrderUtils.processOrderAmountDetails(payload.lineItems)
    return  OrderModel.create({
        ...payload,
        subTotal,
        shippingCost,
        total
    })

}

export const OrderService = {
    createOrder
}