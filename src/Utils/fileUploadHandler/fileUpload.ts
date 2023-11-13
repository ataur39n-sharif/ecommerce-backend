import {v2 as cloudinary} from 'cloudinary';
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname.trim())
    }
})

const upload = multer({storage: storage})

const uploadToCloudinary = async (file: any) => {
    try {
        console.log({file})
        const data = await cloudinary.uploader.upload(file.path,
            {public_id: file.originalname}, (err, data) => {
                console.log({err, data})
                return data
            });
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