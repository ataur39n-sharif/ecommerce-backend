import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {OrderValidation} from "@/App/modules/Orders/order.validation";
import {OrderService} from "@/App/modules/Orders/order.services";
import {TOrderPayload} from "@/App/modules/Orders/order.types";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {z} from "zod";
import {Types} from "mongoose";


const getOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await OrderService.allOrders()
    sendResponse.success(res, {
        statusCode: 200,
        message: 'All orders fetched successfully',
        data
    })
})

const getSingleUserOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // set uid in body from validation middleware
    const uid = z.instanceof(Types.ObjectId).parse(new Types.ObjectId(req.body.uid))
    const data = await OrderService.allOrdersOfUser(uid)
    sendResponse.success(res, {
        statusCode: 200,
        message: 'All orders fetched successfully',
        data
    })
})

const getSingleOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'Order Id is required.'
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

const updateOrderStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.instanceof(Types.ObjectId).parse(new Types.ObjectId(req.params.id))
    const status = z.enum(['pending', 'hold', 'paid', 'shipped', 'delivered']).parse(req.body.status)
    const data = await OrderService.updateStatus(id, status)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Order created successfully',
        data
    })
})


const deleteOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = z.string({
        required_error: 'Order id is required.'
    }).parse(req.params.id)

    const response = await OrderService.deleteOrder(id)

    sendResponse.success(res, {
        statusCode: 200,
        message: response ? 'Deleted successfully.' : 'No order found.'
    })

})


// const placeOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
// })

export const OrderController = {
    getOrders,
    getSingleOrder,
    getSingleUserOrders,
    placeOrder,
    updateOrderStatus,
    deleteOrder
}