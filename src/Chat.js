import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import socketIOClient from "socket.io-client";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import 'react-chat-widget/lib/styles.css';

import './App.css';
import avatar_female from './assets/avatar_female.png'
import avatar_male from './assets/avatar_male.jpeg'
import avatar_nogender from './assets/avatar_nogender.jpeg'

let FLASK_URL = "http://localhost:5000"
let socket = socketIOClient.connect(`${FLASK_URL}`);

const Male = "Male"
const Female = "Female"
const No_gender = "No_gender"

const Chat = (props) => {

      const [avatar, setAvatar] = useState('')
  
      let location = useLocation();
    
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
        getMessages();
      }, []);
    
      useEffect(() => {
        initializeApp()
      }, []);

      useEffect(() => {
        if(location.state.avatarType === Male){
          setAvatar(avatar_male)
        }else if(location.state.avatarType === Female){
          setAvatar(avatar_female)
        }else if(location.state.avatarType === No_gender){
          setAvatar(avatar_nogender)
        }
      }, [])

    return(
        <div className="App">
            <Typography style={{ }} variant="h4">Some organization website</Typography>
            <Widget
            handleNewUserMessage={handleNewUserMessage}
            title={location.state.avatarName}
            profileAvatar={avatar}
            subtitle=""
            emojis={true}
            />
      </div>
    )
}

export default Chat;