import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { fetchChats } from '../services/api';

function Sidebar() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const loadChats = async () => {
      const chatData = await fetchChats();
      setChats(chatData);
    };
    loadChats();
  }, []);

  return (
    <Box sx={{ width: '40%', maxWidth: 360, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}>
      <List>
        {chats.map((chat) => (
          <ListItem key={chat.id} component={Link} to={`/chat/${chat.id}`} button>
            <ListItemAvatar>
              <Avatar alt={chat.name} src={chat.avatar} />
            </ListItemAvatar>
            <ListItemText 
              primary={chat.name} 
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {chat.last_message}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;