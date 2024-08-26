import Order from "../models/orderModel.js";
import Product from "../models/productModel.js"; // Default import for Product
import { sequelize } from "../config/connectdb.js"; // Import sequelize

// Create Order API => /api/v1/order
async function createOrder(req, res, next) {
    try {
        const cartItems = req.body;
        const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2);
        const status = 'pending';

        const order = await Order.create({ cartItems, amount, status });

        // Update product stocks
        await updateProductStock(cartItems);

        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}

async function updateProductStock(cartItems) {
    const transaction = await sequelize.transaction();

    try {
        await Promise.all(cartItems.map(async (item) => {
            const product = await Product.findByPk(item.product.id, { transaction });

            if (product) {
                if (product.stock >= item.qty) {
                    product.stock -= item.qty;
                    await product.save({ transaction });
                } else {
                    throw new Error(`Insufficient stock for product ID ${item.product.id}`);
                }
            } else {
                throw new Error(`Product with ID ${item.product.id} not found`);
            }
        }));

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        console.error('Error updating product stocks:', error);
        throw error;
    }
}

export default createOrder;
