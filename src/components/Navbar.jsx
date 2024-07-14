import React from "react";
import { Box, Typography, Tabs, Tab, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 1,
        borderBottom: "1px solid #ccc",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          Telegram
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Box>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="All" />
        <Tab label="Regulars" />
        <Tab label="Unread" />
      </Tabs>
    </Box>
  );
};

export default Navbar;
