import axios from "axios";
import { API_URL } from "./config";


// Make payment - using for:
// Checkout.jsx
export const makePayment = async (requestBody) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, requestBody, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.data) {
      return response.data;
    } else {
      throw new Error("No data found");
    }
  } catch (error) {
    console.error("Error making payment:", error);
    return null;
  }
};

// // Make payment - using for:
// // Checkout
// export const makePayment = async (requestBody) => {
//   const response = await axios.post(`${API_URL}/orders`, requestBody, {
//     headers: { "Content-Type": "application/json" },
//   });
//   return response.data;
// };
