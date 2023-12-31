import {model, Schema} from "mongoose";
import {ICategory} from "@/App/modules/Category/category.types";
import {MetaDataSchema} from "@/Utils/schema/meta.schema";

export const dataSchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        default: null,
    },
    tags: {
        type: [String],
        default: []
    },
    blog: {
        type: String,
        default: null,
    },
    metadata: {
        type: MetaDataSchema,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true,
    versionKey: false
})

export const CategoryModel = model('category', dataSchema)