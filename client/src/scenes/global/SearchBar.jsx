import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { searchItems } from "../../api/search";
import { getItemImageUrl } from "../../utils/itemImageUtils";
import {
  Box,
  TextField,
  IconButton,
  ClickAwayListener,
  Popper,
  Paper,
  MenuItem,
  Slide,
  Avatar,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const SearchBar = ({ searchOpen, handleToggleSearch }) => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to handle search input change and fetch search results
  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setAnchorEl(event.currentTarget);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchItems(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Effect to clear search when search bar is closed
  useEffect(() => {
    if (!searchOpen) {
      setSearchQuery("");
      setSearchResults([]);
      setAnchorEl(null);
    }
  }, [searchOpen]);

  // Function to handle item click and navigate to the item page
  const handleItemClick = (itemId) => {
    history.push(`/item/${itemId}`);
    handleToggleSearch();
  };

  return (
    searchOpen && (
      <ClickAwayListener onClickAway={handleToggleSearch}>
        <Box
          sx={{
            position: "absolute",
            top: "60px",
            left: "0",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 1)",
            zIndex: "10",
            p: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              // InputProps={{ style: { fontSize: "16px" } }}
              sx={{
                "& input": {
                  fontSize: { md: "14px", sm: "16px" },
                },
              }}
            />
            <Box pl="15px">
              <IconButton onClick={handleToggleSearch}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          {anchorEl && (
            <Popper
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              placement="bottom-start"
              transition
              disablePortal
              modifiers={[
                {
                  name: "flip",
                  enabled: false,
                },
                {
                  name: "preventOverflow",
                  options: {
                    boundary: "viewport",
                  },
                },
              ]}
              sx={{
                zIndex: "9",
                maxHeight: "300px",
                overflowY: "auto",
                pt: "18px",
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 1)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              {({ TransitionProps }) => (
                <Slide {...TransitionProps} direction="down" style={{}}>
                  <Paper>
                    {searchResults.length > 0 ? (
                      searchResults.map((item) => (
                        <MenuItem
                          sx={{
                            p: "13px 0 13px 11px",
                          }}
                          key={item.id}
                          onClick={() => handleItemClick(item.id)}
                        >
                          <Avatar
                            src={getItemImageUrl(item)}
                            alt={item.attributes.name}
                            sx={{ mr: "10px" }}
                          />
                          {item.attributes.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled sx={{ p: "20px 0 20px 11px" }}>
                        No results found
                      </MenuItem>
                    )}
                  </Paper>
                </Slide>
              )}
            </Popper>
          )}
        </Box>
      </ClickAwayListener>
    )
  );
};

export default SearchBar;
