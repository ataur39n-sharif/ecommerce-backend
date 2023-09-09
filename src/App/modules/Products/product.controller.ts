import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {queryOptimization} from "@/Utils/helper/queryOptimize";
import {IProduct} from "@/App/modules/Products/product.types";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {ProductServices} from "@/App/modules/Products/product.service";
import {ProductUtils} from "@/App/modules/Products/product.utils";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {ProductModel} from "@/App/modules/Products/product.model";
import {ProductValidation} from "@/App/modules/Products/product.validation";

const allProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {
        searchFields,
        filterFields,
        sortFields,
        paginationFields
    } = queryOptimization<IProduct>(req, ['category', 'status'], ProductUtils.getProductExtraKeys() as string[])

    const data = await ProductServices.getProducts({
        searchFields, filterFields, sortFields, paginationFields
    })

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Products fetched successfully',
        data
    })
})

const newProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const data = pickFunction<IProduct>(req.body, Object.keys(ProductModel.schema.obj))
    const payload = pickFunction<IProduct, keyof IProduct>(req.body, Object.keys(ProductModel.schema.obj) as (keyof IProduct)[]);

    let data: IProduct | null = null;

    if (payload.productType === 'variable_product') {
        const validateVariablePd = ProductValidation.variableProduct.parse(payload)
        data = await ProductServices.addVariableProduct(validateVariablePd)
    } else {
        const validateSinglePd = ProductValidation.singleProduct.parse(payload)
        data = await ProductServices.addSingleProduct(validateSinglePd)
    }

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Product successfully added.',
        data
    })
})


export const ProductController = {
    allProducts,
    newProduct
}