import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import './App.css';
import Chat from './Chat'
import Wizard from './Wizard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="wizard" element={<Wizard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
