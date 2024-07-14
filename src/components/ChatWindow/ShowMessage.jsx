import React from "react";
import dayjs from "dayjs";
import { Box, Typography, Paper, styled } from "@mui/material";

export const MainContainer = styled(Box)({
  width: "60%",
  margin: "0 auto",
});

export const DateBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  margin: "1rem 0",
});

export const DateTypography = styled(Typography)({
  fontSize: "0.75rem",
  backgroundColor: "#eeeeee",
  padding: "0.5rem 1rem",
  borderRadius: "7px",
  display: "inline-block",
});

export const MessageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  marginBottom: "1rem",
  width: "100%",
}));

export const PaperContainer = styled(Paper)({
  padding: "16px",
  backgroundColor: "#e0f7fa",
  borderRadius: "8px",
  wordBreak: "break-word",
  width: "100%",
});

export const MessageContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const MessageText = styled(Typography)({
});

export const TimeStamp = styled(Typography)({
  alignSelf: "flex-end",
  fontSize: "0.75rem",
  color: "rgba(0, 0, 0, 0.6)",
});

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
              <DateTypography>{date}</DateTypography>
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
