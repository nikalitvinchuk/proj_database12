import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Registration.css"
import axios from 'axios';

const Registration = () => {
    const [imie, setImie] = useState('');
    const [nazwisko, setNazwisko] = useState('');
    const [wiek, setWiek] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataToSend = {
            imie,
            nazwisko,
            wiek,
            login,
            password,
        };

        axios.post('/register', dataToSend)
            .then((response) => {
                console.log(response);
                setSuccess(true);
                setImie('');
                setNazwisko('');
                setWiek('');
                setLogin('');
                setPassword('');
            })
            .catch((error) => {
                console.log('There was a problem with your axios operation:', error);
                alert("Coś poszło nie tak. Spróbuj ponownie.");
            });
    };


    return (
        <section>
            <div className="form-box">
                <div className="form-value">
                    {success && <p>Registration successful!</p>}
                    <form id="login-form" onSubmit={handleSubmit}>
                        <h2>Rejestracja</h2>

                        <div className="inputbox">
                            <ion-icon name="person-outline"></ion-icon>
                            <input type="text" id="imie" value={imie} onChange={(e) => setImie(e.target.value)} />
                            <label>Imię</label>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="people-outline"></ion-icon>
                            <input type="text" id="nazwisko" value={nazwisko} onChange={(e) => setNazwisko(e.target.value)} />
                            <label>Nazwisko</label>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="shield-checkmark-outline"></ion-icon>
                            <input type="text" id="wiek" value={wiek} onChange={(e) => setWiek(e.target.value)} />
                            <label>Wiek</label>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="mail-outline"></ion-icon>
                            <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} />
                            <label>Login</label>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input type="password" id="haslo" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label>Hasło</label>
                        </div>
                        <button type="submit">Stwórz konto</button>.
                        <NavLink to="/"><button type="button">Wróć na stronę logowania</button>.</NavLink>

                    </form>
                </div>
            </div>
        </section>
    );
}

export default Registration;
