import catchAsync from "@/Utils/helper/catchAsync";
import {CategoryService} from "@/App/modules/Category/category.services";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {CategoryModel} from "@/App/modules/Category/category.model";
import {CategoryValidation} from "@/App/modules/Category/category.validation";
import {z} from "zod";
import {Types} from "mongoose";
import {MongoHelper} from "@/Utils/helper/mongoHelper";

const getAll = catchAsync(async (req, res, next) => {
    const data = await CategoryService.loadCategories()
    sendResponse.success(res, {
        statusCode: 200,
        message: 'All categories fetch successfully',
        data
    })
})

const addNew = catchAsync(async (req, res, next) => {
    const payload = pickFunction(req.body, Object.keys(CategoryModel.schema.obj))

    const validateData = CategoryValidation.categoryZodSchema.parse({
        ...payload,
        parentId: payload?.parentId && MongoHelper.convertToObjectId(payload?.parentId)
    })

    const insertData = await CategoryService.createNew(validateData)

    sendResponse.success(res, {
        statusCode: 201,
        message: 'Data inserted successfully.',
        data: insertData
    })
})

const updateInfo = catchAsync(async (req, res, next) => {
    const id = z.instanceof(Types.ObjectId).parse(MongoHelper.convertToObjectId(req.params.id))
    const payload = pickFunction(req.body, Object.keys(CategoryModel.schema.obj))

    const validateData = CategoryValidation.categoryZodSchema.partial().parse({
        ...payload,
        parentId: payload?.parentId && MongoHelper.convertToObjectId(payload?.parentId)
    })

    const modifiedData = await CategoryService.updateCategory(id, validateData)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Data inserted successfully.',
        data: modifiedData
    })
})

const deleteCategory = catchAsync(async (req, res, next) => {
    const id = z.instanceof(Types.ObjectId).parse(MongoHelper.convertToObjectId(req.params.id))
    console.log({id})
    await CategoryService.deleteCategory(id)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Data inserted successfully.',
    })
})

export const CategoryController = {
    getAll,
    addNew,
    updateInfo,
    deleteCategory
}