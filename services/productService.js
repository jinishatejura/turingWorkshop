const { readData, writeData } = require("../database/db");

async function getAllProducts() {
  return await readData();
}

async function getProductById(id) {
  const products = await readData();
  const product = products.find((p) => p.id === id);
  return product || null;
}

async function createProduct(product) {
  const products = await readData();
  const newId =
    products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = { id: newId, ...product };
  products.push(newProduct);
  await writeData(products);
  return newProduct;
}

async function updateProduct(id, updates) {
  const products = await readData();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates, id };
  await writeData(products);
  return products[index];
}

async function deleteProduct(id) {
  const products = await readData();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const [deleted] = products.splice(index, 1);
  await writeData(products);
  return deleted;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
