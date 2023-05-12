import React, { useState } from "react";
import Header from "./Header";
import withAuth from "../../withAuth";
import axios from "axios";

const Contact = () => {
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("/email", {
                title: title,
                email: email,
                message: message,
            })
            .then(() => {
                alert("Wiadomość wysłana!");
                setTitle("");
                setEmail("");
                setMessage("");
            })
            .catch((error) => {
                console.log(error);
                alert("Błąd wysyłania wiadomości");
            });
    };

    return (
        <div>
            <Header />
            <section className="main_form">
                <div className="form-box">
                    <div className="form-value">
                        <form onSubmit={handleSubmit}>
                            <h2>Wypełnij formularz</h2>
                            <div className="inputbox">
                                <input
                                    type="text"
                                    id="title_input"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <label>Tytuł</label>
                            </div>
                            <div className="inputbox">
                                <input
                                    type="text"
                                    id="password-input"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label>Email</label>
                            </div>
                            <div className="inputbox">
                                <textarea
                                    placeholder="Treść zgłoszenia"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>

                            <button type="submit">Wyślij</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default withAuth(Contact);
