import {Router} from "express";
import {BlogController} from "@/App/modules/Blogs/blog.controller";
import {FileUploadHandler} from "@/Utils/fileUploadHandler/fileUpload";

const BlogRoutes = Router();


BlogRoutes
    .get('/', BlogController.allBlogs)
    .post(
        '/new',
        // FileUploadHandler.upload.single('file'),
        // FileUploadHandler.upload.array('files', 5),
        FileUploadHandler.upload.fields([
            {name: 'thumbnail', maxCount: 1},
            {name: 'images', maxCount: 4}
        ]),
        BlogController.addNewBlog
    )

export default BlogRoutes