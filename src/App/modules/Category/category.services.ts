import {ICategory, TBulkUpdatePayload} from "@/App/modules/Category/category.types";
import {CategoryModel} from "@/App/modules/Category/category.model";
import {Types} from "mongoose";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {CategoryUtils} from "@/App/modules/Category/category.utils";
import {IQueryItems} from "@/Utils/types/query.type";
import {calculatePagination, manageSorting, MongoQueryHelper} from "@/Utils/helper/queryOptimize";

const loadCategories = async (payload:IQueryItems<ICategory>) => {
    const {search} = payload.searchFields
    const {page, limit, skip} = calculatePagination(payload.paginationFields)
    const {sortBy, sortOrder} = manageSorting(payload.sortFields)

    const queryConditions = []

    //search condition
    if (search) {
        queryConditions.push({
            $or: ['name', 'slug','status'].map((field) => {
                const fieldType = CategoryModel.schema.path(field).instance
                return MongoQueryHelper(fieldType, field, search)
            })
        })
    }

    //filter condition
    if (Object.entries(payload.filterFields).length > 0) {
        let tempConditions:{}[] =[];
        Object.entries(payload.filterFields).map(([key, value]) => {
            if (Object.keys(CategoryModel.schema.obj).includes(key)) {
                // mongoose schema keys
                const fieldType = CategoryModel.schema.path(key).instance
                // return
                tempConditions.push(MongoQueryHelper(fieldType, key, value as string))
            }else if(key ==='tags'){
                tempConditions.push( {
                    tags: {
                        $in:value
                    }
                })
            }
        })
        tempConditions.length && queryConditions.push({
            $and: tempConditions.map((condition)=>condition)
        })
    }

    const query = queryConditions.length ? {$and: queryConditions} : {}

    const categories: ICategory[] = await CategoryModel.find(query)
        .populate('parentId')
        .sort({[sortBy]: sortOrder})
        .skip(skip)
        .limit(limit)
        .lean()

    // console.log({categories})
    const groupResult = CategoryUtils.groupByParentId(categories)
    // console.log({groupResult})
    const total = await CategoryModel.countDocuments()
    return {
        categories:(payload.filterFields as any).grouped ? groupResult: categories,
        meta: {
            page,
            limit,
            total
        },
        query
    }
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