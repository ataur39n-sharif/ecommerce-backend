import {Router} from "express";
import {AuthController} from "@/App/modules/Auth/auth.controller";
import {AuthMiddleware} from "@/App/modules/Auth/auth.middlewares";

const AuthRoutes = Router()

AuthRoutes
    .post('/register', AuthController.singUp)
    .post('/login', AuthMiddleware.userExists, AuthController.login)
// .post('/logout', AuthMiddleware)
// .post('/forget-password', AuthMiddleware)
// .post('/reset-password', AuthMiddleware)


export default AuthRoutes