import {model, Schema} from "mongoose";
import {
    IProduct,
    TDiscount,
    TProductAttribute,
    TVariableAttr,
    TVariableProductAttribute
} from "@/App/modules/Products/product.types";


const productAttributeSchema = new Schema<TProductAttribute>({
    label: {
        type: String,
    },
    values: {
        type: [String],
        default: []
    }
}, {
    _id: false,
    versionKey: false
})

const variableProductAttr = new Schema<TVariableAttr>({
    label: {
        type: String,
    },
    value: {
        type: String
    }
}, {
    _id: false,
    versionKey: false
})

const variableProductAttributeSchema = new Schema<TVariableProductAttribute>({
    image: {
        type: String,
        default: null
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    attributes: {
        type: [variableProductAttr],
        required: true
    }
}, {
    _id: false,
    versionKey: false
})

const discountSchema = new Schema<TDiscount>({
    type: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}, {
    _id: false,
    versionKey: false
})

const dataSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    short_description: {
        type: String,
        default: null
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: null
    },
    stock: {
        type: Number,
        default: null
    },
    images: {
        type: [String],
        default: []
    },
    thumbnail: {
        type: String,
        required: true
    },
    reviews: {
        type: [Schema.Types.ObjectId],
        ref: 'Review',
        default: []
    },
    isVariableProduct: {
        type: Boolean,
        default: false,
        required: true
    },
    productType: {
        type: String,
        enum: ['single_product', 'variable_product'],
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    attributes: {
        type: [productAttributeSchema]
    },
    discount: {
        type: discountSchema,
        default: null
    },
    status: {
        type: String,
        enum: ['published', 'unpublished'],
        required: true
    },
    variableProducts: {
        type: [variableProductAttributeSchema],
        default: null
    },
}, {
    timestamps: true,
    versionKey: false
})

export const ProductModel = model<IProduct>('Product', dataSchema)