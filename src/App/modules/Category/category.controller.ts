import catchAsync from "@/Utils/helper/catchAsync";
import {CategoryService} from "@/App/modules/Category/category.services";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {CategoryModel} from "@/App/modules/Category/category.model";
import {CategoryValidation} from "@/App/modules/Category/category.validation";
import {z} from "zod";
import {Types} from "mongoose";
import {MongoHelper} from "@/Utils/helper/mongoHelper";
import {queryOptimization} from "@/Utils/helper/queryOptimize";
import {ICategory} from "@/App/modules/Category/category.types";

const getAll = catchAsync(async (req, res, next) => {
    const payload = queryOptimization<ICategory>(req, ['name', 'slug', 'status', 'tags'], ['grouped'])


    const data = await CategoryService.loadCategories(payload)
    sendResponse.success(res, {
        statusCode: 200,
        message: 'All categories fetch successfully',
        data
    })
})

const getSingleCategory = catchAsync(async (req, res, next) => {

    const slug = z.string().parse(req.params.slug)
    const showChildren = Boolean(req.query.children) || false

    const data = await CategoryService.singleCategory(slug, showChildren)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Single category fetch successfully',
        data
    })
})


const addNew = catchAsync(async (req, res, next) => {
    const payload = pickFunction(req.body, Object.keys(CategoryModel.schema.obj))

    const validateData = CategoryValidation.categoryZodSchema.parse({
        ...payload,
        slug: payload.slug?.split(' ').join('-'),
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
        message: 'Data updated successfully.',
        data: modifiedData
    })
})

const bulkUpdateCategories = catchAsync(async (req, res, next) => {
    const payload = pickFunction(req.body, ['categoryIds', 'status', 'tags'])
    const validation = CategoryValidation.bulkUpdateSchema.parse(payload)

    const updatedData = await CategoryService.bulkUpdate(validation.categoryIds, {...validation})

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Data updated successfully',
        data: updatedData

    })
})

const deleteCategory = catchAsync(async (req, res, next) => {

    const id = z.instanceof(Types.ObjectId).parse(MongoHelper.convertToObjectId(req.params.id))

    await CategoryService.deleteCategory(id)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Data Deleted successfully.',
    })
})

const bulkDelete = catchAsync(async (req, res, next) => {

})

export const CategoryController = {
    getAll,
    getSingleCategory,
    addNew,
    updateInfo,
    bulkUpdateCategories,
    deleteCategory
}