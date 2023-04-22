// Importowanie potrzebnych modu��w
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Login from './components/pages/Login';

// Pobieranie elementu DOM
const root = document.getElementById('root');

// G��wny komponent aplikacji
const AppWrapper = () => {

    // Ustawianie pocz�tkowego stanu aplikacji na "false" (niezalogowany)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Funkcja obs�uguj�ca logowanie u�ytkownika
    const handleLogin = (username, password) => {
        // Wys�anie zapytania do serwera z danymi logowania
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            // Obs�uga odpowiedzi serwera
            .then(res => res.json())
            .then(data => {
                // Je�li logowanie si� powiod�o
                if (data.success) {
                    setIsLoggedIn(true);
                } else {
                    // Je�li logowanie si� nie powiod�o, wy�wietl komunikat o b��dzie
                    alert('Invalid username or password');
                }
            })
            .catch(err => {
                // Je�li wyst�pi� b��d, wy�wietl komunikat o b��dzie w konsoli i w oknie przegl�darki
                console.error(err);
                alert('Something went wrong');
            });
    };

    // Renderowanie komponent�w aplikacji
    return (
        <React.StrictMode>
            {isLoggedIn ? <App /> : <Login onLogin={handleLogin} />}
        </React.StrictMode>
    );
};

// Renderowanie g��wnego komponentu aplikacji
ReactDOM.render(<AppWrapper />, root);

// Sprawdzanie wydajno�ci aplikacji
reportWebVitals();
