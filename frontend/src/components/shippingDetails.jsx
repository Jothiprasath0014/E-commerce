// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// function ShippingDetails({ shipment, setShipment }) {
//   const [shippingDetails, setShippingDetails] = useState({
//     address: '',
//     city: '',
//     state: '',
//     postalCode: '',
//     country: '',
//     phoneNumber: '',
//   })

//   const navigate = useNavigate();

//   navigate('/order-confirmation')

// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setShippingDetails({ ...shippingDetails, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // try {
//     //     // Send the form data to the server (you may want to store it in the database)
//     //     await fetch(`${process.env.REACT_APP_API_URL}/order`, {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify(shippingDetails),
//     //     });

//     //     // After a successful submission, navigate to the Order Confirmation page
//     //     navigate('/order-confirmation');
//     // } catch (error) {
//     //     console.error('Error submitting shipping details:', error);
//     // }
// };
// return (
//   <form onSubmit={handleSubmit}>
//       <input type="text" name="name" value={shippingDetails.name} onChange={handleChange} placeholder="Name" />
//       <input type="text" name="address" value={shippingDetails.address} onChange={handleChange} placeholder="Address" />
//       <input type="text" name="city" value={shippingDetails.city} onChange={handleChange} placeholder="City" />
//       <input type="text" name="postalCode" value={shippingDetails.postalCode} onChange={handleChange} placeholder="Postal Code" />
//       <input type="text" name="country" value={shippingDetails.country} onChange={handleChange} placeholder="Country" />
//       <button type="submit">Submit Shipping Details</button>
//   </form>
// );
// }

// export default ShippingDetails;