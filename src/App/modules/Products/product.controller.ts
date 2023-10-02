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
import {z} from "zod";
import {Types} from "mongoose";
import {MongoHelper} from "@/Utils/helper/mongoHelper";

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

const singleProduct = catchAsync(async (req, res, next) => {

    const id = z.instanceof(Types.ObjectId).parse(MongoHelper.convertToObjectId(req.params.id))

    const data = await ProductServices.getSingleProduct(id)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Product fetched successfully',
        data
    })
})

const newProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const data = pickFunction<IProduct>(req.body, Object.keys(ProductModel.schema.obj))
    const payload = pickFunction<IProduct, keyof IProduct>(req.body, Object.keys(ProductModel.schema.obj) as (keyof IProduct)[]);

    let data: IProduct | null = null;

    if (payload.productType === 'variable_product') {
        const validateVariablePd = ProductValidation.variableProduct.parse(payload)
        data = await ProductServices.addProduct(validateVariablePd)
    } else {
        const validateSinglePd = ProductValidation.singleProduct.parse(payload)
        data = await ProductServices.addProduct(validateSinglePd)
    }

    sendResponse.success(res, {
        statusCode: 201,
        message: 'Product successfully added.',
        data
    })
})

const updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.instanceof(Types.ObjectId).parse(MongoHelper.convertToObjectId(req.params?.id))
    const requiredPayload = z.object({
        productType: z.enum(['simple_product', 'variable_product'])
    }).parse({
        productType: req.body.productType
    })

    const payload = pickFunction<IProduct, keyof IProduct>(req.body, Object.keys(ProductModel.schema.obj) as (keyof IProduct)[]);

    let data: IProduct | null = null;

    if (requiredPayload.productType === 'variable_product') {
        const validateVariablePd = ProductValidation.variableProduct.partial().parse(payload)
        data = await ProductServices.updateProduct(id, validateVariablePd)
    } else {
        const validateSinglePd = ProductValidation.singleProduct.partial().parse(payload)
        data = await ProductServices.updateProduct(id, validateSinglePd)
    }

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Product successfully updated.',
        data
    })
})


const deleteSingleProduct = catchAsync(async (req, res, next) => {

    const id = z.instanceof(Types.ObjectId).parse(MongoHelper.convertToObjectId(req.params.id))

    const data = await ProductServices.deleteSingleProduct(id)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Product deleted successfully',
        data
    })
})

const deleteBulkProducts = catchAsync(async (req, res, next) => {

    const payload = pickFunction(req.body, ['idList'])
    let idList = [];
    if (payload?.idList) {
        for (let i = 0; i < payload?.idList.length; i++) {
            const id = payload?.idList[i]
            idList.push(MongoHelper.convertToObjectId(id))
        }
    }

    const validateList = z.array(z.instanceof(Types.ObjectId)).parse(idList)

    const data = await ProductServices.deleteBulkProducts(validateList)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Product deleted successfully',
        data
    })
})


export const ProductController = {
    allProducts,
    singleProduct,
    newProduct,
    updateProduct,
    deleteSingleProduct,
    deleteBulkProducts
}