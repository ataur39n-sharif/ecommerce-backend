import {z} from "zod";
import {Types} from "mongoose";

const categoryZodSchema = z.object({
    name: z.string(),
    slug: z.string(),
    icon: z.string(),
    parentId: z.instanceof(Types.ObjectId).optional(),
})

export const CategoryValidation = {
    categoryZodSchema
}