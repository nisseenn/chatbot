import React, { useEffect, useState } from 'react';
import { MessageList } from 'react-chat-elements'
import { Widget, addResponseMessage } from 'react-chat-widget';
import socketIOClient from "socket.io-client";
import axios from "axios"

import './App.css';

import 'react-chat-widget/lib/styles.css';

let FLASK_URL = "http://localhost:5000"
let socket = socketIOClient.connect(`${FLASK_URL}`);

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const handleMakeAPICall = (newMessage) => {
    socket.emit("message", newMessage);
    // axios.post(FLASK_URL+"/submit_text", {
    //   message: newMessage
    // })
    // .then(res => {
    //   if(res.status === 200){
    //       console.log(res.data.message)
    //       addResponseMessage(res.data.message)
    //   }
    // })
    // .catch(err => {
    //   console.log('err: ' + err.message)
    // })
  }

  const getMessages = () => {
    socket.on("message", msg => {
      addResponseMessage(msg)
    });
  };

  const handleNewUserMessage = (newMessage) => {
    //pushing the message to the backend
    handleMakeAPICall(newMessage)
    // Now send the message throught the backend API
  };

  const initializeApp = async() => {
    console.log('initialize app running')
    addResponseMessage('Welcome, how can I help you?');
  }

  useEffect(() => {
    initializeApp()
  }, []);

  return (
    <div className="App">
      <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Chatoline"
      // fullScreenMode
      subtitle="Ask me anything about Lillehammer Kommune"
      />
    </div>
  );
}

export default App;
