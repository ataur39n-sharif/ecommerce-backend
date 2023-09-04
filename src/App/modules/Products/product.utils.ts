import {TExtraProductKeysType} from "@/App/modules/Products/product.types";

const ProductExtraKeys = [
    {
        fieldName: 'min_price',
        fieldType: 'Number',
    },
    {
        fieldName: 'max_price',
        fieldType: 'Number',
    }
]
export const getProductExtraKeys = (type: TExtraProductKeysType, keyName?: string) => {
    switch (type) {
        case 'key':
            return ProductExtraKeys.map((eachField) => eachField.fieldName)
        case "specific":
            return ProductExtraKeys.find((field) => field.fieldName === keyName) || {}
        default :
            return []
    }
}

export const ProductUtils = {
    getProductExtraKeys
}