import React, { useEffect, useState } from 'react';
import { MessageList } from 'react-chat-elements'
import { Widget, addResponseMessage } from 'react-chat-widget';
import socketIOClient from "socket.io-client";
import axios from "axios"
import { BrowserRouter, Link } from "react-router-dom";

import './App.css';
import avatar_female from './assets/avatar_female.png'
import avatar_male from './assets/avatar_male.jpeg'

import 'react-chat-widget/lib/styles.css';

let FLASK_URL = "http://localhost:5000"
let socket = socketIOClient.connect(`${FLASK_URL}`);

const Chat = (props) => {
    useEffect(() => {
        getMessages();
      }, []);
    
      const handleMakeAPICall = (newMessage) => {
        socket.emit("message", newMessage);
      }
    
      //The function to trigger when new message comes inn. Triggered in the useEffect method.
      const getMessages = () => {
        socket.on("message", msg => {
          //Adding the response from the chatbot to the UI
          addResponseMessage(msg)
        });
      };
    
      //The function for when the user submit new message.
      const handleNewUserMessage = (newMessage) => {
        //pushing the message to the backend
        handleMakeAPICall(newMessage)
        // Now send the message throught the backend API
      };
    
      //The function for the initial messagge. Triggered in the useEffect below.
      const initializeApp = async() => {
        console.log('initialize app running')
        addResponseMessage('Welcome, how can I help you?');
      }
    
      useEffect(() => {
        initializeApp()
      }, []);

    return(
        <div className="App">
            <p className="websiteTitle">Lillehammer Municipality website</p>
            <Widget
            handleNewUserMessage={handleNewUserMessage}
            title="Municipality-Mia"
            profileAvatar={avatar_female}
            subtitle=""
            emojis={true}
            />
      </div>
    )
}

export default Chat;