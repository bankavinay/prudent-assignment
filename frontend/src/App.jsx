


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SearchResultsPage from './components/SearchResultsPage';
import BookInfoPage from './components/BooksInfoPage'; 
import About from './components/About';
import Contact from './components/Contact';
import AddEditBookPage from './components/AddEditBookPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/book/:id" element={<BookInfoPage />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add" element={<AddEditBookPage isEdit={false} />} />
          <Route path="/edit/:id" element={<AddEditBookPage isEdit={true} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
