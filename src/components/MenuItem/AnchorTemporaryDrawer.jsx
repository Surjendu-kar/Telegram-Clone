import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  Avatar,
  Typography,
  IconButton,
  Collapse,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import { useThemeContext } from "../../context/ThemeContext";

const AnchorTemporaryDrawer = ({ open, onClose, items }) => {
  const { theme, toggleTheme } = useThemeContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleItemClick = (item) => {
    if (item.onClick) item.onClick();
    onClose();
  };

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
    >
      <Box sx={{ position: "relative", p: 2 }}>
        <IconButton
          onClick={toggleTheme}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <Brightness4Icon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Avatar>B</Avatar>
          <Box mt={"1rem"} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1">BeyondChat</Typography>
            <IconButton onClick={handleDropdownClick}>
              {dropdownOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Typography variant="body2" color="textSecondary">
            contact@beyondchat.com
          </Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar>B</Avatar>
              </ListItemIcon>
              <ListItemText primary="BeyondChat"sx={{ paddingLeft: "7px" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ paddingLeft: "7px" }}>
            <ListItemButton>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Account" />
            </ListItemButton>
          </ListItem>
        </Collapse>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ paddingLeft: "7px" }}>
            <ListItemButton onClick={() => handleItemClick(item)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.hasSwitch && (
                <Switch
                  checked={
                    item.text === "Night Mode"
                      ? theme.palette.mode === "dark"
                      : item.switchState
                  }
                  sx={{ ml: "auto" }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Drawer anchor={"left"} open={open} onClose={onClose}>
      {list("left")}
    </Drawer>
  );
};

export default AnchorTemporaryDrawer;
