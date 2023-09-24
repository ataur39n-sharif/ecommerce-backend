import {TCategory} from "@/App/modules/Category/category.types";
import {CategoryModel} from "@/App/modules/Category/category.model";
import {Types} from "mongoose";
import {pickFunction} from "@/Utils/helper/pickFunction";

const loadCategories = async (): Promise<TCategory[]> => {
    return CategoryModel.find()
}
const createNew = async (payload: Partial<TCategory>): Promise<TCategory> => {
    return await CategoryModel.create(payload)
}

const updateCategory = async (_id: Types.ObjectId, payload: Partial<TCategory>): Promise<TCategory | null> => {
    const modifiedData = pickFunction(payload as TCategory, ['name', 'slug', 'icon', 'parentId', 'tags', 'status'])

    return CategoryModel.findOneAndUpdate({
        _id
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
    createNew,
    updateCategory,
    deleteCategory
}