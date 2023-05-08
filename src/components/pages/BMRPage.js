import React from "react";
import "../styles/BMI.css";
import Header from './Header';

export default function BMRPage () {

    return (
    <div>
        <Header />  
        <div class="bmi_main">
          <div class="container_bmi">
            <h1>BASAL METABOLIC RATE (BMR) Kalkulator</h1>
            <div class="form-item">
              <label>Płeć:</label>
              <select>
                <option value="">Wybierz płeć</option>
                <option value="male">Mężczyzna</option>
                <option value="female">Kobieta</option>
              </select>
            </div>
            <div class="form-item">
              <label>Wzrost [cm]:</label>
              <input type="number" />
            </div>
            <div class="form-item">
              <label>Waga [kg]:</label>
              <input type="number" />
            </div>
            <div class="form-item">
              <label>Wiek:</label>
              <input type="number" />
            </div>
            <div class="form-item">
              <label>Aktywność fizyczna:</label>
              <select >
                <option value="">Wybierz aktywność fizyczną</option>
                <option value="1.2">Brak aktywności fizycznej / praca siedząca</option>
                <option value="1.4">Niska aktywność fizyczna / praca siedząca + 1-2 treningi w tygodniu</option>
                <option value="1.6">Średnia aktywność fizyczna / praca siedząca + 3-4 treningi w tygodniu</option>
                <option value="1.8">Wysoka aktywność fizyczna / praca fizyczna + 3-4 treningi w tygodniu</option>
                <option value="2">Bardzo wysoka aktywność fizyczna / praca fizyczna + codzienne treningi</option>
              </select>
            </div>
            <button class="btn licz">
              OBLICZ
            </button>
            <button class="btn reset">
              RESET
            </button>
            { (
              <div class="result">
                Twoje BMR wynosi:  kcal. Aby utrzymać wagę, powinieneś spożywaćm  około  kcal.
              </div>
            )}
          </div>
            </div>
    </div>
  );
        }  