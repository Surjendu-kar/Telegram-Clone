import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import Navbar from "../components/Navbar";
import TwitterIcon from "../assets/twitter.png";

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              // backgroundColor: "#f5f5f5",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography variant="h5" sx={{ color: "grey.500" }}>
                Select a chat to view messages
              </Typography>
              <img 
                src={TwitterIcon} 
                alt="Twitter Icon" 
                style={{ 
                  width: "40px", 
                  height: "40px",
                  opacity: 0.5 
                }} 
              />
            </Box>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;