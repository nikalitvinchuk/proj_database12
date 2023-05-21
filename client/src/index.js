// Importowanie potrzebnych modu³ów
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './components/pages/Login';
import Registration from './components/pages/Registration';

import MainPage from './components/pages/MainPage';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Account from './components/pages/Account';
import Narzedzia from "./components/pages/Narzedzia";
import BMIPage from "./components/pages/BMIPage";
import BMRPage from "./components/pages/BMRPage";
import WaterPage from "./components/pages/WaterPage";
import ExerciseBase from "./components/pages/ExerciseBase";
import LocationBase from "./components/pages/LocationBase";
import Useful from "./components/pages/Useful";
import Blog from "./components/pages/Blog";
import BaseList from "./components/admin_pages/BaseList";

// Pobieranie elementu DOM
const root = document.getElementById('root');

const AppWrapper = () => {
    return (
        <React.StrictMode>
            <Router>
                <Routes>
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/" element={<MainPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/narzedzia" element={<Narzedzia />} />
                        <Route path="/narzedzia/bmi" element={<BMIPage />} />
                        <Route path="/narzedzia/bmr" element={<BMRPage />} />
                        <Route path="/narzedzia/water" element={<WaterPage />} />
                        <Route path="/exerciseBase" element={<ExerciseBase />} />
                        <Route path="/locationBase" element={<LocationBase />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/useful" element={<Useful />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<BaseList/>}/>
                </Routes>
            </Router>
        </React.StrictMode>
    );
};


// Renderowanie g³ównego komponentu aplikacji
ReactDOM.render(<AppWrapper />, root);

// Sprawdzanie wydajnoœci aplikacji
reportWebVitals();
