"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const categoryValidation_middleware_1 = require("../middlewares/categoryValidation.middleware");
const idCategoryValidation_middleware_1 = require("../middlewares/idCategoryValidation.middleware"); // New middleware for ID validation
const router = express_1.default.Router();
// Category Routes
router.post("/", categoryValidation_middleware_1.validateCategory, category_controller_1.createCategory); // Validate category body before creation
router.get("/", category_controller_1.getAllCategories);
router.get("/:id", idCategoryValidation_middleware_1.validateIdParam, category_controller_1.getCategoryById); // Validate ID before fetching category
router.put("/:id", idCategoryValidation_middleware_1.validateIdParam, categoryValidation_middleware_1.validateCategory, category_controller_1.updateCategory); // Validate both ID and body
router.delete("/:id", idCategoryValidation_middleware_1.validateIdParam, category_controller_1.deleteCategory); // Validate ID before deletion
exports.default = router;
// import express from 'express';
// import { categoryRoutes } from '../controllers/category.controller';
// import { categorySchema } from '../validations/schemas';
// import * as categoriesController from '../controllers/category.controller';
// import { validate } from '../middleware/validation';
// interface CategoryRoute {
//   method: string;
//   path: string;
//   middleware?: express.RequestHandler[];
//   handler: express.RequestHandler;
// }
// const router = express.Router();
// categoryRoutes.forEach((route: CategoryRoute) => {
//   const method = route.method as 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
//   if (router[method]) {
//     router[method](
//       route.path,
//       ...(route.middleware || []),
//       route.handler
//     );
//   } else {
//     console.error(`Unsupported HTTP method: ${method}`);
//   }
// });
// router.post(
//   '/',
//   validate(categorySchema),
//   categoriesController.createCategory
// );
// export default router;
