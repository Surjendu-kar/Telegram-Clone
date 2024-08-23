
# Telegram Clone with ReactJS

## Project Overview :

This project is a pixel-perfect replica of the Telegram messaging application, both in desktop and mobile views, created using ReactJS and MUI (Material-UI). The application replicates the UI/UX of the Telegram app and fetches data from two provided API endpoints.


## Live  Demo


You can view the live demo of the project
[here.](https://its-my-telegram-clone.vercel.app/)
## Features

- Responsive design that works seamlessly on both desktop and mobile views.
- Display of chat lists and individual chat messages.
- Functional search bar to filter chats.
- Theme toggle (light/dark mode).
- Chat data is continuously fetched and rendered as the user scrolls down.
- Interactive UI components that replicate Telegram's design.



## Prerequisites
- Node.js (v14 or higher)
- Yarn (v1.22 or higher)

## Installation

Install my-project with npm

```bash
    Clone the repository:
    git clone https://github.com/Surjendu-kar/Telegram-Clone.git
    cd telegram-clone
```
    
```bash
    Install the dependencies:
    yarn install
```

```bash
    Start the development server:
	yarn dev
```
## Project Structure

- src/components: Contains all the reusable components used in - the application.
- ChatList: Component to display the list of chats.
- ChatWindow: Component to display messages of the selected chat.
- Navbar: Component for the top navigation bar.
- MessageInput: Component for the message input area.
- ShowMessage: Component for displaying individual messages.
- MenuItem: Components for handling menu items and temporary - drawer.
 
- src/context: Contains context providers like ThemeContext for - managing themes.
- src/services: Contains API service functions for fetching chat - and message data.
- src/constant: Contains constant values used throughout the - application.
- src/pages/Home.jsx: Main page component that houses the - application layout.


## Components
### Home.jsx
The main layout of the application, containing logic to handle the selection of chats and rendering either the chat list or chat window based on the view (mobile or desktop).

### ChatList
Fetches and displays a list of chats. It supports infinite scrolling to load more chats as the user scrolls down.

### ChatWindow
Displays messages of the selected chat. It fetches messages from the API and supports sending new messages.

### Navbar
A top navigation bar that includes a search bar and a menu for additional options.

### MessageInput
A component for the message input area, including attachments, emojis, and send button.

### ShowMessage
Handles the display of individual messages within a chat, grouped by date.


## API Integration
The project integrates with two API endpoints to fetch chat and 
message data:

#### Get all chats:
- Description: Returns list of chats (paginated API)
- URL: https://devapi.beyondchats.com/api/get_all_chats?page=1
- Type: GET

#### Get chat messages:
- Description: Returns list of messages given a chat_id
- URL: https://devapi.beyondchats.com/api/get_chat_messages?chat_id=3888
- Type: GET



## Acknowledgements
Telegram for the original design inspiration.
Material-UI for providing a robust and customizable component library





## Screenshots
### Desktop version (Dark Mode):
![App Screenshot](https://i.ibb.co/kBCLJML/Screenshot-2024-07-24-010254.png)

![App Screenshot](https://i.ibb.co/8M2fzkw/Screenshot-2024-07-24-013348.png)

![App Screenshot](https://i.ibb.co/YfbGD27/Screenshot-2024-07-24-011022.png)

![App Screenshot](https://i.ibb.co/K5YTjvk/Screenshot-2024-07-24-013537.png)

![App Screenshot](https://i.ibb.co/WzGSg9n/Screenshot-2024-07-24-011238.png)

![App Screenshot](https://i.ibb.co/DWgBRYS/Screenshot-2024-07-24-011225.png)


### Desktop version (Light Mode):

![App Screenshot](https://i.ibb.co/NV2NFH1/Screenshot-2024-07-24-011103.png)
###

![App Screenshot](https://i.ibb.co/sKV1Zjf/Screenshot-2024-07-24-013846.png)

![App Screenshot](https://i.ibb.co/fSn2DX3/Screenshot-2024-07-24-011142.png)

![App Screenshot](https://i.ibb.co/nCkptwy/Screenshot-2024-07-24-011158.png)

![App Screenshot](https://i.ibb.co/VTbK0KW/Screenshot-2024-07-24-011210.png)

### Mobile version (Dark Mode):

![App Screenshot](https://i.ibb.co/JC5Kn65/Screenshot-2024-07-24-011309.png)

![App Screenshot](https://i.ibb.co/TKnSCcm/Screenshot-2024-07-24-011320.png)

![App Screenshot](https://i.ibb.co/kq8R01Q/Screenshot-2024-07-24-011337.png)

![App Screenshot](https://i.ibb.co/Y3KrGxX/Screenshot-2024-07-24-011355.png)

### Mobile version (Light Mode):

![App Screenshot](https://i.ibb.co/0QH5Xbc/Screenshot-2024-07-24-011437.png)

![App Screenshot](https://i.ibb.co/sgmXk98/Screenshot-2024-07-24-011512.png)

![App Screenshot](https://i.ibb.co/X89nndB/Screenshot-2024-07-24-011544.png)

![App Screenshot](https://i.ibb.co/jJrwvrT/Screenshot-2024-07-24-011528.png)

