import React from "react";
import { Menu, MenuItem, Switch, Box, Typography } from "@mui/material";

const MenuItems = ({ anchorEl, handleClose, items }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      sx={{
        mt: 1,
        "& .MuiPaper-root": {
          width: "280px",
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: "20px",
        },
      }}
    >
      {items?.map((item, index) => (
        <MenuItem
          key={index}
          onClick={handleClose}
          sx={{ color: item.color || "inherit" }}
        >
          {item.icon && React.cloneElement(item.icon, { sx: { mr: 2 } })}
          {item.text}
          {item.hasSwitch && <Switch sx={{ ml: "auto" }} />}
        </MenuItem>
      ))}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="body2" color="textSecondary" textAlign={"center"}>
          Telegram Web A 10.9.7
        </Typography>
      </Box>
    </Menu>
  );
};

export default MenuItems;
