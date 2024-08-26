// import Order from "../models/orderModel.js";

// // Payment Details
// export async function handlePayment(req, res) {
//     try {
//         const { paymentMethod, cardDetails, orderId } = req.body;

//         // Validate orderId
//         if (!orderId) {
//             return res.status(400).json({ success: false, error: 'Order ID is required' });
//         }

//         // Find the order
//         const order = await Order.findByPk(orderId);
//         if (!order) {
//             return res.status(404).json({ success: false, error: 'Order not found' });
//         }

//         if (paymentMethod === 'creditCard' || paymentMethod === 'debitCard') {
//             const { cardNumber, cardExpiry, cardCVV, cardName } = cardDetails || {};

//             if (!cardNumber || !cardExpiry || !cardCVV || !cardName) {
//                 return res.status(400).json({ success: false, error: 'All card details are required' });
//             }
//             if (cardNumber.length !== 16 || isNaN(cardNumber)) {
//                 return res.status(400).json({ success: false, error: 'Invalid card number' });
//             }
//             if (cardCVV.length !== 3 || isNaN(cardCVV)) {
//                 return res.status(400).json({ success: false, error: 'Invalid CVV' });
//             }
//             if (!validateExpiryDate(cardExpiry)) {
//                 return res.status(400).json({ success: false, error: 'Invalid or expired card expiry date' });
//             }

//             // Update order with payment details
//             order.paymentMethod = paymentMethod;
//             order.cardDetails = { cardNumber, cardExpiry, cardCVV, cardName };

//             await order.save();

//             res.json({
//                 success: true,
//                 message: 'Payment method and card details are stored successfully',
//                 orderId: order.id,
//             });

//         } else if (paymentMethod === 'upi' || paymentMethod === 'cashOnDelivery') {
//             // Update order with the payment method (no card details needed)
//             order.paymentMethod = paymentMethod;

//             await order.save();

//             res.json({
//                 success: true,
//                 message: 'Payment method stored successfully',
//                 orderId: order.id,
//             });

//         } else {
//             return res.status(400).json({ success: false, error: 'Invalid payment method' });
//         }

//     } catch (error) {
//         console.error('Error handling payment:', error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// }

// // Shipping Details
// export async function handleShipping(req, res) {
//     try {
//         const { shippingDetails, orderId } = req.body;

//         // Validate orderId
//         if (!orderId) {
//             return res.status(400).json({ success: false, error: 'Order ID is required' });
//         }

//         // Find the order
//         const order = await Order.findByPk(orderId);
//         if (!order) {
//             return res.status(404).json({ success: false, error: 'Order not found' });
//         }

//         const { address, city, state, postalCode, country, phoneNumber } = shippingDetails || {};

//         if (!address || !city || !state || !postalCode || !country || !phoneNumber) {
//             return res.status(400).json({ success: false, error: 'All shipping details are required' });
//         }

//         if (postalCode.length < 5 || isNaN(postalCode)) {
//             return res.status(400).json({ success: false, error: 'Invalid postal code' });
//         }
//         if (phoneNumber.length < 10 || isNaN(phoneNumber)) {
//             return res.status(400).json({ success: false, error: 'Invalid phone number' });
//         }

//         // Update order with shipping details
//         order.shippingDetails = { address, city, state, postalCode, country, phoneNumber };

//         await order.save();

//         res.json({
//             success: true,
//             message: 'Shipping details are stored successfully',
//             orderId: order.id,
//         });

//     } catch (error) {
//         console.error('Error handling shipping:', error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// }

// // Utility function to validate expiry date
// function validateExpiryDate(expiryDate) {
//     const parts = expiryDate.split("/");

//     if (parts.length !== 2 ) {
//         return false;
//     }

//     const month = parseInt(parts[0], 10);
//     const year = parseInt(parts[1], 10);

//     if (isNaN(month) || month < 1 || month > 12) {
//         return false;
//     }

//     const currentYear = new Date().getFullYear() % 100;
//     const currentMonth = new Date().getMonth() + 1;

//     if (year < currentYear || (year === currentYear && month < currentMonth)) {
//         return false;
//     }

//     return true;
// }
