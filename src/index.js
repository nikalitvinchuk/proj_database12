// Importowanie potrzebnych modu³ów
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Login from './components/pages/Login';

// Pobieranie elementu DOM
const root = document.getElementById('root');

// G³ówny komponent aplikacji
const AppWrapper = () => {

    // Ustawianie pocz¹tkowego stanu aplikacji na "false" (niezalogowany)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Funkcja obs³uguj¹ca logowanie u¿ytkownika
    const handleLogin = (username, password) => {
        // Wys³anie zapytania do serwera z danymi logowania
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            // Obs³uga odpowiedzi serwera
            .then(res => res.json())
            .then(data => {
                // Jeœli logowanie siê powiod³o
                if (data.success) {
                    setIsLoggedIn(true);
                } else {
                    // Jeœli logowanie siê nie powiod³o, wyœwietl komunikat o b³êdzie
                    alert('Invalid username or password');
                }
            })
            .catch(err => {
                // Jeœli wyst¹pi³ b³¹d, wyœwietl komunikat o b³êdzie w konsoli i w oknie przegl¹darki
                console.error(err);
                alert('Something went wrong');
            });
    };

    // Renderowanie komponentów aplikacji
    return (
        <React.StrictMode>
            {isLoggedIn ? <App /> : <Login onLogin={handleLogin} />}
        </React.StrictMode>
    );
};

// Renderowanie g³ównego komponentu aplikacji
ReactDOM.render(<AppWrapper />, root);

// Sprawdzanie wydajnoœci aplikacji
reportWebVitals();
