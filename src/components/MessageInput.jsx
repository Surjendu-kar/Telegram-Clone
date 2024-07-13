import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

function MessageInput({ chatId }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Implement send message functionality
    console.log(`Sending message to chat ${chatId}: ${message}`);
    setMessage('');
  };

  return (
    <Box sx={{ padding: 2, borderTop: 1, borderColor: 'divider', display: 'flex' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <IconButton color="primary" onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default MessageInput;