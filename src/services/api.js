// src/services/api.js
import axios from 'axios';

export const getAllChats = () => {
  return axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=1');
};

export const getChatMessages = (chatId) => {
  return axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`);
};
