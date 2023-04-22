import React from "react";
import "../styles/Login.css";
const Login = () => {
  return (
    <section className="section-log">
      <div className="form-box-log">
        <div className="form-value-log">
          <form id="login-form">
            <h2>Login</h2>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input type="text" id="username-input" required />
              <label>Login</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input type="password" id="password-input" required />
              <label>Hasło</label>
            </div>
            <button type="button">Zaloguj się</button>.
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
