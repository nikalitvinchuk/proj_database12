import React, { useState } from "react";
import "../styles/BMI.css";
export default function BMIPage() {

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  let [bmimessage, setBmiMesage] = useState("");

  const calculateBmi = () => {
    if (weight <= 20 || height <= 100) {
      alert("Podaj poprawne dane");
    } else {
      const heightM = height / 100;
      const bmiValue = (weight / (heightM * heightM)).toFixed(2);
      setBmi(bmiValue);
    }
  };


  switch (true) {
    case (bmi < 16):
      bmimessage = "Jesteś wygłodzony/a";
      break;
    case (bmi >= 16 && bmi < 17):
      bmimessage = "Masz wychudzenie";
      break;
    case (bmi >= 17 && bmi < 18.5):
      bmimessage = "Masz niedowagę";
      break;
    case (bmi >= 18.5 && bmi < 25):
      bmimessage = "Twoja waga jest prawidłowa";
      break;
    case (bmi >= 25 && bmi < 30):
      bmimessage = "Masz nadwagę";
      break;
    case (bmi >= 30 && bmi < 35):
      bmimessage = "Masz otyłość pierwszego stopnia";
      break;
    case (bmi >= 35 && bmi < 40):
      bmimessage = "Masz otyłość drugiego stopnia";
      break;
    default:
      bmimessage = "Masz skrajną otyłość";
      break;
  }
  
 const reset = () => {
      setHeight(" ");
      setWeight(" ");
      setBmi("");
      setBmiMesage("");
  };
  

  return (
    <div className="bmi_main">
    <div className="container_bmi">
      <h1>BODY MASS INDEX (BMI) Kalkulator</h1>

      <div className="form-item">
        <label>Wzrost [cm]</label>
        <input
          type="number"
          value={height}
          onChange={e => setHeight(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label>Waga [kg]</label>
        <input
          type="number"
          value={weight}
          onChange={e => setWeight(e.target.value)}
        />
      </div>
      <button className="btn licz" onClick={calculateBmi}>
        OBLICZ
      </button>
      <button className="btn reset" onClick={reset}>
        RESET
      </button>
      {bmi && <div className="result">Twoje BMI wynosi: {bmi}. {bmimessage}</div>}
      
    </div>
  </div>
  );
}
