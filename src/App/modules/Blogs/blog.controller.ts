import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {queryOptimization} from "@/Utils/helper/queryOptimize";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {IBlog} from "@/App/modules/Blogs/blog.type";
import {BlogService} from "@/App/modules/Blogs/blog.services";
import {z} from "zod";
import {Types} from "mongoose";
import {MongoHelper} from "@/Utils/helper/mongoHelper";
import {ProductServices} from "@/App/modules/Products/product.service";
import {FileUploadHandler} from "@/Utils/fileUploadHandler/fileUpload";


const allBlogs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {
        searchFields,
        filterFields,
        sortFields,
        paginationFields
    } = queryOptimization<IBlog>(req, ['title'])

    const data = await BlogService.allBlogs({
        searchFields, filterFields, sortFields, paginationFields
    })

    sendResponse.success(res, {
        statusCode: 200,
        message: 'All Blogs fetched successfully',
        data
    })
})


const singleBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const slug = z.string().parse(req.params.slug)

    const data = await BlogService.singleBlog(slug)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Blog fetched successfully',
        data
    })
})

const addNewBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // console.log({
    //     thumbnail: req.files
    // })
    // console.log({
    //     images: req.files
    // })
    // console.log(req.body)
    if ((req.files as any)?.thumbnail.length) {
        // (req.files as any).images.map(async (image: any) => await FileUploadHandler.uploadToCloudinary(image))

        (req.files as any).thumbnail.map(async (image: any) => await FileUploadHandler.uploadToCloudinary(image))

    }

    sendResponse.success(res, {
        statusCode: 201,
        message: 'Blog added successfully',
        data: req.files
    })

})

const deleteSingleBlog = catchAsync(async (req, res, next) => {

    const id = z.instanceof(Types.ObjectId).parse(MongoHelper.convertToObjectId(req.params.id))

    const data = await ProductServices.deleteSingleProduct(id)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Product deleted successfully',
        data
    })
})


// const allBlogs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//
// })


export const BlogController = {
    allBlogs, addNewBlog
}