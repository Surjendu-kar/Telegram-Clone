import { useEffect, useState, useRef, useCallback } from "react";
import {
  List,
  ListItem,
  Avatar,
  Box,
  Typography,
  styled,
  Stack,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { getAllChats } from "../../services/api";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useTheme } from "@mui/material/styles";
import { CONSTANT } from "../../constant";
import PropTypes from "prop-types";
import Loading from "./Loading";

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(localizedFormat);

const StyledListItem = styled(ListItem)(({ theme, isSelected }) => ({
  cursor: "pointer",
  borderRadius: "15px",
  backgroundColor: isSelected
    ? theme.palette.mode === "dark"
      ? "rgb(118,106,200)"
      : "#3aa7ff"
    : "inherit",
  color: isSelected ? "white" : "inherit",
  transition: "all 0.5s ease",
  paddingRight: "0",

  "&:hover": {
    backgroundColor: isSelected
      ? theme.palette.mode === "dark"
        ? "rgb(118,106,200)"
        : "#3aa7ff"
      : theme.palette.mode === "dark"
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
    backgroundColor:
      theme.palette.mode === "dark" ? "rgb(118,106,200)" : "#3aa7ff",
    color: "#fff",
    "& .MuiTypography-root": {
      color: "#fff",
    },
    "& .MuiAvatar-root": {
      backgroundColor: "#fff",
      color: theme.palette.mode === "dark" ? "rgb(118,106,200)" : "#3aa7ff",
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
  margin: "0 0.5rem ",
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

  if (date.isToday()) {
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
  const [searchParams] = useSearchParams();
  const chatIds = useRef(new Set()); // Using useRef to memoize chatIds
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const theme = useTheme();
  const observer = useRef();
  const searchVal = searchParams.get(CONSTANT.SEARCH) ?? "";

  const lastChatElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    const fetchChats = async () => {
      setIsLoading(true);
      try {
        const { sortedGroupedChats, nextPageURL } = await getAllChats(page);
        // Check if the chat is already in the list
        const newChats = sortedGroupedChats.filter(
          (chat) => !chatIds.current.has(chat.user.id)
        );
        // Add new chat IDs to the set
        const newChatIds = new Set([
          ...chatIds.current,
          ...newChats.map((chat) => chat.user.id),
        ]);

        // Update the state
        setChats((prevChats) => [...prevChats, ...newChats]);
        chatIds.current = newChatIds;
        setHasMore(!!nextPageURL);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if ((searchVal.length > 0) & (page > 1)) {
      return;
    }

    fetchChats();
  }, [page, searchVal]);

  const handleSelectChat = (chatGroup) => {
    // Set the user name on title
    document.title = chatGroup.user.name;
    // set the chat ID
    setSelectedChatId(chatGroup.user.id);
    // send the chat details to ChatWindow Component
    onSelectChat(chatGroup);
  };

  const filteredChats =
    searchVal.length > 0
      ? chats.filter((each) =>
          each.user.name?.toLowerCase().includes(searchVal.toLowerCase())
        )
      : [...chats];

  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && !filteredChats.length && (
        <Stack mt={5} alignItems="center" justifyContent="center">
          {/* <Typography>No User Found</Typography> */}
          <Typography>
            Data may not display due to API that provided by the team is not
            working.
          </Typography>
        </Stack>
      )}

      <List>
        {filteredChats.map((chatGroup, index) => (
          <StyledListItem
            key={chatGroup.user.id}
            onClick={() => handleSelectChat(chatGroup)}
            isSelected={selectedChatId === chatGroup.user.id}
            selected={selectedChatId === chatGroup.user.id}
            theme={theme}
            ref={filteredChats.length === index + 1 ? lastChatElementRef : null}
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
    </>
  );
};

ChatList.propTypes = {
  onSelectChat: PropTypes.func.isRequired,
};

export default ChatList;
