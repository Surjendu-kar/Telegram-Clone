import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { fetchMessages } from "../services/api";

function MessageList({ chatId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      const messageData = await fetchMessages(chatId);
      setMessages(messageData);
    };
    loadMessages();
  }, [chatId]);

  return (
    <Box sx={{ flexGrow: 1, overflow: "auto", padding: 2 }}>
      <List>
        {messages.map((message) => (
          <ListItem key={message.id}>
            <ListItemText
              primary={message.text}
              secondary={new Date(message.timestamp).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default MessageList;
