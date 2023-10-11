import {z, ZodType} from "zod";
import {TOrderLineItems} from "@/App/modules/Orders/order.types";
import {ZodValidationSchema} from "@/Utils/validation/zod.validation";

const lineItemsZodSchema: ZodType<TOrderLineItems> = z.object({
    product:  z.string(),
    variation:  z.string(),
    quantity: z.number(),
    price: z.number()
})

const shippingInfoZodSchema = ZodValidationSchema.addressPayload.extend({
    name: z.string()
})

const orderPayloadZodSchema = z.object({
    uid: z.string(),
    lineItems: z.array(lineItemsZodSchema),
    shippingAddress: shippingInfoZodSchema
})

export const OrderValidation = {
    orderPayloadZodSchema
}