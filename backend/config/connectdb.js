import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

const connectionString = process.env.DB_URL;

// Log the DB_URL to verify it's correctly loaded
console.log("DB_URL: ", connectionString);



if (!connectionString) {
    throw new Error("DB_URL is not defined. Please check your .env file.");
}

const sequelize = new Sequelize(connectionString, {
    dialect: "postgres",
    logging: false
});

async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL connected successfully!");
    } catch (error) {
        console.error("Unable to connect with database", error);
        process.exit(1);
    }
}

export { sequelize, connectDatabase };
