import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {OrderValidation} from "@/App/modules/Orders/order.validation";
import {OrderService} from "@/App/modules/Orders/order.services";
import {TOrderPayload} from "@/App/modules/Orders/order.types";

const placeOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = pickFunction(req.body, ['uid', 'lineItems', 'shippingAddress'])
    const validation: TOrderPayload = OrderValidation.orderPayloadZodSchema.parse(payload)
    const processOrder = await OrderService.createOrder(validation)
})

// const placeOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
// })

export const OrderController = {
    placeOrder
}