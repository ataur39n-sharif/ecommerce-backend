import {z} from 'zod';
import {ReviewValidation} from "@/App/modules/Reviews/review.validation";


const productAttributeZodSchema = z.object({
    label: z.string(),
    values: z.array(z.string()),
});

const discountZodSchema = z.object({
    type: z.enum(["percentage", "fixed"]),
    value: z.number(),
});

const singleProduct = z.object({
    name: z.string(),
    description: z.string(),
    short_description: z.string().optional(),
    price: z.number(),
    stock: z.number(),
    category: z.string(),
    images: z.array(z.string()),
    thumbnail: z.string(),
    isVariableProduct: z.boolean(),
    productType: z.enum(['single_product']),
    tags: z.array(z.string()),
    attributes: z.array(productAttributeZodSchema).optional(),
    discount: discountZodSchema.optional(),
});

const variableProductAttr = z.object({
    label: z.string(),
    value: z.string(),
})

const variableProductAttributeZodSchema = z.object({
    image: z.string(),
    price: z.number(),
    stock: z.number(),
    attributes: z.array(variableProductAttr),
    discount: z.object({
        type: z.enum(["percentage", "fixed"]),
        value: z.number(),
    }),
});

const variableProduct = z.object({
    name: z.string(),
    description: z.string(),
    short_description: z.string().optional(),
    category: z.string(),
    images: z.array(z.string()),
    thumbnail: z.string(),
    isVariableProduct: z.boolean(),
    productType: z.enum(['variable_product']),
    tags: z.array(z.string()),
    attributes: z.array(productAttributeZodSchema),
    variableProducts: z.array(variableProductAttributeZodSchema)
});


const productZodSchema = z.object({
    _id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    short_description: z.string().optional(),
    price: z.optional(z.number()),
    stock: z.optional(z.number()),
    category: z.string(),
    images: z.array(z.string()),
    thumbnail: z.string(),
    reviews: z.array(ReviewValidation.reviewZodSchema).optional(),
    isVariableProduct: z.boolean(),
    productType: z.enum(['single_product', 'variable_product']),
    tags: z.array(z.string()),
    attributes: z.array(productAttributeZodSchema),
    discount: z.optional(discountZodSchema),
    status: z.enum(["published", "unpublished"]).default('published'),
    variableProducts: z.optional(z.array(variableProductAttributeZodSchema)),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const ProductValidation = {
    productZodSchema,
    singleProduct,
    variableProduct
}