import {v2 as cloudinary} from 'cloudinary';
import multer from "multer";
import path from "path";
import CustomError from "@/Utils/errors/customError.class";
import * as fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        console.log({ext})
        const baseName = file.originalname.trim()?.split('.')[0]?.replace(/\s+/g, '-')
        console.log({baseName})
        const newFileName = `${baseName}${ext}`
        console.log({newFileName})
        cb(null, newFileName)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: function (req, file, cb) {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp']

        if (!allowedMimes.includes(file.mimetype)) {
            return cb(new CustomError('Invalid file type. Only image file allowed.Example - .jpeg, .png, .webp.', 400))
        }

        cb(null, true)
    }
})
const uploadToCloudinary = async (file: Express.Multer.File, folderName: string = 'random') => {
    try {
        console.log({file})
        const data = await cloudinary.uploader.upload(file.path,
            {public_id: file.filename?.split('.')[0], folder: folderName}, (err, data) => {
                console.log({err, data})
                return data
            });
        // Remove the uploaded file from the 'uploads' folder
        fs.unlinkSync(file.path);
        console.log({data})
        return data
    } catch (e) {
        console.log((e as Error).message)
    }
}


export const FileUploadHandler = {
    upload,
    uploadToCloudinary
}