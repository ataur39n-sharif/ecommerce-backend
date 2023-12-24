import {Router} from "express";
import {CategoryController} from "@/App/modules/Category/category.controller";
import AccessLimit from "@/Middlewares/AccessLimit";
import {ERole} from "@/App/modules/Auth/auth.types";

const CategoryRoutes = Router()

CategoryRoutes
    .get('/', CategoryController.getAll)
    .get('/:slug', CategoryController.getSingleCategory)
    .post('/',
        AccessLimit([ERole.admin]),
        CategoryController.addNew
    )
    .patch('/:id',
        AccessLimit([ERole.admin]),
        CategoryController.updateInfo
    )
    .delete('/:id',
        AccessLimit([ERole.admin]),
        CategoryController.deleteCategory
    )

export default CategoryRoutes