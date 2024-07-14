import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Typography, Avatar, Paper, IconButton } from "@mui/material";
import dayjs from "dayjs";
import MessageInput from "./MessageInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ChatWindow = ({ chats, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        let allMessages = [];
        for (let chat of chats) {
          const response = await axios.get(
            `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chat.id}`
          );
          allMessages = allMessages.concat(response.data.data);
        }
        allMessages.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        console.log("Fetched Messages:", allMessages);

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
    console.log("Send message:", message);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          borderBottom: "1px solid #ccc",
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          {chats[0]?.creator.name || "Unknown"}
        </Typography>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* Messages */}
      <Box
        ref={messagesContainerRef}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          pb: "70px",
        }}
      >
        {loading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : Object.keys(messages).length > 0 ? (
          Object.keys(messages)
            .sort((a, b) => new Date(a) - new Date(b))
            .map((date) => (
              <React.Fragment key={date}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    m: "1rem 0",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      backgroundColor: "grey.200",
                      padding: "0.5rem 1rem",
                      borderRadius: "7px",
                      display: "inline-block",
                    }}
                  >
                    {date}
                  </Typography>
                </Box>
                {messages[date].map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: "flex",
                      mb: 2,
                      width: "100%",
                      justifyContent:
                        message.sender.name === "BeyondChat"
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        maxWidth: "75%",
                        alignItems: "flex-start",
                      }}
                    >
                      <Avatar sx={{ mr: 2 }}>
                        {message.sender.name
                          ? message.sender.name.charAt(0)
                          : "U"}
                      </Avatar>
                      <Paper
                        sx={{
                          p: 2,
                          backgroundColor: "#e0f7fa",
                          borderRadius: "8px",
                          wordBreak: "break-word",
                        }}
                      >
                        <Typography variant="body1">
                          {message.message}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 1,
                            gap: 2,
                          }}
                        >
                          <Typography variant="caption">
                            {message.sender.name}
                          </Typography>
                          <Typography variant="caption">
                            {dayjs(message.created_at).format("hh:mm a")}
                          </Typography>
                        </Box>
                      </Paper>
                    </Box>
                  </Box>
                ))}
              </React.Fragment>
            ))
        ) : (
          <Typography variant="body1">No messages</Typography>
        )}
      </Box>

      {/* Message Input */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "background.paper",
          boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <MessageInput onSendMessage={handleSendMessage} />
      </Box>
    </Box>
  );
};

export default ChatWindow;
