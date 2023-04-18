import React from 'react';
import {Routes, Route} from 'react-router-dom';
import MainPage from './MainPage';
import About from './About';
import Contact from './Contact';
import Account from './Account';

const Hero = () => {
    return ( 
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact/>} />
            <Route path="account" element={<Account/>} />
        </Routes>
    );
}

export default Hero;
