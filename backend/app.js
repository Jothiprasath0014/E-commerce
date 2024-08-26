import express from "express";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url";
import products from './routes/product.js';
import orders from './routes/order.js';
import { connectDatabase, sequelize } from './config/connectdb.js';
import importData from "./data/importData.js";
import cors from "cors";
// import payment from "./routes/payment.js";
// import shipping from "./routes/shipping.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const app = express();
app.use(express.json());
app.use(cors());

connectDatabase();

async function syncDatabase() {
    try {
        await sequelize.sync({alter: true});
        console.log("Database Tables are Synced Now.");

        await importData();
    } catch (error) {
        console.error("Error while Syncing to Database: ", error);
    }
}
syncDatabase();

app.use('/api/v1/', products);
app.use('/api/v1/', orders);
// app.use('/api/v1/', payment);
// app.use('/api/v1', shipping);


app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT} in ${process.env.NODE_ENV}`);
}); 