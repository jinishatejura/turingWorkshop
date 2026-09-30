const productService = require("../services/productService");
const { setCache } = require("../middleware/cache");

async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    setCache(req.originalUrl, products);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to read data" });
  }
}

async function getProductById(req, res) {
  try {
    const id = Number(req.params.id);
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    setCache(req.originalUrl, product);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to read data" });
  }
}

async function createProduct(req, res) {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
}

async function updateProduct(req, res) {
  try {
    const id = Number(req.params.id);
    const product = await productService.updateProduct(id, req.body);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
}

async function deleteProduct(req, res) {
  try {
    const id = Number(req.params.id);
    const product = await productService.deleteProduct(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted", product });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
