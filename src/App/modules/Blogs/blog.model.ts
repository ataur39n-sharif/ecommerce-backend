import {model, Schema} from "mongoose";
import {IBlog} from "@/App/modules/Blogs/blog.type";

const dataSchema = new Schema<IBlog>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
    },
    thumbnail: {
        type: String,
    }
}, {
    timestamps: true,
    versionKey: false
})

export const BlogModel = model('Blog', dataSchema)