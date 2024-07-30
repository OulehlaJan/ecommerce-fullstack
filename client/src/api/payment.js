import axios from "axios";
import { API_URL } from "./config";

// Make payment - using for:
// Checkout
export const makePayment = async (requestBody) => {
  const response = await axios.post(`${API_URL}/orders`, requestBody, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
