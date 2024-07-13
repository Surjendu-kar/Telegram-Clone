import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const Home = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <Grid container className="grid-container">
      <Grid
        item
        xs={3}
        sx={{
          borderRight: "1px solid #ccc",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <ChatList onSelectChat={setSelectedChat} />
      </Grid>
      <Grid item xs={8} sx={{ height: "100vh", overflowY: "auto" }}>
        {selectedChat ? (
          <ChatWindow chatId={selectedChat} />
        ) : (
          <Box>Select a chat to view messages</Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
