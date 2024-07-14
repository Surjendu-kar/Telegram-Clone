import { useState } from "react";
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
  borderRadius: "30px",
  boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.05)",
  margin: "0 auto",
  height: "45px",
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    backgroundColor: "#f0f0f0",
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

const MessageInput = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    onSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <InputBox>
      <IconButton sx={{ color: "#808080" }}>
        <EmojiEmotions />
      </IconButton>
      <StyledTextField
        fullWidth
        placeholder="Message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton sx={{ color: "#808080" }}>
                <AttachFile />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <IconButton
        onClick={handleSendMessage}
        sx={{
          backgroundColor: "#0084ff",
          color: "white",
          borderRadius: "50%",
          marginLeft: "8px",
        }}
      >
        <Send />
      </IconButton>
      <IconButton sx={{ color: "#808080", marginLeft: "8px" }}>
        <Mic />
      </IconButton>
    </InputBox>
  );
};

export default MessageInput;
