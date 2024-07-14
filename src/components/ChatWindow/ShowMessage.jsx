import React from "react";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { Box, Typography, Paper, styled } from "@mui/material";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const MainContainer = styled(Box)({
  width: "60%",
  margin: "0 auto",
});

const DateBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  margin: "1rem 0",
});

const DateTypography = styled(Typography)({
  fontSize: "0.75rem",
  backgroundColor: "#eeeeee",
  padding: "0.25rem 0.5rem",
  borderRadius: "20px",
  display: "inline-block",
});

const MessageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  marginBottom: "1rem",
  width: "100%",
}));

const PaperContainer = styled(Paper)({
  padding: "16px",
  backgroundColor: "#e0f7fa",
  borderRadius: "8px",
  wordBreak: "break-word",
  width: "100%",
});

const MessageContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const MessageText = styled(Typography)({});

const TimeStamp = styled(Typography)({
  alignSelf: "flex-end",
  fontSize: "0.75rem",
  color: "rgba(0, 0, 0, 0.6)",
});

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
  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (Object.keys(messages).length === 0) {
    return <Typography variant="body1">No messages</Typography>;
  }

  return (
    <MainContainer>
      {Object.keys(messages)
        .sort((a, b) => new Date(a) - new Date(b))
        .map((date) => (
          <React.Fragment key={date}>
            <DateBox>
              <DateTypography>{formatDate(date)}</DateTypography>
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
              >
                <Box sx={{ maxWidth: "75%" }}>
                  <PaperContainer>
                    <MessageContent>
                      <MessageText variant="body1">
                        {message.message}
                      </MessageText>
                      <TimeStamp variant="caption">
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
