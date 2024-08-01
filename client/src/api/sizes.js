import axios from "axios";
import { API_URL } from "./config";

// Fetch sizes - using for:
// Item.jsx
export const fetchSizes = async (itemId) => {
  try {
    const response = await axios.get(
      `${API_URL}/items/${itemId}?populate=sizes`
    );
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("No data found");
    }
  } catch (error) {
    console.error("Error searching item:", error);
    return [];
  }
};
