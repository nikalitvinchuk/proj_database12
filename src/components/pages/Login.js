import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = (props) => {
    const [username, setUsername] = useState(""); // definicja stanu username za pomocą hooka useState
    const [password, setPassword] = useState(""); // definicja stanu password za pomocą hooka useState

    const navigate = useNavigate();

    const handleSubmit = (event) => {             // definicja funkcji handleSubmit, która obsługuje przesyłanie formularza
        event.preventDefault();                   // zapobieganie domyślnej akcji przeglądarki, czyli przeładowania strony po przesłaniu formularza

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
                // Obsługa odpowiedzi serwera
                .then(res => res.json())
                .then(data => {
                    // Jeśli logowanie się powiodło
                    if (data.success) {
                        navigate("/");
                    } else {
                        // Jeśli logowanie się nie powiodło, wyświetl komunikat o błędzie
                        alert('Invalid username or password');
                    }
                })
                .catch(err => {
                    // Jeśli wystąpił błąd, wyświetl komunikat o błędzie w konsoli i w oknie przeglądarki
                    console.error(err);
                });
    };

    return (
        <section className="section-log">
            <div className="form-box-log">
                <div className="form-value-log">
                    <form id="login-form" onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div className="inputbox">
                            <ion-icon name="mail-outline"></ion-icon>
                            <input
                                type="text"
                                id="username-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}   // zmiana stanu username po zmianie wartości pola formularza
                                required
                            />
                            <label>Login</label>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>    
                            <input
                                type="password"
                                id="password-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}   // zmiana stanu password po zmianie wartości pola formularza
                                required
                            />
                            <label>Hasło</label>
                        </div>
                        <button type="submit">Zaloguj się</button>
                        <div className="register">
                            <p>Nie mam konta. <NavLink to="/registration"><a>Stwórz konto</a></NavLink></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
