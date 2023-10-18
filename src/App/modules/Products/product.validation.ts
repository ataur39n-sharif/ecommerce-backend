import {z} from 'zod';
import {ReviewValidation} from "@/App/modules/Reviews/review.validation";
import {Types} from "mongoose";

const metaDataZodSchema = z.object({
    title: z.string(),
    description: z.string(),
})

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
    slug: z.string(),
    short_description: z.string().optional(),
    price: z.number(),
    stock: z.number(),
    category: z.instanceof(Types.ObjectId),
    images: z.array(z.string()),
    thumbnail: z.string(),
    productType: z.enum(['simple_product']),
    metadata: metaDataZodSchema,
    tags: z.array(z.string()),
    attributes: z.array(productAttributeZodSchema).optional(),
    discount: discountZodSchema.optional(),
});

const variableProductAttr = z.object({
    label: z.string(),
    value: z.string(),
})

const variableProductAttributeZodSchema = z.object({
    image: z.string().optional(),
    price: z.number(),
    stock: z.number().optional(),
    attributes: z.array(variableProductAttr),
    discount: z.object({
        type: z.enum(["percentage", "fixed"]),
        value: z.number(),
    }).optional(),
});

const variableProduct = z.object({
    name: z.string(),
    description: z.string(),
    slug: z.string(),
    short_description: z.string().optional(),
    category: z.instanceof(Types.ObjectId),
    images: z.array(z.string()),
    thumbnail: z.string(),
    productType: z.enum(['variable_product']),
    tags: z.array(z.string()),
    attributes: z.array(productAttributeZodSchema),
    variableProducts: z.array(variableProductAttributeZodSchema),
    metadata: metaDataZodSchema
});


const productZodSchema = z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    short_description: z.string().optional(),
    price: z.optional(z.number()),
    stock: z.optional(z.number()),
    category: z.instanceof(Types.ObjectId),
    images: z.array(z.string()),
    thumbnail: z.string(),
    reviews: z.array(ReviewValidation.reviewZodSchema).optional(),
    productType: z.enum(['simple_product', 'variable_product']),
    tags: z.array(z.string()),
    attributes: z.array(productAttributeZodSchema),
    discount: z.optional(discountZodSchema),
    status: z.enum(["published", "unpublished"]).default('published'),
    variableProducts: z.optional(z.array(variableProductAttributeZodSchema)),
    metadata: metaDataZodSchema,
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

const requiredUpdatePayload = z.object({
    productType: z.enum(['simple_product', 'variable_product']),
    variableProducts: z.optional(
        z.array(variableProductAttributeZodSchema)
    )
}).refine((data) => data.productType === 'variable_product' ? data.variableProducts : true, {
    message: 'variableProducts is required when productType is variable_product',
    path: ['variableProducts'],
})


export const ProductValidation = {
    productZodSchema,
    singleProduct,
    variableProduct,
    requiredUpdatePayload
}