import {ProductModel} from "@/App/modules/Products/product.model";
import {IProduct, TBulkProductPayload} from "@/App/modules/Products/product.types";
import {Types} from "mongoose";
import {IQueryItems} from "@/Utils/types/query.type";
import {calculatePagination, manageSorting, MongoQueryHelper} from "@/Utils/helper/queryOptimize";

const getProducts = async (payload: IQueryItems<IProduct>): Promise<IProduct[] | null> => {
    const {search} = payload.searchFields
    const {page, limit, skip} = calculatePagination(payload.paginationFields)
    const {sortBy, sortOrder} = manageSorting(payload.sortFields)

    console.log(payload.filterFields)

    const queryConditions = []

    //search condition
    if (search) {
        queryConditions.push({
            $or: ['name', 'category'].map((field) => {
                const fieldType = ProductModel.schema.path(field).instance
                return MongoQueryHelper(fieldType, field, search)
            })
        })
    }

    //filter conditions
    if (Object.entries(payload.filterFields).length > 0) {
        console.log(payload.filterFields)
        queryConditions.push({
            $and: Object.entries(payload.filterFields).map(([key, value]) => {
                let fieldType = 'String'
                if (Object.keys(ProductModel.schema.obj).includes(key)) {
                    fieldType = ProductModel.schema.path(key).instance
                }
                return MongoQueryHelper(fieldType, key, value as string)
            })
        })
    }

    const query = queryConditions.length ? {$and: queryConditions} : {}
    return ProductModel.find(query).lean()
}

const getSingleProduct = async (id: Types.ObjectId): Promise<IProduct | null> => {
    return ProductModel.findOne({_id: id}).lean()
}

const updateSingleProduct = async (id: Types.ObjectId, payload: Partial<IProduct>): Promise<IProduct | null> => {
    return ProductModel.findOneAndUpdate({_id: id}, payload, {
        new: true
    })
}
const updateBulkProducts = async (ids: Types.ObjectId[], payload: TBulkProductPayload) => {
    return ProductModel.updateMany({_id: {$in: ids}}, payload)
}
const deleteSingleProduct = async (id: Types.ObjectId): Promise<IProduct | null> => {
    return ProductModel.findOneAndDelete({_id: id}).lean();
}

const deleteBulkProducts = async (ids: Types.ObjectId[]) => {
    return ProductModel.deleteMany({
        _id: {
            $in: ids
        }
    }).lean()
}


export const ProductServices = {
    getProducts,
    getSingleProduct,
    updateSingleProduct,
    updateBulkProducts,
    deleteSingleProduct,
    deleteBulkProducts
}