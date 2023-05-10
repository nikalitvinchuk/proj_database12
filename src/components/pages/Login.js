import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("/login", { username, password }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => {
                if (res.data.success) {
                    navigate("/");
                } else {
                    alert("Invalid username or password");
                }
            })
            .catch((err) => {
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
