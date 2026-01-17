// import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {UnitContextProvider} from './contexts/UnitContext.jsx';
import Home from './components/Home';
import AdvancedSearch from './components/AdvancedSearch';
import ThreadResults from './components/ThreadResults';

function App() {

  return (
    <>
      <UnitContextProvider>
      <main>
        <Router> 
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/advanced" element={<AdvancedSearch />} />
          <Route path="/all" element={<ThreadResults endpoint="google.com"/>} />
          <Route path="/search" element={<ThreadResults endpoint="google.com"/>} />
        </Routes>
      </Router>
      </main>
      </UnitContextProvider>
      
    <footer>
      <p>&copy; Nathan Smith</p>
    </footer>
    </>
  )
}

export default App;
