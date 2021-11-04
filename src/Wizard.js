import React from 'react';
import { Outlet, Link } from "react-router-dom";

import './App.css';

const Wizard = () => {

    const handleGoToChat = () => {
        
    }

    return (
        <div>
            <p>Wizard</p>
            <Link to="/">Chatbot</Link> |{" "}
        </div>
    );
}

export default Wizard;