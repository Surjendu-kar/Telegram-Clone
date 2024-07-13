import React from "react";
import { Box, Typography, Tabs, Tab, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Telegram</Typography>
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
