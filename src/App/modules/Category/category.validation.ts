import {z} from "zod";
import {Types} from "mongoose";

const metaDataZodSchema = z.object({
    title: z.string(),
    description: z.string(),
})

const categoryZodSchema = z.object({
    name: z.string(),
    slug: z.string(),
    icon: z.string(),
    parentId: z.instanceof(Types.ObjectId).optional(),
    status: z.enum(['active', 'inactive']).optional(),
    tags: z.array(z.string()).optional(),
    blog: z.string().optional(),
    metadata: metaDataZodSchema,
})

const bulkUpdateSchema = z.object({
    categoryIds: z.array(z.instanceof(Types.ObjectId)),
    status: z.enum(['active', 'inactive']).optional(),
    tags: z.array(z.string()).optional()
})

export const CategoryValidation = {
    categoryZodSchema,
    bulkUpdateSchema
}