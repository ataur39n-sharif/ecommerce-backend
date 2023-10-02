import {Router} from "express";
import {ProductController} from "@/App/modules/Products/product.controller";

const ProductRoutes = Router()

ProductRoutes
    .get('/', ProductController.allProducts)
    .get('/:id', ProductController.singleProduct)
    .post('/', ProductController.newProduct)
    .patch('/:id', ProductController.updateProduct)
    .delete('/', ProductController.deleteBulkProducts)
    .delete('/:id', ProductController.deleteSingleProduct)

/*
* update bulk product,
* */

export default ProductRoutes