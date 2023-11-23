import {IProduct, IProductImages, TExtraProductKeys, TExtraProductKeysType} from "@/App/modules/Products/product.types";
import {FileUploadHandler} from "@/Utils/fileUploadHandler/fileUpload";
import {Request} from "express";

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

const manageProductImages = async (req: Request, slug: string) => {
    const allImages = req.files as IProductImages
    let images: string[] = [];
    let thumbnail: string = '';

    if (allImages?.thumbnail?.length) {
        console.log(allImages.thumbnail[0])
        const data = await FileUploadHandler.uploadToCloudinary(allImages.thumbnail[0], '/products/' + slug)
        thumbnail = data ? data.url : ''
    }

    if (allImages?.images?.length) {
        for (const image of allImages.images) {
            const data = await FileUploadHandler.uploadToCloudinary(image, '/products/' + slug)
            data && images.push(data.url)
        }
    }

    return {
        images,
        thumbnail
    }
}


export const ProductUtils = {
    getProductExtraKeys,
    manageFilterFields,
    manageProductImages
}