import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  useTheme,
  styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 
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
import PropTypes from "prop-types";

// Styled components
const StyleAvatar = styled(Avatar)(({ theme }) => ({
  margin: "0 1rem",
  [theme.breakpoints.down("sm")]: {
    margin: "0 0.75rem 0 0.5rem",
  },
}));

const StyledIconButton = styled(IconButton)({
  marginLeft: "0.5rem",

  svg: {
    fill: "#aaaaaa",
  },
});

// Main component
const ChatHeader = ({ chat, onBack }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

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
        // borderBottom: "1px solid #ccc",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgb(29 29 29)"
            : theme.palette.background.paper,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ display: { xl: "none", xs: "block" } }}>
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <StyleAvatar>
        {chat.creator.name ? chat.creator.name.charAt(0) : "D"}
      </StyleAvatar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontSize: "1rem" }}>
          {chat.creator.name ? chat.creator.name : "Deleted User"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          last seen recently
        </Typography>
      </Box>
      <StyledIconButton>
        <SearchIcon />
      </StyledIconButton>
      <StyledIconButton>
        <CallIcon />
      </StyledIconButton>
      <StyledIconButton
        onClick={handleMenuClick}
        sx={{
          borderRadius: "50%",
          padding: "8px",
          backgroundColor: isMenuOpen
            ? theme.palette.action.hover
            : "transparent",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <MoreVertIcon sx={{ color: theme.palette.text.primary }} />
      </StyledIconButton>
      <MenuItems
        anchorEl={anchorEl}
        handleClose={handleMenuClose}
        items={menuItems}
      />
    </Box>
  );
};

ChatHeader.propTypes = {
  chat: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default ChatHeader;
