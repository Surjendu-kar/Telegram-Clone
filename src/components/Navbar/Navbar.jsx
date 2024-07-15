import { useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
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
import { useThemeContext } from "../../context/ThemeContext";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import CallIcon from "@mui/icons-material/Call";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import HelpIcon from "@mui/icons-material/Help";
import AnchorTemporaryDrawer from "../MenuItem/AnchorTemporaryDrawer";
import { CONSTANT } from "../../constant";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleTheme, theme } = useThemeContext();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const searchVal = searchParams.get(CONSTANT.SEARCH) ?? "";

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (val) => {
    if (!val) {
      searchParams.delete(CONSTANT.SEARCH);
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(CONSTANT.SEARCH, val);
    setSearchParams(searchParams);
  };

  const isMenuOpen = Boolean(anchorEl);

  const menuItems = [
    { text: "Saved Messages", icon: <SaveIcon /> },
    { text: "Contacts", icon: <ContactsIcon /> },
    { text: "My Stories", icon: <StoryIcon /> },
    { text: "Settings", icon: <SettingsIcon /> },
    {
      text: "Night Mode",
      icon: <NightlightIcon />,
      hasSwitch: true,
      switchState: theme.palette.mode === "dark",
      onClick: toggleTheme,
    },
    { text: "Animations", icon: <AnimationIcon />, hasSwitch: true },
    { text: "Telegram Features", icon: <TelegramIcon /> },
    { text: "Report a Bug", icon: <BugReportIcon /> },
    { text: "Switch to K Version", icon: <NewReleasesIcon /> },
    { text: "Install App", icon: <InstallMobileIcon /> },
  ];

  const menuItemsformobile = [
    { text: "My Profile", icon: <PersonIcon /> },
    { text: "New Group", icon: <GroupIcon /> },
    { text: "Contacts", icon: <ContactsIcon /> },
    { text: "Calls", icon: <CallIcon /> },
    { text: "People Nearby", icon: <PeopleIcon /> },
    { text: "Saved Messages", icon: <SaveIcon /> },
    { text: "Settings", icon: <SettingsIcon /> },
    { text: "Invite Friends", icon: <AddIcon /> },
    { text: "Telegram Features", icon: <HelpIcon /> },
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
          value={searchVal}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "grey.400" }} />
              </InputAdornment>
            ),
            sx: {
              backgroundColor:
                theme.palette.mode === "dark" ? "rgb(46, 47, 47)" : "#f5f5f5",
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
      {isMobile ? (
        <AnchorTemporaryDrawer
          open={isMenuOpen}
          onClose={handleMenuClose}
          items={menuItemsformobile}
        />
      ) : (
        <MenuItems
          anchorEl={anchorEl}
          handleClose={handleMenuClose}
          items={menuItems}
          currentTheme={theme.palette.mode}
        />
      )}
    </Box>
  );
};

export default Navbar;
