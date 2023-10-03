import {IProduct, TExtraProductKeys, TExtraProductKeysType} from "@/App/modules/Products/product.types";

const ProductExtraKeys: TExtraProductKeys[] = [
    {
        fieldName: 'min_price',
        fieldType: 'Number',
    },
    {
        fieldName: 'max_price',
        fieldType: 'Number',
    }
]
const getProductExtraKeys = (type: TExtraProductKeysType = 'keys', keyName?: string) => {
    switch (type) {
        case 'keys':
            return ProductExtraKeys.map((eachField) => eachField.fieldName) //returning all extra keys
        case "specific":
            return ProductExtraKeys.find((field) => field.fieldName === keyName) || {} //returning specific a key
        default :
            return []
    }
}

const manageFilterFields = (fields: Partial<IProduct>) => {

}

export const ProductUtils = {
    getProductExtraKeys,
    manageFilterFields
}