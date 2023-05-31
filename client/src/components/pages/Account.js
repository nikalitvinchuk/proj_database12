import React, { useState, useEffect } from "react";
import Header from './Header';
import withAuth from '../../withAuth';
import axios from 'axios';

const Account = () => {
    const [user, setUser] = useState({});
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        axios.get('/prof')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        // Wysyłanie danych do bazy danych
        axios.post('/update-profile', { weight, height })
            .then(response => {
                // Aktualizacja danych w komponencie
                setUser({ ...user, weight, height });
                setEditing(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleCancel = () => {
        setEditing(false);
    };

    const handleChangeWeight = event => {
        setWeight(event.target.value);
    };

    const handleChangeHeight = event => {
        setHeight(event.target.value);
    };

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
                                <label>Email: {user.email}</label>
                            </div>
                            <div className="inputbox_acc">
                                <label>Zainteresowania: {user.interests}</label>
                            </div>
                            {!editing && (
                                <div className="inputbox_acc">
                                    <button onClick={handleEdit}>Dodatkowe dane</button>
                                </div>
                            )}
                            {editing && (
                                <div className="inputbox_acc">    
                                    <input
                                        type="text"
                                        value={weight}
                                        onChange={handleChangeWeight}
                                        placeholder="Waga"
                                    />
                                </div>
                            )}
                            {editing && (
                                <div className="inputbox_acc">
                                    <input
                                        type="text"
                                        value={height}
                                        onChange={handleChangeHeight}
                                        placeholder="Wzrost"
                                    />
                                </div>

                            )}
                            {editing && (
                                <div className="inputbox_acc">
                                    <button onClick={handleSave}>Zapisz</button>
                                    <button onClick={handleCancel}>Anuluj</button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default withAuth(Account);
