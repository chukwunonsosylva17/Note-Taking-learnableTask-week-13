import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { validateCategory } from "../middlewares/categoryValidation.middleware";
import { validateIdParam } from "../middlewares/idCategoryValidation.middleware"; // New middleware for ID validation

const router = express.Router();

// Category Routes
router.post("/", validateCategory, createCategory); // Validate category body before creation
router.get("/", getAllCategories);
router.get("/:id", validateIdParam, getCategoryById); // Validate ID before fetching category
router.put("/:id", validateIdParam, validateCategory, updateCategory); // Validate both ID and body
router.delete("/:id", validateIdParam, deleteCategory); // Validate ID before deletion

export default router;





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