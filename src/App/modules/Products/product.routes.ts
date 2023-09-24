import {Router} from "express";
import {ProductController} from "@/App/modules/Products/product.controller";

const ProductRoutes = Router()

ProductRoutes
    .get('/', ProductController.allProducts)
    .get('/:id', ProductController.singleProduct)
    .post('/', ProductController.newProduct)
    .patch('/', ProductController.newProduct)

export default ProductRoutes