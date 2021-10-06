import React, { useEffect } from 'react';
import { MessageList } from 'react-chat-elements'
import { Widget, addResponseMessage } from 'react-chat-widget';
import axios from "axios"
import './App.css';

import 'react-chat-widget/lib/styles.css';

let FLASK_URL = "http://localhost:5000"

function App() {

  const handleMakeAPICall = (newMessage) => {
    axios.post(FLASK_URL+"/submit_text", {
      message: newMessage
    })
    .then(res => {
      if(res.status === 200){
          console.log(res.data.message)
          addResponseMessage(res.data.message)
      }
    })
    .catch(err => {
      console.log('err: ' + err.message)
    })
  }

  const handleNewUserMessage = (newMessage) => {
    //pushing the message to the backend
    handleMakeAPICall(newMessage)
    // Now send the message throught the backend API
  };

  useEffect(() => {
    //Initial message sent to the user
    addResponseMessage('Welcome, what is on your mind?');
  }, []);

  return (
    <div className="App">
      <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Chatoline"
      // fullScreenMode
      subtitle="Ask me anything about ubuntu"
      />
    </div>
  );
}

export default App;
