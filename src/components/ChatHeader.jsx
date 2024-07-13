import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { fetchChatDetails } from '../services/api';

function ChatHeader({ chatId }) {
  const [chatDetails, setChatDetails] = useState(null);

  useEffect(() => {
    const loadChatDetails = async () => {
      const details = await fetchChatDetails(chatId);
      setChatDetails(details);
    };
    loadChatDetails();
  }, [chatId]);

  if (!chatDetails) return null;

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Avatar alt={chatDetails.name} src={chatDetails.avatar} sx={{ marginRight: 2 }} />
        <Typography variant="h6" component="div">
          {chatDetails.name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default ChatHeader;