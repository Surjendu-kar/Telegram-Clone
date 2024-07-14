import { useEffect, useState } from "react";
import { List, ListItem, Avatar, Box, Typography } from "@mui/material";
import axios from "axios";

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      let allChats = [];
      try {
        // for (let page = 1; page <= 10; page++) {
        const response = await axios.get(
          `https://devapi.beyondchats.com/api/get_all_chats?page=1`
        );
        allChats = allChats.concat(response.data.data.data);
        // }
        // console.log("Fetched Chats:", allChats);

        const groupedChats = allChats.reduce((acc, chat) => {
          const userName = chat.creator.name || "Unknown User";
          if (!acc[userName]) {
            acc[userName] = { user: chat.creator, chats: [] };
          }
          acc[userName].chats.push(chat);
          return acc;
        }, {});
        setChats(Object.values(groupedChats));
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, []);

  const handleSelectChat = (chatGroup) => {
    setSelectedChatId(chatGroup.user.id);
    onSelectChat(chatGroup.chats);
  };

  return (
    <List>
      {chats.map((chatGroup) => (
        <ListItem
          button
          key={chatGroup.user.id}
          onClick={() => handleSelectChat(chatGroup)}
          sx={{
            borderRadius: "10px",
            // mb: 1,
            backgroundColor:
              selectedChatId === chatGroup.user.id ? "primary.main" : "inherit",
            color: selectedChatId === chatGroup.user.id ? "white" : "inherit",
            "&:hover": {
              backgroundColor:
                selectedChatId === chatGroup.user.id
                  ? "primary.dark"
                  : "grey.200",
              color: selectedChatId === chatGroup.user.id ? "white" : "inherit",
            },
          }}
        >
          <Avatar
            sx={{
              backgroundColor:
                selectedChatId === chatGroup.user.id ? "white" : "primary.main",
              color:
                selectedChatId === chatGroup.user.id ? "primary.main" : "white",
            }}
          >
            {chatGroup.user.name ? chatGroup.user.name.charAt(0) : "U"}
          </Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1">
              {chatGroup.user.name || "Unknown User"}
            </Typography>
            <Typography variant="body2">{chatGroup.user.email}</Typography>
            <Typography variant="body2">
              {chatGroup.chats.reduce((acc, chat) => acc + chat.msg_count, 0)}{" "}
              messages
            </Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
