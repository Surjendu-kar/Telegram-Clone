import { useEffect, useState, useRef } from "react";
import { Box, IconButton, styled, useTheme } from "@mui/material";
import dayjs from "dayjs";
import MessageInput from "./MessageInput";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChatHeader from "./ChatHeader";
import ShowMessage from "./ShowMessage";
import PropTypes from "prop-types";

const ChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  position: "relative",
  [theme.breakpoints.down("sm")]: {},
}));

const MessagesContainer = styled(Box)({
  flexGrow: 1,
  overflowY: "auto",
  // paddingBottom: "70px",
});

const ScrollButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  bottom: "80px",
  right: "140px",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.background.paper,
  boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[700]
        : theme.palette.background.paper,
  },
  color:
    theme.palette.mode === "dark"
      ? theme.palette.common.white
      : theme.palette.text.primary,
  height: "50px",
  width: "50px",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {
    bottom: "80px",
    right: "20px",
  },
}));

const ChatWindow = ({ selectedChat, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messagesContainerRef = useRef(null);
  const theme = useTheme();
  const chats = selectedChat.chats;
  const localMessages = selectedChat.messages;

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const checkIfAtBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsAtBottom(isBottom);
    }
  };
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkIfAtBottom);
      return () => container.removeEventListener("scroll", checkIfAtBottom);
    }
  }, []);

  useEffect(() => {
    try {
      localMessages.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      const groupedMessages = localMessages.reduce((acc, message) => {
        const date = dayjs(message.created_at).format("YYYY-MM-DD");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(message);
        return acc;
      }, {});
      setMessages(groupedMessages);
    } catch (error) {
      console.error(error);
    }
  }, [localMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (message) => {
    console.log(messages)

    // setMessages((prevMessages) => {
    //   const date = dayjs().format("YYYY-MM-DD");
    //   const newMessage = {
    //     id: Math.random(),
    //     message,
    //     created_at: new Date().toISOString(),
    //     user: {
    //       id: "user",
    //       name: "You",
    //       profile_image: "",
    //     },
    //   };
    //   const newMessages = { ...prevMessages };
    //   if (!newMessages[date]) {
    //     newMessages[date] = [];
    //   }
    //   newMessages[date].push(newMessage);
    //   return newMessages;
    // });
  };

  return (
    <ChatContainer>
      {/* Header */}
      <ChatHeader chat={chats[0]} onBack={onBack} />

      {/* show Messages */}
      <MessagesContainer ref={messagesContainerRef}>
        <ShowMessage messages={messages}  />
      </MessagesContainer>

      {!isAtBottom && (
        <ScrollButton onClick={scrollToBottom} theme={theme}>
          <KeyboardArrowDownIcon />
        </ScrollButton>
      )}

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </ChatContainer>
  );
};

ChatWindow.propTypes = {
  selectedChat: PropTypes.array.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default ChatWindow;
