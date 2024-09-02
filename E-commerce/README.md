# E-commerce Website Documentation

#### Live Demo 🌐 => [JP-Ecommerce](https://ajp-ecommerce.netlify.app/)

## Project Overview

This documentation covers the structure, setup, and key functionalities of an e-commerce prototype built using ```React``` for the frontend, ```Node.js and Express.js``` for the backend, and ```PostgreSQL``` for the database. The project simulates the process of browsing products, managing a shopping cart, processing payments (prototype), and confirming orders.

## 1. Project Structure

### Frontend (React)
#### Components

* **Home.jsx:** Displays the list of products and categories.
* **ProductDetail.jsx:** Shows detailed information about a selected product.
*  **Cart.jsx:** Manages the items added to the shopping cart.
*  **Payment.jsx:** Allows users to select and process their preferred payment method.
*  **ConfirmationPage.jsx:** Displays order confirmation details after the payment process.

#### Routes

* **/**: Home page.
* **/product/:id**: Product details page.
* **/cart**: Cart overview..
* **/payment**: Payment method selection.
* **/confirmation**: Order confirmation page.

#### State Management

* **Context API:** Used to manage global state such as cart items and user information.

#### Notification System

* **React Toast:** Used for displaying user notifications (e.g., Item Added to cart, order confirmation).

### Backend (Node.js & Express.js) 

* **Server:** Express server running on ```http://localhost```
* **API Routes:** 
    * **/payments**: Handles payment processing.
    * **/payments:id** Used to get the specific Item.

### Database (PostgreSQL)

* **Database Tables** 
    * - **Product Table** : Which contains the Items of products.
    * - **Order Table** : Stores all order-related information including cart items, shipping details, payment method, and order status.

## 2.  Key Functionalities

#### 1. Product Browsing

Users can view a list of products on the home page and click on any product to view detailed information.

#### 2. Shopping Cart Management

Users can add products to their cart, view the cart, and adjust quantities before proceeding to checkout

#### 3. Payment Processing

Users can select from multiple payment methods (credit card, debit card, UPI, or Cash on Delivery).

#### 4. Order Confirmation

Upon successful payment, the order details are stored in the database, and the user is directed to the confirmation page.
A toast notification confirms the order placement.

## 3. Testing 

* **API Testing:** Used Postman and Thunder Client to test backend APIs.

## 4. Future Enhancements

* **Payment Gateway Integration:** Integrate with real payment gateways like Stripe or PayPal.

* **User Authentication:** Add user authentication and authorization for a personalized shopping experience.

* **Product Search and Filter:** Implement search and filtering capabilities for better product browsing.


## 5. ScreenShots 

* **Home Page :**

![Auroracart Home page.](/readme-image/home-page.png "This is a home-page image.")


* **Search-Functionallity :**

![search Functionality.](/readme-image/search-functionallity.png "This is a home-page search function image.")

* **Product Description :**

![Product Description](/readme-image/product-description.png "This is a product description image.")

* **Cart Items :** 

![Cart Items.](/readme-image/cartitems.png "This is a cart Items image.")

* **Payment Gateway :** 

![Payment Gateway.](/readme-image/payment-gateway.png "This is a payment gateway image.")

* **Order Confirmation :**

![order confirmation.](/readme-image/order-confirmation.png "This is a order coonfirmation image.")


* **Order Database :**

![order Database.](/readme-image/order-database.png "This is a order database image.")


* **Product Database :** 

![Aurora Home page.](/readme-image/product-database.png "This is a product database image.")


## License 

This project is licensed under the MIT License - see the [MIT](https://choosealicense.com/licenses/mit/) License file for details.
