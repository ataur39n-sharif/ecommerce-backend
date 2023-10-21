import {ProductModel} from "@/App/modules/Products/product.model";
import {
    IProduct,
    ISingleProduct,
    IVariableProduct,
    TBulkProductPayload,
    TExtraProductKeys
} from "@/App/modules/Products/product.types";
import {Types} from "mongoose";
import {IQueryItems, TDataWithMeta} from "@/Utils/types/query.type";
import {calculatePagination, manageSorting, MongoQueryHelper} from "@/Utils/helper/queryOptimize";
import {ProductUtils} from "@/App/modules/Products/product.utils";
import {ProductValidation} from "@/App/modules/Products/product.validation";

const getProducts = async (payload: IQueryItems<IProduct>): Promise<TDataWithMeta<IProduct[]>> => {
    const {search} = payload.searchFields
    const {page, limit, skip} = calculatePagination(payload.paginationFields)
    const {sortBy, sortOrder} = manageSorting(payload.sortFields)

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
        let tempConditions: {}[] = [];
        Object.entries(payload.filterFields).map(([key, value]) => {
            if (Object.keys(ProductModel.schema.obj).includes(key)) {
                if (key !== 'category') {
                    // mongoose schema keys
                    const fieldType = ProductModel.schema.path(key).instance
                    // return
                    tempConditions.push(MongoQueryHelper(fieldType, key, value as string))
                }
            } else if ((ProductUtils.getProductExtraKeys('keys') as string[]).includes(key)) {
                //extra keys
                const {fieldType} = ProductUtils.getProductExtraKeys('specific', key) as TExtraProductKeys
                console.log('extra keys', MongoQueryHelper(fieldType, key, value as string))
                tempConditions.push(MongoQueryHelper(fieldType, key, value as string))
            } else if (key === 'tags') {
                tempConditions.push({
                    tags: {
                        $in: value
                    }
                })
            }
        })
        tempConditions.length && queryConditions.push({
            $and: tempConditions.map((condition) => condition)
        })
    }

    const query = queryConditions.length ? {$and: queryConditions} : {}
    const products: IProduct[] = await ProductModel.find(query)
        .populate('category', '_id name slug')
        .sort({[sortBy]: sortOrder})
        .skip(skip)
        .limit(limit)
        .lean()


    const filteredByCategory = products?.filter((product) => (product.category as any)?.name?.toLowerCase().trim() == (payload.filterFields?.category as string)?.toLowerCase().trim())
    const total = await ProductModel.countDocuments()
    return {
        data: payload.filterFields?.category ? filteredByCategory : products,
        meta: {
            page,
            limit,
            total
        },
    }
}
const getSingleProduct = async (slug: string): Promise<IProduct | null> => {
    return ProductModel.findOne({
        slug
    }).populate('category', '_id name slug').lean()
}

const addProduct = async (payload: Partial<ISingleProduct | IVariableProduct>): Promise<IProduct | null> => {
    const validateProduct = ProductValidation.productZodSchema.parse(payload)
    return await ProductModel.create(validateProduct)
}

const updateProduct = async (_id: Types.ObjectId, payload: Partial<ISingleProduct | IVariableProduct>): Promise<IProduct | null> => {
    const validateProduct = ProductValidation.productZodSchema.partial().parse(payload)

    return ProductModel.findOneAndUpdate({_id}, validateProduct, {
        new: true
    }).lean()
}
const updateBulkProducts = async (ids: Types.ObjectId[], payload: TBulkProductPayload) => {
    return ProductModel.updateMany({_id: {$in: ids}}, payload);
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
    addProduct,
    updateProduct,
    updateBulkProducts,
    deleteSingleProduct,
    deleteBulkProducts
}