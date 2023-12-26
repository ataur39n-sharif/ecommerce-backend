import {Router} from "express";
import {BlogController} from "@/App/modules/Blogs/blog.controller";
import {FileUploadHandler} from "@/Utils/fileUploadHandler/fileUpload";
import AccessLimit from "@/Middlewares/AccessLimit";
import {ERole} from "@/App/modules/Auth/auth.types";

const BlogRoutes = Router();


BlogRoutes
    .get('/', BlogController.allBlogs)
    .post(
        '/new',
        AccessLimit([ERole.admin]),
        FileUploadHandler.upload.fields([
            {name: 'thumbnail', maxCount: 1},
            {name: 'images', maxCount: 5,}
        ]),
        BlogController.addNewBlog
    )
    .patch('/:id',
        AccessLimit([ERole.admin]),
        BlogController.updateBlog
    )
    .delete('/:id', AccessLimit([ERole.admin]), BlogController.updateBlog)

export default BlogRoutes
