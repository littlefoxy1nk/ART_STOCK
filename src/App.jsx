import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateProduct from './pages/CreateProduct';
import './style.css'

const App = () => {
  return (
    // les routeurs sont la pour améliorer la navigation dans les pages ( évite le retéléchargement
    // 1. les routes pour rendre URL 
    // 2. / -> renvoie a home si rien après 
    // 3. /create pour aller a la page creer pour CreateProduct
    <Router>
      <Routes> 
      
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </Router>
  );
};

export default App;