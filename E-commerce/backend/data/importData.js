import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/productModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'products.json');

async function importData() {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const products = JSON.parse(data);

        for(let product of products) {
            const existingProduct = await Product.findOne({where: { name: product.name } });

            if(!existingProduct) {
                await Product.create(product);
                console.log(`Product ${product.name} imported successfully!`);
            } else {
                console.log(`Product ${product.name} already exists!`);
                
            }
        }
    } catch (error) {
        console.error("! Error during importing data :", error);
        throw error;
    }
}

export default importData;