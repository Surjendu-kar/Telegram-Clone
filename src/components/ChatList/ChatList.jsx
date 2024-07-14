import React, { useEffect, useState } from "react";
import { List, ListItem, Avatar, Box, Typography, styled } from "@mui/material";
import { getAllChats } from "../../services/api";

const StyledListItem = styled(ListItem)(({ theme, isSelected }) => ({
  cursor: "pointer",
  borderRadius: "15px",
  backgroundColor: isSelected ? theme.palette.primary.main : "inherit",
  color: isSelected ? "white" : "inherit",
  transition: "all 0.5s ease",
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
      try {
        const response = await getAllChats();
        const allChats = response.data.data.data;

        allChats.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        console.log(allChats);

        const groupedChats = allChats.reduce((acc, chat) => {
          const userId = chat.creator.id;
          if (!acc[userId]) {
            acc[userId] = { user: chat.creator, chats: [] };
          }
          acc[userId].chats.push(chat);
          return acc;
        }, {});

        const sortedGroupedChats = Object.keys(groupedChats)
          .map((userId) => groupedChats[userId])
          .sort(
            (a, b) =>
              new Date(b.chats[0].updated_at) - new Date(a.chats[0].updated_at)
          );

        setChats(sortedGroupedChats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, []);

  const handleSelectChat = (chatGroup) => {
    document.title = chatGroup.user.name;
    setSelectedChatId(chatGroup.user.id);
    onSelectChat(chatGroup.chats);
  };

  return (
    <List>
      {chats.map((chatGroup) => (
        <StyledListItem
          key={chatGroup.user.id}
          onClick={() => handleSelectChat(chatGroup)}
          isSelected={selectedChatId === chatGroup.user.id}
        >
          <StyledAvatar isSelected={selectedChatId === chatGroup.user.id}>
            {chatGroup.user.name ? chatGroup.user.name.charAt(0) : "U"}
          </StyledAvatar>
          <ContentBox>
            <UserName>{chatGroup.user.name || "Unknown User"}</UserName>
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
