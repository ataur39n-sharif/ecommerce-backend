import {Router} from "express";
import {OrderController} from "@/App/modules/Orders/order.controller";

const OrderRoutes = Router()

OrderRoutes
    .get(
        '/',
        OrderController.getOrders
    )
    .get(
        '/:id',
        OrderController.getSingleOrder
    )
    .post(
        '/',
        // UserMiddlewares.validateAccess,
        OrderController.placeOrder
    )
    .delete(
        '/:id',
        OrderController.deleteOrder
    )

/*
* 3. get individual orders
* 5. update order status
* */
export default OrderRoutes