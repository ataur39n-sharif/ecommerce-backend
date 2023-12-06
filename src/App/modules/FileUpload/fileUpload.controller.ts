import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {FileUploadHandler} from "@/Utils/fileUploadHandler/fileUpload";
import {IGeneratedUrlPayload, IGroupedGeneratedUrlPayload} from "@/App/modules/FileUpload/fileUpload.types";
import {z} from "zod";

const addNewFile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const allImages = req.files as Express.Multer.File[]
    const type = z.enum(['blogs', 'products']).optional().parse(req.body.type)

    let allImageUrls: IGeneratedUrlPayload[] = []

    if (allImages?.length) {
        for (const image of allImages) {
            const {fileName, url} = await FileUploadHandler.uploadToCloudinary(image, type)
            allImageUrls.push({fileName, url, fieldName: image.fieldname})
        }
    }

    const groupedData = allImageUrls.reduce((acc: IGroupedGeneratedUrlPayload[], obj) => {
        const existingGroup = acc.find((group) => group.fieldName === obj.fieldName);

        if (existingGroup) {
            existingGroup.files.push({
                fileName: obj.fileName,
                url: obj.url
            });
        } else {
            acc.push({
                fieldName: obj.fieldName,
                files: [{
                    fileName: obj.fileName,
                    url: obj.url
                }]
            });
        }
        return acc;
    }, []);

    sendResponse.success(res, {
        statusCode: 200,
        message: 'File uploaded successfully',
        data: groupedData
    })

})


export const FileUploadController = {
    addNewFile
}