import React, { useState } from "react";
import "../styles/BMI.css";

export default function WaterIntakePage() {

  const [weight, setWeight] = useState("");
  const [waterIntake, setWaterIntake] = useState("");

  const calculateWaterIntake = () => {
    if (weight <= 0) {
      alert("Podaj poprawną wagę");
    } else {
      const waterIntakeValue = (weight * 0.04).toFixed(2);
      setWaterIntake(waterIntakeValue);
    }
  };

  const reset = () => {
    setWeight("");
    setWaterIntake("");
  };

  return (
    <div className="bmi_main">
      <div className="container_bmi">
        <h1>Kalkulator ilości wody do picia</h1>

        <div className="form-item">
          <label>Waga [kg]</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <button className="btn licz" onClick={calculateWaterIntake}>
          OBLICZ
        </button>
        <button className="btn reset" onClick={reset}>
          RESET
        </button>
        {waterIntake && (
          <div className="result">
            Twoje zalecane spożycie wody na dzień wynosi: {waterIntake} litrów.
          </div>
        )}
      </div>
    </div>
  );
}
