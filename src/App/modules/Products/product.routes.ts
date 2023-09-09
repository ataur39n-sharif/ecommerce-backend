import {Router} from "express";
import {ProductController} from "@/App/modules/Products/product.controller";

const ProductRoutes = Router()

ProductRoutes
    .get('/', ProductController.allProducts)
    .post('/', ProductController.newProduct)

export default ProductRoutes