import {Router} from "express";
import {OrderController} from "@/App/modules/Orders/order.controller";
import AccessLimit from "@/Middlewares/AccessLimit";
import {ERole} from "@/App/modules/Auth/auth.types";

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
        AccessLimit([ERole.admin]),
        // UserMiddlewares.validateAccess,
        OrderController.placeOrder
    )
    .delete(
        '/:id',
        AccessLimit([ERole.admin]),
        OrderController.deleteOrder
    )

/*
* 3. get individual orders
* 5. update order status
* */
export default OrderRoutes