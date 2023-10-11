import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {OrderValidation} from "@/App/modules/Orders/order.validation";
import {OrderService} from "@/App/modules/Orders/order.services";
import {TOrderPayload} from "@/App/modules/Orders/order.types";
import {sendResponse} from "@/Utils/helper/sendResponse";

const placeOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = pickFunction(req.body, ['uid', 'lineItems', 'shippingAddress'])
    const validation: TOrderPayload = OrderValidation.orderPayloadZodSchema.parse(payload)
    const data = await OrderService.createOrder(validation)

    sendResponse.success(res,{
        statusCode: 200,
        message: 'Order created successfully',
        data
    })
})

// const placeOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
// })

export const OrderController = {
    placeOrder
}