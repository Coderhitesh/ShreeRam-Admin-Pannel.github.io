import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './Components/Home/Home';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <Router>
      <Home/>
      <Toaster/>
    </Router>
  );
}

export default App;
