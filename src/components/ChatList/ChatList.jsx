import React, { useEffect, useState } from "react";
import { List, ListItem, Avatar, Box, Typography, styled } from "@mui/material";
import { getAllChats } from "../../services/api";

const StyledListItem = styled(ListItem)(({ theme, isSelected }) => ({
  borderRadius: "15px",
  backgroundColor: isSelected ? theme.palette.primary.main : "inherit",
  color: isSelected ? "white" : "inherit",
  "&:hover": {
    backgroundColor: isSelected
      ? theme.palette.primary.dark
      : theme.palette.grey[200],
    color: isSelected ? "white" : "inherit",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme, isSelected }) => ({
  backgroundColor: isSelected ? "white" : theme.palette.primary.main,
  color: isSelected ? theme.palette.primary.main : "white",
  width: 55,
  height: 55,
  fontSize: "1.5rem",
}));

const ContentBox = styled(Box)({
  margin: "0 0.5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const UserName = styled(Typography)({
  variant: "subtitle1",
});

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      let allChats = [];
      try {
        const response = await getAllChats();
        allChats = allChats.concat(response.data.data.data);

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
        <StyledListItem
          button
          key={chatGroup.user.id}
          onClick={() => handleSelectChat(chatGroup)}
          isSelected={selectedChatId === chatGroup.user.id}
        >
          <StyledAvatar isSelected={selectedChatId === chatGroup.user.id}>
            {chatGroup.user.name ? chatGroup.user.name.charAt(0) : "U"}
          </StyledAvatar>
          <ContentBox>
            <UserName>{chatGroup.user.name || "Unknown User"}</UserName>
            {/* <Typography variant="body2">{chatGroup.user.email}</Typography> */}
            <Typography variant="body2">
              {chatGroup.chats.reduce((acc, chat) => acc + chat.msg_count, 0)}{" "}
              messages
            </Typography>
          </ContentBox>
        </StyledListItem>
      ))}
    </List>
  );
};

export default ChatList;
