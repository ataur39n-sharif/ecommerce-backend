import {Router} from "express";
import AuthRoutes from "@/App/modules/Auth/auth.routes";
import YAML from "yamljs"
import swaggerUI from "swagger-ui-express"
import path from "path";
import ProductRoutes from "@/App/modules/Products/product.routes";
import CategoryRoutes from "@/App/modules/Category/category.routes";
import OrderRoutes from "@/App/modules/Orders/order.routes";
import BlogRoutes from "@/App/modules/Blogs/blog.routes";
import FileUploadRoutes from "@/App/modules/FileUpload/fileUpload.routes";
import MailRoutes from "@/App/modules/Mail/mail.routes";

const rootRouter = Router()
const docs = YAML.load(path.join(process.cwd(), "docs.yml"))

rootRouter
    .use('/auth', AuthRoutes)
    .use('/products', ProductRoutes)
    .use('/category', CategoryRoutes)
    .use('/orders', OrderRoutes)
    .use('/blogs', BlogRoutes)
    .use('/send-mail', MailRoutes)
    .use('/files', FileUploadRoutes)
    .use('/docs', swaggerUI.serve, swaggerUI.setup(docs))


export default rootRouter