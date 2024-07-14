import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import Navbar from "../components/Navbar";

const Home = () => {
  const [selectedChats, setSelectedChats] = useState(null);

  const handleBack = () => {
    setSelectedChats(null);
  };

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
        <Navbar />
        <ChatList onSelectChat={setSelectedChats} />
      </Grid>
      <Grid item xs={8} sx={{ height: "100vh", overflowY: "auto" }}>
        {selectedChats ? (
          <ChatWindow chats={selectedChats} onBack={handleBack} />
        ) : (
          <Box>Select a chat to view messages</Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
