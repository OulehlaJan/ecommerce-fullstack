import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchItemsByCategory } from "../../api/items";
import { Box, Typography, CircularProgress } from "@mui/material";
import Item from "../../components/Item";

const ItemsPage = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch items
  const getItems = async (categoryId) => {
    try {
      const fetchedItems = await fetchItemsByCategory(categoryId);
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems(categoryId);
  }, [categoryId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box width="100%" m="80px auto">
      <Typography variant="h2" textAlign="center" p="30px 0 40px 0">
        {categoryId.toUpperCase()}
      </Typography>
      <Box p="0 30px 0 30px">
        <Box
          m="0 auto"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          width="80%"
          maxWidth="1600px"
          rowGap="30px"
          columnGap="2.33%"
          sx={{
            "& > div": {
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-10px)",
                zIndex: "2",
                opacity: "90%",
              },
            },
          }}
        >
          {items.map((item) => (
            <Box key={item.id} display="flex" justifyContent="center">
              <Item item={item} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemsPage;
