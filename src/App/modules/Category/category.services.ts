import {ICategory, TBulkUpdatePayload} from "@/App/modules/Category/category.types";
import {CategoryModel} from "@/App/modules/Category/category.model";
import {Types} from "mongoose";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {CategoryUtils} from "@/App/modules/Category/category.utils";

const loadCategories = async (): Promise<ICategory[]> => {
    console.log('hit category')
    const result: ICategory[] = await CategoryModel.find().populate('parentId').lean()
    const groupResult = CategoryUtils.groupByParentId(result)
    // console.log({groupResult})
    return groupResult
}

const singleCategory = async (_id: Types.ObjectId): Promise<ICategory | null> => {
    return CategoryModel.findOne({_id}).lean()
}

const createNew = async (payload: Partial<ICategory>): Promise<ICategory> => {
    return await CategoryModel.create(payload)
}

const updateCategory = async (_id: Types.ObjectId, payload: Partial<ICategory>): Promise<ICategory | null> => {
    const modifiedData = pickFunction(payload as ICategory, ['name', 'slug', 'icon', 'parentId', 'tags', 'status'])

    return CategoryModel.findOneAndUpdate({
        _id
    }, modifiedData, {
        new: true
    })
}

const bulkUpdate = async (idList: Types.ObjectId[], payload: Partial<TBulkUpdatePayload>) => {
    const modifiedData = pickFunction(payload, ['tags', 'status'])

    return CategoryModel.updateMany({
        _id: {
            $in: idList
        }
    }, modifiedData, {
        new: true
    })
}

const deleteCategory = async (_id: Types.ObjectId) => {
    return CategoryModel.findOneAndDelete({
        _id
    })
}

export const CategoryService = {
    loadCategories,
    singleCategory,
    createNew,
    updateCategory,
    bulkUpdate,
    deleteCategory
}