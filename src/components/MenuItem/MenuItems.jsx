import React from "react";
import { Menu, MenuItem, Switch, Box, Typography, styled } from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  transition: 'background-color 0.3s, color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? theme.palette.action.hover 
      : theme.palette.grey[100],
  },
}));

const MenuItems = ({ anchorEl, handleClose, items, currentTheme }) => {
  const { toggleTheme, theme } = useThemeContext();

  const handleItemClick = (item) => {
    if (item.onClick) item.onClick();
    handleClose();
  };

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
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : "rgba(255, 255, 255, 0.8)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: "20px",
        },
      }}
    >
      {items?.map((item, index) => (
        <StyledMenuItem
          key={index}
          onClick={() => handleItemClick(item)}
          sx={{ color: item.color || "inherit" }}
        >
          {item.icon && React.cloneElement(item.icon, { sx: { mr: 2 } })}
          {item.text}
          {item.hasSwitch && (
            <Switch
              checked={
                item.text === "Night Mode"
                  ? currentTheme === "dark"
                  : item.switchState
              }
              sx={{ ml: "auto" }}
            />
          )}
        </StyledMenuItem>
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