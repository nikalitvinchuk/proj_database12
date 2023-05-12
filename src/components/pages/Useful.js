import React, { useState } from "react";
import Header from './Header';

const Useful = () => {

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const [tresc, setTip] = useState("");
    const handleRandomTip = () => {
        setIsButtonDisabled(true); // Wy³¹cza przycisk

        fetch('/random-tip')
            .then(response => response.json())
            .then(data => {
                if (data.tresc) {
                    setTip(data.tresc);
                    setTimeout(() => {
                        setIsButtonDisabled(false);
                        setTip("");
                    }, 25000); // Czas w milisekundach (25 sekund)
                }
            })

            .catch(error => {
                console.error('Wyst¹pi³ b³¹d', error);
                setIsButtonDisabled(false);
            });
    };

    return (
        <div>
            <Header />
            <section
                id="hero"
                className="d-flex.align-items-center justify-content-center"
            >
                <div className="container text-center">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-8 mb-3">
                            <h1 className="nagl1"> Wylosuj wskazowke na dzis</h1>
                            <button className="button_tips" onClick={handleRandomTip} disabled={isButtonDisabled}>Losuj</button>
                            <div className="result_useful">

                                {tresc && <p className="p_useful">{tresc}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Useful;
