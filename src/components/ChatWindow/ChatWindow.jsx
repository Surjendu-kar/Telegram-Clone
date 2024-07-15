import { useEffect, useState, useRef } from "react";
import { Box, IconButton, styled, useTheme } from "@mui/material";
import dayjs from "dayjs";
import MessageInput from "./MessageInput";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChatHeader from "./ChatHeader";
import { getChatMessages } from "../../services/api";
import ShowMessage from "./ShowMessage";

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

const InputContainer = styled(Box)({
  position: "relative",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#ffffff",
  // boxShadow: "0px 4px 0px rgba(0, 0, 0, 0.08)",
  width: "60%",
  margin: "0.5rem auto 1rem",
  borderRadius: "10px",
});

const ChatWindow = ({ chats, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messagesContainerRef = useRef(null);
  const theme = useTheme();

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
    const fetchMessages = async () => {
      try {
        let allMessages = [];
        for (let chat of chats) {
          const response = await getChatMessages(chat.id);
          allMessages = allMessages.concat(response.data.data);
        }
        allMessages.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        // console.log("Fetched Messages:", allMessages);

        const groupedMessages = allMessages.reduce((acc, message) => {
          const date = dayjs(message.created_at).format("YYYY-MM-DD");
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(message);
          return acc;
        }, {});
        setMessages(groupedMessages);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (chats) {
      fetchMessages();
    }
  }, [chats]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (message) => {
    // console.log("Send message:", message);
  };

  return (
    <ChatContainer>
      {/* Header */}
      <ChatHeader chat={chats[0]} onBack={onBack} />

      {/* show Messages */}
      <MessagesContainer ref={messagesContainerRef}>
        <ShowMessage messages={messages} loading={loading} />
      </MessagesContainer>

      {!isAtBottom && (
        <ScrollButton onClick={scrollToBottom} theme={theme}>
          <KeyboardArrowDownIcon />
        </ScrollButton>
      )}

      {/* Message Input */}
      {/* <InputContainer> */}
      <MessageInput onSendMessage={handleSendMessage} />
      {/* </InputContainer> */}
    </ChatContainer>
  );
};

export default ChatWindow;
