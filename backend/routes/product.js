import express from "express";
import { getProducts, getSingleProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getSingleProduct);

export default router;