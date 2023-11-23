import {Router} from "express";
import {FileUploadHandler} from "@/Utils/fileUploadHandler/fileUpload";
import {FileUploadController} from "@/App/modules/FileUpload/fileUpload.controller";

const FileUploadRoutes = Router()

FileUploadRoutes
    .post(
        '/upload',
        FileUploadHandler.upload.any(),
        FileUploadController.addNewFile
    )

export default FileUploadRoutes