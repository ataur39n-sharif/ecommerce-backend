import {Router} from "express";
import {FileUploadHandler} from "@/Utils/fileUploadHandler/fileUpload";
import {FileUploadController} from "@/App/modules/FileUpload/fileUpload.controller";
import AccessLimit from "@/Middlewares/AccessLimit";
import {ERole} from "@/App/modules/Auth/auth.types";

const FileUploadRoutes = Router()

FileUploadRoutes
    .post(
        '/upload',
        AccessLimit([ERole.admin]),
        FileUploadHandler.upload.any(),
        FileUploadController.addNewFile
    )

export default FileUploadRoutes