import React, { useState } from "react";
import Header from './Header';

const Useful = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [randomTip, setRandomTip] = useState(localStorage.getItem('selectedTip') || "");

    const handleRandomTip = () => {
        setIsButtonDisabled(true);

        fetch('/random-tip')
            .then(response => response.json())
            .then(data => {
                if (data.tresc) {
                    setRandomTip(data.tresc);
                    // Zapisujemy wybran� wskaz�wk� w pami�ci przegl�darki
                    localStorage.setItem('selectedTip', data.tresc);

                    setTimeout(() => {
                        setIsButtonDisabled(false);
                        setRandomTip("");
                        // Usuwamy wybran� wskaz�wk� z pami�ci przegl�darki
                        localStorage.removeItem('selectedTip');
                    }, 24 * 60 * 60 * 1000);
                }
            })
            .catch(error => {
                console.error('Wyst�pi� b��d', error);
                setIsButtonDisabled(false);
            });
    };

    return (
        <div>
            <Header />
            <section id="hero" className="d-flex.align-items-center justify-content-center">
                <div className="container text-center">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-8 mb-3">
                            <h1 className="nagl1">Wylosuj wskazówkę na dnia</h1>
                            <button className="button_tips" onClick={handleRandomTip} disabled={isButtonDisabled}>Losuj</button>
                            <div className="result_useful">
                                {randomTip && <p className="p_useful">{randomTip}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Useful;
