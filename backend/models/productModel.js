import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectdb.js";

const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull:true,
    },
    ratings: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    images: {
        type: DataTypes.JSON,
        allowNull:true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull:true,
    },
    seller: {
        type: DataTypes.STRING,
        allowNull:true,
    },
    stock: {
        type: DataTypes.STRING,
        allowNull:true,
    },
});

export default Product;