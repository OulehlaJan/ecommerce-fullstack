import axios from "axios";
import { API_URL } from "./config";

// Fetch sizes - using for:
// Item
export const fetchSizes = async (itemId) => {
  const response = await axios.get(`${API_URL}/items/${itemId}?populate=sizes`);
  return response.data.data.attributes.sizes || [];
};
