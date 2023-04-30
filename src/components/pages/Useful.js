import React from "react";
const Useful = () => {
    return (
        <section
            id="hero"
            className="d-flex.align-items-center justify-content-center"
        >
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-8 mb-3">
                        <h1 className="nagl1"> Wylosuj wskazówkê na dziœ</h1>
                        <button className="button_tips">Losuj</button>
                        <div className="result_useful">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Useful;
