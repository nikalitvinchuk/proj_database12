import React from "react";
import Header from './Header';

const LocationBase = () => {
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
                            <h1 className="nagl1"> Lokalizacje</h1>
                            <div className="location_main">
                                <h3>Wybierz kategorię obiektu</h3>
                                <select>
                                    <option>Sport</option>
                                    <option>Jedzenie Fit</option>
                                    <option>Zabiegi specjalistyczne</option>
                                </select>
                                <h3>Wybierz lokalizację</h3>
                                <select>
                                    <option>Nowy Sącz</option>
                                    <option>Kraków</option>
                                    <option>Katowice</option>
                                </select>
                                <br /> <br />
                                <button>Wyświetl</button>
                                <div className="location_result"> </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 justify-content-center"></div>
                </div>
            </section>
        </div>
    );
};

export default LocationBase;
