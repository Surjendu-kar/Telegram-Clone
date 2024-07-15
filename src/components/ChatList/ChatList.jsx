import React, { useEffect, useState } from "react";
import { List, ListItem, Avatar, Box, Typography, styled } from "@mui/material";
import { getAllChats, getChatMessages } from "../../services/api";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useTheme } from "@mui/material/styles";

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(localizedFormat);

const StyledListItem = styled(ListItem)(({ theme, isSelected }) => ({
  cursor: "pointer",
  borderRadius: "15px",
  backgroundColor: isSelected ? theme.palette.primary.main : "inherit",
  color: isSelected ? "white" : "inherit",
  transition: "all 0.5s ease",

  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200],
    "& .MuiTypography-root": {
      color: theme.palette.text.primary,
    },
    "& .MuiAvatar-root": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },

  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "& .MuiTypography-root": {
      color: "#fff",
    },
    "& .MuiAvatar-root": {
      backgroundColor: "#fff",
      color: theme.palette.primary.main,
    },
  },
}));

const StyledAvatar = styled(Avatar)(({ theme, isSelected }) => ({
  backgroundColor: isSelected ? "white" : theme.palette.primary.main,
  color: isSelected ? theme.palette.primary.main : "white",
  width: 55,
  height: 55,
  fontSize: "1.5rem",
  transition: "all 0.5s ease",
}));

const ContentBox = styled(Box)({
  width: "100%",
  margin: "0 0.5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  overflow: "hidden",
});

const HeaderBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const UserName = styled(Typography)(({ theme, isSelected }) => ({
  variant: "subtitle1",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  flexGrow: 1,
  color: isSelected ? "#fff" : theme.palette.text.primary,
  transition: "color 0.5s ease",
}));

const LastMessage = styled(Typography)(({ theme, isSelected }) => ({
  variant: "body2",
  color: isSelected ? "#fff" : theme.palette.text.secondary,
  fontSize: "0.875rem",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  transition: "color 0.5s ease",
}));

const LastMessageTime = styled(Typography)(({ theme, isSelected }) => ({
  variant: "caption",
  color: isSelected ? "#fff" : theme.palette.text.disabled,
  fontSize: "0.75rem",
  marginLeft: "8px",
  flexShrink: 0,
  transition: "color 0.5s ease",
}));

const formatTime = (timestamp) => {
  const now = dayjs();
  const date = dayjs(timestamp);

  if (date.isToday() ) {
    return date.format("hh:mm A");
  } else if (now.diff(date, "day") < 7) {
    return date.format("dddd");
  } else if (now.diff(date, "month") < 1) {
    return date.format("DD MMM");
  } else if (now.diff(date, "year") < 1) {
    return date.format("MMM DD");
  } else {
    return date.format("YYYY");
  }
};

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getAllChats();
        const allChats = response.data.data.data;

        allChats.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        // console.log(allChats);

        const groupedChats = allChats.reduce((acc, chat) => {
          const userId = chat.creator.id;
          if (!acc[userId]) {
            acc[userId] = {
              user: chat.creator,
              chats: [],
              lastMessage: null,
              lastMessageTime: null,
            };
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

        // Fetch last messages for each chat
        for (const chatGroup of sortedGroupedChats) {
          const lastMessageResponse = await getChatMessages(
            chatGroup.chats[0].id
          );
          const messages = lastMessageResponse.data.data;
          if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            chatGroup.lastMessage = lastMessage.message;
            chatGroup.lastMessageTime = lastMessage.created_at;
          }
        }

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
          selected={selectedChatId === chatGroup.user.id}
          theme={theme}
        >
          <StyledAvatar
            isSelected={selectedChatId === chatGroup.user.id}
            theme={theme}
          >
            {chatGroup.user.name ? chatGroup.user.name.charAt(0) : "U"}
          </StyledAvatar>
          <ContentBox>
            <HeaderBox>
              <UserName
                theme={theme}
                isSelected={selectedChatId === chatGroup.user.id}
              >
                {chatGroup.user.name || "Deleted User"}
              </UserName>
              {chatGroup.lastMessageTime && (
                <LastMessageTime
                  theme={theme}
                  isSelected={selectedChatId === chatGroup.user.id}
                >
                  {formatTime(chatGroup.lastMessageTime)}
                </LastMessageTime>
              )}
            </HeaderBox>
            <LastMessage
              theme={theme}
              isSelected={selectedChatId === chatGroup.user.id}
            >
              {chatGroup.lastMessage || "No messages"}
            </LastMessage>
          </ContentBox>
        </StyledListItem>
      ))}
    </List>
  );
};

export default ChatList;
