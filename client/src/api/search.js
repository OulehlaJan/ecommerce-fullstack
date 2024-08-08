import axios from "axios";
import { API_URL } from "./config";

// SearchItems - using for:
// SearchBar.jsx
export const searchItems = async (query) => {
  try {
    const response = await axios.get(
      `${API_URL}/items?filters[name][$containsi]=${encodeURIComponent(
        query
      )}&populate=image`
    );
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("No data found");
    }
  } catch (error) {
    console.error("Error searching items:", error);
    return [];
  }
};
