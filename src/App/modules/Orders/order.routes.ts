import {Router} from "express";
import {OrderController} from "@/App/modules/Orders/order.controller";

const OrderRoutes = Router()

OrderRoutes
    .post(
        '/',
        // UserMiddlewares.validateAccess,
        OrderController.placeOrder
    )

/*
* 1. place order
* 2. get orders
* 3. get individual orders
* 4. get single order
* 5. update order status
* 6. delete order
* */
export default OrderRoutes