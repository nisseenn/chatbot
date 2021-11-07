import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';
import Chat from './Chat'
import Wizard from './Wizard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wizard />} />
        <Route path="chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
