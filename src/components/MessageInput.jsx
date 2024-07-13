import { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { AttachFile, Send, Mic, EmojiEmotions } from "@mui/icons-material";

const MessageInput = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    onSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "0.5rem 0",
        borderTop: "1px solid #ccc",
        width: "100%",
      }}
    >
      <IconButton>
        <EmojiEmotions />
      </IconButton>
      <TextField
        fullWidth
        placeholder="Message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        sx={{ mx: 1 }}
      />
      <IconButton>
        <AttachFile />
      </IconButton>
      <IconButton onClick={handleSendMessage}>
        <Send />
      </IconButton>
      <IconButton>
        <Mic />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
