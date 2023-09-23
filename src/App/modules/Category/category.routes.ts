import {Router} from "express";
import {CategoryController} from "@/App/modules/Category/category.controller";

const CategoryRoutes = Router()

CategoryRoutes
    .get('/', CategoryController.getAll)
    .post('/', CategoryController.addNew)
    .patch('/', CategoryController.updateInfo)
    .delete('/:id', CategoryController.deleteCategory)

export default CategoryRoutes