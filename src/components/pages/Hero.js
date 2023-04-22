import React from 'react';
import {Routes, Route} from 'react-router-dom';
import MainPage from './MainPage';
import About from './About';
import Contact from './Contact';
import Account from './Account';
import Narzedzia from "./Narzedzia";
import BMIPage from "./BMIPage";
import BMRPage from "./BMRPage";
import WaterPage from "./WaterPage";
import ExerciseBase from "./ExerciseBase";
import LocationBase from "./LocationBase";
import Useful from "./Useful";
import Blog from "./Blog";


const Hero = () => {
    return ( 
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact/>} />
            <Route path="account" element={<Account/>} />
            <Route path="narzedzia" element={<Narzedzia/>} />
            <Route path="narzedzia/bmi" element={<BMIPage/>} />
            <Route path="narzedzia/bmr" element={<BMRPage/>} />
            <Route path="narzedzia/water" element={<WaterPage/>} />
            <Route path="/exerciseBase" element={<ExerciseBase/>}/>
            <Route path="/locationBase" element={<LocationBase/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/useful" element={<Useful/>}/>
        </Routes>
    );
}

export default Hero;
