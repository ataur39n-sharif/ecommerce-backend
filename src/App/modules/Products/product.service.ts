import {ProductModel} from "@/App/modules/Products/product.model";
import {IProduct, TBulkProductPayload} from "@/App/modules/Products/product.types";
import {Types} from "mongoose";

const getProducts = async (): Promise<IProduct[]> => {
    return ProductModel.find({}).lean()
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