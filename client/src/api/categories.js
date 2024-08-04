import axios from "axios";
import { API_URL } from "./config";

// Fetch categories - using for:
// Navbar.jsx
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/items?populate=image`);
    if (response.data && response.data.data) {
      const uniqueCategories = [
        ...new Set(
          response.data.data.map((item) => item.attributes.clothingTypeCategory)
        ),
      ];
      return uniqueCategories;
    } else {
      throw new Error("No data found");
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
