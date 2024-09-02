import productModel from "../models/productModel.js";
import { Op } from "sequelize";

// To Fetch products (API for GET product) => /api/v1/products
async function getProducts(req, res, next) {
  try {
    // Using API Search functionality
    const query = req.query.keyword
      ? { name: { [Op.iLike]: `%${req.query.keyword}%` } }
      : {};

    // Fetching products based on the query
    const products = await productModel.findAll({ where: query });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
}

// To Fetch single product (API for GET Single product) => /api/v1/products/:id
async function getSingleProduct(req, res, next) {
  try {
    const product = await productModel.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found!",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({
      success: false,
      message: "Unable to get product with that ID or Invalid ID",
    });
  }
}

export { getProducts, getSingleProduct };
