import {TCategory} from "@/App/modules/Category/category.types";
import {CategoryModel} from "@/App/modules/Category/category.model";
import {Types} from "mongoose";

const loadCategories = async (): Promise<TCategory[]> => {
    return CategoryModel.find()
}
const createNew = async (payload: Partial<TCategory>): Promise<TCategory> => {
    return await CategoryModel.create(payload)
}

const updateCategory = async (_id: Types.ObjectId, payload: Partial<TCategory>): Promise<TCategory | null> => {
    console.log('from update category', payload)
    return CategoryModel.findOneAndUpdate({
        _id
    }, payload, {
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