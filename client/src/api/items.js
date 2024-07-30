import axios from "axios";
import { API_URL } from "./config";

// Fetch single item - using for:
// Navbar
// ItemDetails
export const fetchItem = async (itemId) => {
  const response = await axios.get(`${API_URL}/items/${itemId}?populate=image`);
  return response.data.data;
};

// Fetch items - using for:
// ItemDetails
// ShoppingList
export const fetchItems = async () => {
  const response = await axios.get(`${API_URL}/items?populate=image`);
  return response.data.data;
};

// Fetch items by category - using for:
// ItemsPage
export const fetchItemsByCategory = async (categoryId) => {
  const response = await axios.get(
    `${API_URL}/items?filters[clothingTypeCategory][$eq]=${categoryId}&populate=image`
  );
  return response.data.data;
};
