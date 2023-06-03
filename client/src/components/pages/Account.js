import React, { useState, useEffect } from "react";
import Header from './Header';
import withAuth from '../../withAuth';
import axios from 'axios';

const Account = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('/profile')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <Header />
            <section className="main_form">
                <div className="form-box">
                    <div className="form-value">
                        <form id="login-form">
                            <h2>Twoje Konto</h2>
                            <div className="inputbox_acc">
                                <label>Imię: {user.firstName}</label>
                            </div>
                            <div className="inputbox_acc">
                                <label>Nazwisko: {user.lastName}</label>
                            </div>
                            <div className="inputbox_acc">
                                <label>Wiek: {user.age}</label>
                            </div>
                            <div className="inputbox_acc">
                                <label>Email: {user.email}</label>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default withAuth(Account);
