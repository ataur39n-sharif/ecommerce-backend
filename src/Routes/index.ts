import {Router} from "express";
import AuthRoutes from "@/App/modules/Auth/auth.routes";
import YAML from "yamljs"
import swaggerUI from "swagger-ui-express"
import path from "path";
import {ProductController} from "@/App/modules/Products/product.controller";

const rootRouter = Router()
const docs = YAML.load(path.join(process.cwd(), "docs.yml"))

rootRouter
    .get('/products', ProductController.allProducts)
    .post('/products', ProductController.newProduct)
    .use('/auth', AuthRoutes)
    .use('/docs', swaggerUI.serve, swaggerUI.setup(docs))


export default rootRouter