import React from "react";
import {
  List,
  ListItem,
  Avatar,
  Box,
  Typography,
} from "@mui/material";

const ChatList = ({ onSelectChat }) => {
  const handleSelectChat = (chatId) => {
    onSelectChat(chatId);
  };

  return (
    <List>
      <ListItem button onClick={() => handleSelectChat(1)}>
        <Avatar>U</Avatar>
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle1">User Name</Typography>
          <Typography variant="body2">user@example.com</Typography>
          <Typography variant="body2">0 messages</Typography>
        </Box>
      </ListItem>
      <ListItem button onClick={() => handleSelectChat(2)}>
        <Avatar>U</Avatar>
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle1">Another User</Typography>
          <Typography variant="body2">anotheruser@example.com</Typography>
          <Typography variant="body2">5 messages</Typography>
        </Box>
      </ListItem>
    </List>
  );
};

export default ChatList;
