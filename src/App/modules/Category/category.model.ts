import {model, Schema} from "mongoose";
import {TCategory} from "@/App/modules/Category/category.types";

export const dataSchema = new Schema<TCategory>({
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
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    tags: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
})

export const CategoryModel = model('category', dataSchema)