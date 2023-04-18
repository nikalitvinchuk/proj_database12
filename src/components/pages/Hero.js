import React from 'react';
import {Routes, Route} from 'react-router-dom';
import MainPage from './MainPage';
import About from './About';
import Contact from './Contact';
import Account from './Account';
import Narzedzia from "./Narzedzia";

const Hero = () => {
    return ( 
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact/>} />
            <Route path="account" element={<Account/>} />
            <Route path="narzedzia" element={<Narzedzia/>} />
        </Routes>
    );
}

export default Hero;
