import React, { useState } from "react";
import { Grid, useMediaQuery, useTheme, Box } from "@mui/material";
import ChatList from "../components/ChatList/ChatList";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import Navbar from "../components/Navbar/Navbar";

const Home = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleBack = () => {
    setSelectedChat(null);
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {isMobile ? (
        selectedChat ? (
          <Grid
            item
            xs={12}
            sx={{
              height: "100vh",
              overflowY: "auto",
              backgroundImage:
                "url(https://web.telegram.org/a/chat-bg-pattern-dark.ad38368a9e8140d0ac7d.png)",
              backgroundSize: "contain",
              backgroundRepeat: "repeat",
              backgroundPosition: "center",
            }}
          >
            <ChatWindow selectedChat={selectedChat} onBack={handleBack} />
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
          >
            <Box sx={{ position: "sticky", top: 0, zIndex: 1 }}>
              <Navbar />
            </Box>
            <Box sx={{ flexGrow: 1, overflowY: "auto", padding: "0 0.5rem" }}>
              <ChatList onSelectChat={setSelectedChat} />
            </Box>
          </Grid>
        )
      ) : (
        <>
          <Grid
            item
            xs={3}
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgb(29 29 29)"
                  : theme.palette.background.paper,
            }}
          >
            <Box sx={{ position: "sticky", top: 0, zIndex: 1 }}>
              <Navbar />
            </Box>
            <Box sx={{ flexGrow: 1, overflowY: "auto", padding: "0 0.5rem" }}>
              <ChatList onSelectChat={setSelectedChat} />
            </Box>
          </Grid>
          <Grid
            item
            xs={9}
            sx={{
              height: "100vh",
              overflowY: "auto",
              backgroundImage:
                "url(https://web.telegram.org/a/chat-bg-pattern-dark.ad38368a9e8140d0ac7d.png)",
              backgroundSize: "contain",
              backgroundRepeat: "repeat",
              backgroundPosition: "center",
            }}
          >
            {selectedChat ? (
              <ChatWindow selectedChat={selectedChat} onBack={handleBack} />
            ) : null}
          </Grid>
        </>
      )}
    </Grid>
  );
};



export default Home;
