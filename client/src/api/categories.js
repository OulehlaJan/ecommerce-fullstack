import axios from "axios";
import { API_URL } from "./config";

// Fetch categories - using for:
// Navbar
export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/items?populate=image`);
  const uniqueCategories = [
    ...new Set(
      response.data.data.map((item) => item.attributes.clothingTypeCategory)
    ),
  ];
  return uniqueCategories;
};
