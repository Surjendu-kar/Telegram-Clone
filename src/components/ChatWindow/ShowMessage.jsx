import React from "react";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { Box, Typography, Paper, styled, useTheme } from "@mui/material";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const MainContainer = styled(Box)(({ theme }) => ({
  width: "60%",
  margin: "0 auto",
  backgroundColor: "transparent",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));
const DateBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  margin: "1rem 0",
  backgroundColor: "transparent",
}));

const DateTypography = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eeeeee",
  padding: "0.25rem 0.5rem",
  borderRadius: "20px",
  display: "inline-block",
  color:
    theme.palette.mode === "dark"
      ? theme.palette.common.white
      : theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.65rem",
  },
}));

const MessageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  marginBottom: "1rem",
  width: "100%",
  backgroundColor: "transparent",
}));

const PaperContainer = styled(Paper)(({ theme, isBeyondChat }) => ({
  padding: "12px 12px 2px",
  backgroundColor: isBeyondChat
    ? theme.palette.mode === "dark"
      ? "rgb(118,106,200)"
      : "#dbffcc"
    : theme.palette.mode === "dark"
    ? "rgb(46,47,47)"
    : theme.palette.common.white,
  borderRadius: "10px",
  wordBreak: "break-word",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    padding: "10px 8px 2px",
  },
}));

const MessageContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  color: theme.palette.text.primary,
}));

const MessageText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem",
  },
}));

const TimeStamp = styled(Typography)(({ theme }) => ({
  alignSelf: "flex-end",
  fontSize: "0.75rem",
  // color: "rgba(0, 0, 0, 0.6)",
  color: theme.palette.text.secondary,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.65rem",
  },
}));

const formatDate = (date) => {
  const now = dayjs();
  const messageDate = dayjs(date);

  if (messageDate.isSame(now, "year")) {
    if (messageDate.isSame(now, "day")) {
      return "Today";
    } else if (messageDate.isSame(now.subtract(1, "day"), "day")) {
      return "Yesterday";
    } else if (messageDate.isSame(now.subtract(1, "week"), "week")) {
      return messageDate.format("dddd");
    } else {
      return messageDate.format("MMMM D");
    }
  } else {
    return messageDate.format("MMMM D, YYYY");
  }
};

const ShowMessage = ({ messages, loading }) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
        Loading...
      </Typography>
    );
  }

  if (Object.keys(messages).length === 0) {
    return (
      <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
        No messages
      </Typography>
    );
  }

  return (
    <MainContainer theme={theme}>
      {Object.keys(messages)
        .sort((a, b) => new Date(a) - new Date(b))
        .map((date) => (
          <React.Fragment key={date}>
            <DateBox theme={theme}>
              <DateTypography theme={theme}>{formatDate(date)}</DateTypography>
            </DateBox>
            {messages[date].map((message) => (
              <MessageBox
                key={message.id}
                sx={{
                  justifyContent:
                    message.sender.name === "BeyondChat"
                      ? "flex-end"
                      : "flex-start",
                }}
                theme={theme}
              >
                <Box sx={{ maxWidth: "75%" }}>
                  <PaperContainer
                    theme={theme}
                    isBeyondChat={message.sender.name === "BeyondChat"}
                  >
                    <MessageContent theme={theme}>
                      <MessageText variant="body1" theme={theme}>
                        {message.message}
                      </MessageText>
                      <TimeStamp variant="caption" theme={theme}>
                        {dayjs(message.created_at).format("hh:mm a")}
                      </TimeStamp>
                    </MessageContent>
                  </PaperContainer>
                </Box>
              </MessageBox>
            ))}
          </React.Fragment>
        ))}
    </MainContainer>
  );
};

export default ShowMessage;
