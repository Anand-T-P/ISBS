import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import ProductHome from './pages/ProductHome';
import MovieBooking from './pages/MovieBooking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProductHome/>}/>
        <Route path='/booking/:id' element={<MovieBooking/>}/>
        </Routes>
        </Router>
  );
}

export default App;
