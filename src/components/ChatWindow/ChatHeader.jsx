import React, { useState } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import ReportIcon from "@mui/icons-material/Report";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItems from "../MenuItem/MenuItems";

const ChatHeader = ({ chat }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  const menuItems = [
    { text: "Add to contacts", icon: <PersonAddAlt1Icon /> },
    { text: "Video Call", icon: <VideoCallIcon /> },
    { text: "Mute...", icon: <NotificationsOffIcon /> },
    { text: "Select messages", icon: <SelectAllIcon /> },
    { text: "Report", icon: <ReportIcon /> },
    { text: "Gift Premium", icon: <CardGiftcardIcon /> },
    { text: "Block user", icon: <BlockIcon /> },
    { text: "Delete chat", icon: <DeleteIcon />, color: "error.main" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        borderBottom: "1px solid #ccc",
        backgroundColor: "#fff",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Avatar sx={{ margin: "0 1rem" }}>{chat.creator.name.charAt(0)}</Avatar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontSize: "1rem" }}>{chat.creator.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          last seen recently
        </Typography>
      </Box>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <IconButton>
        <CallIcon />
      </IconButton>
      <IconButton
        onClick={handleMenuClick}
        sx={{
          borderRadius: "50%",
          padding: "8px",
          backgroundColor: isMenuOpen ? "#f5f5f5" : "transparent",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <MoreVertIcon sx={{ color: "grey" }} />
      </IconButton>
      <MenuItems
        anchorEl={anchorEl}
        handleClose={handleMenuClose}
        items={menuItems}
      />
    </Box>
  );
};

export default ChatHeader;
