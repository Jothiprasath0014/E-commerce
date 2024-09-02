import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { sequelize } from "../config/connectdb.js";

async function createOrder(req, res, next) {
  const transaction = await sequelize.transaction();

  try {
    const { cartItems, paymentMethod, cardDetails, shippingDetails } = req.body;

    if (!req.body.cartItems || req.body.cartItems.length === 0) {
      return res.status(400).json({ error: "Invalid or empty cartItems" });
    }
    console.log("Received order data:", req.body);
    console.log("Cart Items:", cartItems); // Add this line

    // Validate cartItems
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error("Invalid or empty cartItems");
    }

    for (const item of cartItems) {
      if (!item.product || !item.qty || item.qty <= 0) {
        return res.status(400).json({ error: "Invalid cart item" });
      }
    }

    const amount = Number(
      cartItems.reduce((acc, item) => {
        if (!item.product || !item.product.price || !item.qty) {
          throw new Error("Invalid cart item data");
        }
        return acc + item.product.price * item.qty;
      }, 0)
    ).toFixed(2);

    const status = paymentMethod === "cashOnDelivery" ? "pending" : "paid";

    const orderDetails = {
      cartItems,
      paymentMethod,
      amount,
      status,
      cardDetails,
      shippingDetails,
    };

    // Create and save the order
    const order = await Order.create(orderDetails, { transaction });

    // Update product stocks
    await updateProductStock(cartItems, transaction);

    await transaction.commit();

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

async function updateProductStock(cartItems, transaction) {
  try {
    await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findByPk(item.product.id, {
          transaction,
        });

        if (!product) {
          throw new Error(`Product with ID ${item.product.id} not found!`);
        }

        if (product.stock < item.qty) {
          throw new Error(
            `Insufficient stock for product ID ${item.product.id}`
          );
        }

        product.stock -= item.qty;
        await product.save({ transaction });
      })
    );
  } catch (error) {
    console.error("Error updating product stocks:", error);
    throw error;
  }
}

export default createOrder;
