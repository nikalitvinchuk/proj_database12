import React from "react";
const BaseList = () => {
  return (
    <section
      id="hero"
      className="d-flex.align-items-center justify-content-center"
    >
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-8 mb-3">
            <h1 style={{ marginTop: "40px" }}>BaseList</h1>
            <select style={{ width: "340px", height: "50px" }}>
              <option>Baza PZTZ</option>
            </select>
            <br />
            <button style={{ width: "340px", height: "50px" }}>Wyświetl</button>
            <div
              className="BLResult"
              style={{ color: "white", marginTop: "20px" }}
            >
              Wynik
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BaseList;
