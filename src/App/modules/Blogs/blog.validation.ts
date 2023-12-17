import {z} from "zod";

const blogZodSchema = z.object({
    title: z.string(),
    slug: z.string(),
    content: z.string(),
    images: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
})

export const BlogValidation = {
    blogZodSchema
}