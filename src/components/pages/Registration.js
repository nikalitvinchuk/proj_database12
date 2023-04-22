import React from 'react';
import "../styles/Registration.css"
const Registration = () => {
    return ( 
    <section>
         <div className="form-box">
            <div className="form-value">
                <form id="login-form">
                    <h2>Rejestracja</h2>

                    <div className="inputbox">
                        <ion-icon name="person-outline"></ion-icon>
                        <input type="text" id="imie"/>
                        <label>Imię</label>
                    </div>
                    <div className="inputbox">
                        <ion-icon name="people-outline"></ion-icon>
                        <input type="text" id="nazwisko"/>
                        <label>Nazwisko</label>
                    </div>
                    <div className="inputbox">
                        <ion-icon name="shield-checkmark-outline"></ion-icon>
                        <input type="text" id="wiek"/>
                        <label>Wiek</label>
                    </div>
                    <div className="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="text" id="login"/>
                        <label>Login</label>
                    </div>
                    <div className="inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" id="haslo"/>
                        <label>Hasło</label>
                    </div>

                    <button type="button" onclick="zarejestruj()"> Stwórz konto</button>.
                    <button type="button" onclick="logowanie()"> Wróć na stronę logowania</button>.
                </form>
            </div>
        </div>
    </section>
    );
}
 
export default Registration;