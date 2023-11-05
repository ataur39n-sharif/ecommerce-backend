import {Router} from "express";
import {AuthController} from "@/App/modules/Auth/auth.controller";
import {AuthMiddleware} from "@/App/modules/Auth/auth.middlewares";

const AuthRoutes = Router()

AuthRoutes
    .post('/register', AuthController.singUp)
    .post('/login',
        AuthMiddleware.userExists,
        AuthController.login
    )
    .post('/resend-confirmation-mail', AuthController.resendConfirmationMail)
    // .post('/logout', AuthMiddleware)
    .post('/forget-password', AuthController.forgetPassword)
    .patch('/reset-password', AuthController.restPassword)
    .post('/confirm-account', AuthController.confirmAccount)

export default AuthRoutes