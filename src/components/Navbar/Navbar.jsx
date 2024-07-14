import React, { useState } from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MenuItems from "../MenuItem/MenuItems";
import SaveIcon from "@mui/icons-material/Save";
import ContactsIcon from "@mui/icons-material/Contacts";
import StoryIcon from "@mui/icons-material/ImportContacts";
import SettingsIcon from "@mui/icons-material/Settings";
import NightlightIcon from "@mui/icons-material/Nightlight";
import AnimationIcon from "@mui/icons-material/Animation";
import BugReportIcon from "@mui/icons-material/BugReport";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import TelegramIcon from "@mui/icons-material/Telegram";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  const menuItems = [
    { text: "Saved Messages", icon: <SaveIcon /> },
    { text: "Contacts", icon: <ContactsIcon /> },
    { text: "My Stories", icon: <StoryIcon /> },
    { text: "Settings", icon: <SettingsIcon /> },
    { text: "Night Mode", icon: <NightlightIcon />, hasSwitch: true },
    { text: "Animations", icon: <AnimationIcon />, hasSwitch: true },
    { text: "Telegram Features", icon: <TelegramIcon /> },
    { text: "Report a Bug", icon: <BugReportIcon /> },
    { text: "Switch to K Version", icon: <NewReleasesIcon /> },
    { text: "Install App", icon: <InstallMobileIcon /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: "0.45rem",
        borderRadius: "20px",
      }}
    >
      <IconButton
        onClick={handleMenuClick}
        sx={{
          borderRadius: "50%",
          padding: "8px",
          mr: 2,
          ml: 1,
          backgroundColor: isMenuOpen ? "#f5f5f5" : "transparent",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <MenuIcon sx={{ color: "grey" }} />
      </IconButton>
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "grey.400" }} />
              </InputAdornment>
            ),
            sx: {
              backgroundColor: "#f5f5f5",
              borderRadius: "20px",
              height: "45px",
              border: "none",
              "& fieldset": { border: "none" },
            },
          }}
          sx={{
            width: "100%",
          }}
        />
      </Box>
      <MenuItems
        anchorEl={anchorEl}
        handleClose={handleMenuClose}
        items={menuItems}
      />
    </Box>
  );
};

export default Navbar;
