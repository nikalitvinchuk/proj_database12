import React, { useState } from "react";
import "../styles/Login.css";

const Login = (props) => {
    const [username, setUsername] = useState(""); // definicja stanu username za pomocą hooka useState
    const [password, setPassword] = useState(""); // definicja stanu password za pomocą hooka useState

    const handleSubmit = (event) => {             // definicja funkcji handleSubmit, która obsługuje przesyłanie formularza
        event.preventDefault();                   // zapobieganie domyślnej akcji przeglądarki, czyli przeładowania strony po przesłaniu formularza
        props.onLogin(username, password);        // wywołanie funkcji onLogin przekazanej przez props z aktualnymi wartościami username i password
    };

    return (
        <section>
            <div className="form-box">
                <div className="form-value">
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
                            <p>Nie mam konta. Stwórz konto</p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
