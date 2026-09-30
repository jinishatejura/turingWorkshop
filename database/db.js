const fs = require("fs/promises");
const path = require("path");

const filepath = path.join(__dirname, "..", "db.json");

// Simulate slow DB read with 1.5s delay
async function readData() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const products = await fs.readFile(filepath, "utf-8");
  return JSON.parse(products);
}

async function writeData(data) {
  await fs.writeFile(filepath, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = { readData, writeData };
