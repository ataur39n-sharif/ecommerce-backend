import {z} from 'zod';


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
    short_description: z.string(),
    price: z.number(),
    stock: z.number(),
    category: z.string(),
    images: z.array(z.string()),
    thumbnail: z.string(),
    isVariableProduct: z.boolean(),
    tags: z.array(z.string()),
    attributes: z.array(productAttributeZodSchema).optional(),
    discount: discountZodSchema.optional(),
    status: z.enum(["published", "unpublished"]),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

const variableProductAttributeZodSchema = z.object({
    image: z.string(),
    price: z.number(),
    stock: z.number(),
    attributes: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })),
    discount: z.object({
        type: z.enum(["percentage", "fixed"]),
        value: z.number(),
    }),
});

const variableProduct = z.object({
    name: z.string(),
    description: z.string(),
    short_description: z.string(),
    category: z.string(),
    images: z.array(z.string()),
    thumbnail: z.string(),
    isVariableProduct: z.boolean(),
    tags: z.array(z.string()),
    attributes: z.array(productAttributeZodSchema),
    status: z.enum(["published", "unpublished"]),
    variableProducts: z.array(variableProductAttributeZodSchema)
});

export const ProductValidation = {
    singleProduct,
    variableProduct
}