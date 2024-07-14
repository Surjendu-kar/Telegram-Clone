import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  styled,
  useTheme,
} from "@mui/material";
import { AttachFile, Send, Mic, EmojiEmotions } from "@mui/icons-material";

const InputBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "0.75rem",
  borderTop: "1px solid #ccc",
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "10px",
  boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.09)",
  height: "50px",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
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
    padding: "15px 14px",
  },
}));

const HoverIconButton = styled(IconButton)(({ theme }) => ({
  transition: "background-color 0.3s, color 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const MessageInput = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const theme = useTheme();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <Box
      display={"flex"}
      width={"60%"}
      margin={"0 auto"}
      sx={{ display: "flex", alignItems: "center", mb: "1rem" }}
    >
      <InputBox theme={theme}>
        <HoverIconButton sx={{ color: theme.palette.text.secondary }}>
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
                <HoverIconButton sx={{ color: theme.palette.text.secondary }}>
                  <AttachFile />
                </HoverIconButton>
              </InputAdornment>
            ),
          }}
          theme={theme}
        />
      </InputBox>
      <HoverIconButton
        onClick={handleSendMessage}
        sx={{
          backgroundColor: newMessage.trim()
            ? theme.palette.primary.main
            : theme.palette.action.hover,
          color: newMessage.trim()
            ? theme.palette.primary.contrastText
            : theme.palette.text.secondary,
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          marginLeft: "8px",
          "&:hover": {
            backgroundColor: newMessage.trim()
              ? theme.palette.primary.dark
              : theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
        }}
      >
        {newMessage.trim() ? <Send /> : <Mic />}
      </HoverIconButton>
    </Box>
  );
};

export default MessageInput;
