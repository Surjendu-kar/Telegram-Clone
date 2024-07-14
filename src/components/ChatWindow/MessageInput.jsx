import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  styled,
} from "@mui/material";
import { AttachFile, Send, Mic, EmojiEmotions } from "@mui/icons-material";

const InputBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "0.5rem",
  borderTop: "1px solid #ccc",
  width: "100%",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.09)",
  margin: "0 auto",
  height: "35px",
});

const StyledTextField = styled(TextField)({
  flexGrow: 1,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  "& .MuiInputBase-input": {
    padding: "10px 14px",
  },
});

const HoverIconButton = styled(IconButton)(({ theme }) => ({
  transition: "background-color 0.3s, color 0.3s",
  "&:hover": {
    backgroundColor: "#0084ff",
    color: "#ffffff",
  },
}));

const MessageInput = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <Box display={"flex"}>
      <InputBox>
        <HoverIconButton sx={{ color: "#808080" }}>
          <EmojiEmotions />
        </HoverIconButton>
        <StyledTextField
          fullWidth
          placeholder="Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <HoverIconButton sx={{ color: "#808080" }}>
                  <AttachFile />
                </HoverIconButton>
              </InputAdornment>
            ),
          }}
        />
      </InputBox>
      <HoverIconButton
        onClick={handleSendMessage}
        sx={{
          backgroundColor: newMessage.trim() ? "#0084ff" : "#f0f0f0",
          color: newMessage.trim() ? "#fff" : "#808080",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          marginLeft: "8px",
          "&:hover": {
            backgroundColor: newMessage.trim() ? "#0073e6" : "#0084ff",
            color: "#ffffff",
          },
        }}
      >
        {newMessage.trim() ? <Send /> : <Mic />}
      </HoverIconButton>
    </Box>
  );
};

export default MessageInput;
