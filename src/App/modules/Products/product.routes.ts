import {Router} from "express";
import {ProductController} from "@/App/modules/Products/product.controller";
import {FileUploadHandler} from "@/Utils/fileUploadHandler/fileUpload";
import AccessLimit from "@/Middlewares/AccessLimit";
import {ERole} from "@/App/modules/Auth/auth.types";

const ProductRoutes = Router()

ProductRoutes
    .get('/', ProductController.allProducts)
    .get(
        '/:slug',
        ProductController.singleProduct
    )
    .post(
        '/',
        AccessLimit([ERole.admin]),
        FileUploadHandler.upload.fields([
            {name: 'thumbnail', maxCount: 1},
            {name: 'images', maxCount: 5,}
        ]),
        ProductController.newProduct
    )
    .patch('/:id', AccessLimit([ERole.admin]), ProductController.updateProduct)
    .delete('/', AccessLimit([ERole.admin]), ProductController.deleteBulkProducts)
    .delete('/:id', AccessLimit([ERole.admin]), ProductController.deleteSingleProduct)

/*
* update bulk product,
* */

export default ProductRoutes