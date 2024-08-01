import axios from "axios";
import { API_URL } from "./config";

// Fetch single item - using for:
// Navbar.jsx
// ItemDetails.jsx
export const fetchItem = async (itemId) => {
  try {
    const response = await axios.get(
      `${API_URL}/items/${itemId}?populate=image`
    );
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("No data found");
    }
  } catch (error) {
    console.error("Error fetching item:", error);
    return [];
  }
};

// Fetch items - using for:
// ItemDetails.jsx
// ShoppingList.jsx
export const fetchItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/items?populate=image`);
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("No data found");
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

// Fetch items by category - using for:
// ItemsPage.jsx
export const fetchItemsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(
      `${API_URL}/items?filters[clothingTypeCategory][$eq]=${categoryId}&populate=image`
    );
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("No data found");
    }
  } catch (error) {
    console.error("Error fetching items by category:", error);
    return [];
  }
};

// // Fetch single item - using for:
// // Navbar
// // ItemDetails
// export const fetchItem = async (itemId) => {
//   const response = await axios.get(`${API_URL}/items/${itemId}?populate=image`);
//   return response.data.data;
// };

// // Fetch items - using for:
// // ItemDetails
// // ShoppingList
// export const fetchItems = async () => {
//   const response = await axios.get(`${API_URL}/items?populate=image`);
//   return response.data.data;
// };

// // Fetch items by category - using for:
// // ItemsPage
// export const fetchItemsByCategory = async (categoryId) => {
//   const response = await axios.get(
//     `${API_URL}/items?filters[clothingTypeCategory][$eq]=${categoryId}&populate=image`
//   );
//   return response.data.data;
// };
