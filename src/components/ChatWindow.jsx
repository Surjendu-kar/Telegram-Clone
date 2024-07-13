import React from "react";
import { Box, Typography } from "@mui/material";

const ChatWindow = ({ chatId }) => {
  return (
    <Box>
      <Typography variant="body1">
        Chat Messages for Chat ID: {chatId}
      </Typography>
    </Box>
  );
};

export default ChatWindow;
