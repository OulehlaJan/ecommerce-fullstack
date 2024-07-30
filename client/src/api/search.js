import axios from "axios";
import { API_URL } from "./config";

// SearchItems - using for:
// SearchBar
export const searchItems = async (query) => {
  const response = await axios.get(
    `${API_URL}/items?filters[$or][0][clothingTypeCategory][$containsi]=${encodeURIComponent(
      query
    )}&filters[$or][1][name][$containsi]=${encodeURIComponent(
      query
    )}&populate=image`
  );
  return response.data.data;
};
