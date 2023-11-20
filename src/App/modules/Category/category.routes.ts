import {Router} from "express";
import {CategoryController} from "@/App/modules/Category/category.controller";

const CategoryRoutes = Router()

CategoryRoutes
    .get('/', CategoryController.getAll)
    .get('/:slug', CategoryController.getSingleCategory)
    .post('/', CategoryController.addNew)
    .patch('/:id', CategoryController.updateInfo)
    .delete('/:id', CategoryController.deleteCategory)

export default CategoryRoutes