import { useEffect, useState } from "react";
import { List, ListItem, Avatar, Box, Typography } from "@mui/material";
import axios from "axios";

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);

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

  return (
    <List>
      {chats.map((chatGroup) => (
        <ListItem
          button
          key={chatGroup.user.id}
          onClick={() => onSelectChat(chatGroup.chats)}
        >
          <Avatar>
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
