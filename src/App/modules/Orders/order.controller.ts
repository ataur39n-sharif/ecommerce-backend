import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {OrderValidation} from "@/App/modules/Orders/order.validation";
import {OrderService} from "@/App/modules/Orders/order.services";
import {TOrderPayload} from "@/App/modules/Orders/order.types";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {z} from "zod";


const getOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await OrderService.allOrders()
    sendResponse.success(res, {
        statusCode: 200,
        message: 'All orders fetched successfully',
        data
    })
})

const getSingleUserOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    sendResponse.success(res, {
        statusCode: 200,
        message: 'All orders fetched successfully',
    })
})

const getSingleOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'Id is required.'
    }).parse(req.params.id)

    const data = await OrderService.singleOrder(id)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Fetched successful.',
        data
    })
})

const placeOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = pickFunction(req.body, ['uid', 'lineItems', 'shippingAddress'])
    const validation: TOrderPayload = OrderValidation.orderPayloadZodSchema.parse(payload)
    const data = await OrderService.createOrder(validation)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Order created successfully',
        data
    })
})

const deleteOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = z.string({
        required_error: 'Id is required.'
    }).parse(req.params.id)

    await OrderService.deleteOrder(id)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Deleted successfully.'
    })

})


// const placeOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
// })

export const OrderController = {
    getOrders,
    getSingleOrder,
    placeOrder,
    deleteOrder
}