import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AdvancedSearch from './components/AdvancedSearch';

function App() {

  return (
    <>
      <Router> 
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/advanced" element={<AdvancedSearch />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
