import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectdb.js";

const Order = sequelize.define('order', {
    cartItems: {
        type: DataTypes.JSONB, 
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    cardDetails: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
    shippingDetails: {
        type: DataTypes.JSONB,
        allowNull: false
    }
});

export default Order;
