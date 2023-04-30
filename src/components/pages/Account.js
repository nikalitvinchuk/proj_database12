import React from "react";
const Account = () => {
    return (
        <section className="main_form">
            <div className="form-box">
                <div className="form-value">
                    <form id="login-form">
                        <h2>Twoje Konto</h2>
                        <div className="inputbox_acc">
                            <label>Imię</label>
                            <input type="text" placeholder="Imię" /> <br />
                            <label>Nazwisko</label>
                            <input type="text" placeholder="Nazwisko" /> <br />
                            <label>Email</label>
                            <input type="text" placeholder="Email" /> <br />
                            <label>Hasło</label>
                            <input type="password" placeholder="Hasło" /> <br />
                            <label>Typ konta</label>
                            <input type="text" placeholder="User" /> <br />
                            <label>Zainteresowania</label>
                            <select>
                                <option>Sport</option>
                                <option>Zdrowie</option>
                                <option>Zdrowe odżywianie</option>
                                <option>Rady na codzień</option>
                            </select> <br />
                        </div>
                        <button type="button">Zmień</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Account;
