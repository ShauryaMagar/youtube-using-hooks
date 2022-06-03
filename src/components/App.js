import React from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Watchlist from './Watchlist';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
const App=()=>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/watchlist' element={<Watchlist/>} />
            </Routes>
        </Router>
    );
}

export default App;