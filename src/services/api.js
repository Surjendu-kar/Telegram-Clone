import axios from "axios";

const API_BASE_URL = "https://devapi.beyondchats.com/api";

export const getAllChats = async (page = 1) => {
  try {
    // call API
    const response = await axios.get(`${API_BASE_URL}/get_all_chats?page=${page}`);

    // retrieve chats
    const data = response.data.data;
    const allChats = data.data;
    const nextPageURL = data.next_page_url;
    
    // sort by date-time
    allChats.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  
    // group charts by date 
    const groupedChats = allChats.reduce((acc, chat) => {
      const userId = chat.creator.id;
      if (!acc[userId]) {
        acc[userId] = {
          user: chat.creator,
          chats: [],
          lastMessage: null,
          lastMessageTime: null,
        };
      }
      acc[userId].chats.push(chat);
      return acc;
    }, {});
  
    // sort chat by groups
    const sortedGroupedChats = Object.keys(groupedChats)
      .map((userId) => groupedChats[userId])
      .sort(
        (a, b) =>
          new Date(b.chats[0].updated_at) - new Date(a.chats[0].updated_at)
      );
  
    // Fetch last messages for each chat
    for (const chatGroup of sortedGroupedChats) {
      const lastMessageResponse = await getChatMessages(chatGroup.chats[0].id);
      const messages = lastMessageResponse.data.data;
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        chatGroup.lastMessage = lastMessage.message;
        chatGroup.lastMessageTime = lastMessage.created_at;
      }
    }
  
    return {sortedGroupedChats, nextPageURL};
  } catch (error) {
    console.log(error);
  }

  return {sortedGroupedChats: [], nextPageURL: null}
};

export const getChatMessages = (chatId) => {
  return axios.get(`${API_BASE_URL}/get_chat_messages?chat_id=${chatId}`);
};

