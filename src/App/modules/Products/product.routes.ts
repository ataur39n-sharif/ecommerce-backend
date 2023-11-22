import {Router} from "express";
import {ProductController} from "@/App/modules/Products/product.controller";
import {FileUploadHandler} from "@/Utils/fileUploadHandler/fileUpload";

const ProductRoutes = Router()

ProductRoutes
    .get('/', ProductController.allProducts)
    .get(
        '/:slug',
        ProductController.singleProduct
    )
    .post(
        '/',
        FileUploadHandler.upload.fields([
            {name: 'thumbnail', maxCount: 1},
            {name: 'images', maxCount: 5,}
        ]),
        ProductController.newProduct
    )
    .patch('/:id', ProductController.updateProduct)
    .delete('/', ProductController.deleteBulkProducts)
    .delete('/:id', ProductController.deleteSingleProduct)

/*
* update bulk product,
* */

export default ProductRoutes