import React, { useState } from "react";
import "../styles/BMI.css";
import Header from './Header';
import withAuth from '../../withAuth';

const BMRPage = () => {
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [activity, setActivity] = useState("");
    const [bmr, setBmr] = useState("");
    const [calories, setCalories] = useState("");

    const calculateBmr = () => {
        if (
            gender === "" ||
            height <= 100 ||
            weight <= 20 ||
            age <= 0 ||
            activity === ""
        ) {
            alert("Podaj poprawne dane");
        } else {
            let bmrValue;
            if (gender === "male") {
                bmrValue = 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age;
            } else if (gender === "female") {
                bmrValue = 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
            }
            const caloriesValue = (bmrValue * activity).toFixed(0);
            setBmr(bmrValue.toFixed(2));
            setCalories(caloriesValue);
        }
    };

    const reset = () => {
        setGender("");
        setHeight("");
        setWeight("");
        setAge("");
        setActivity("");
        setBmr("");
        setCalories("");
    };

    return (
        <div>
            <Header />
            <div class="bmi_main">
                <div class="container_bmi">
                    <h1>BASAL METABOLIC RATE (BMR) Kalkulator</h1>
                    <div class="form-item">
                        <label>Płeć:</label>
                        <select value={gender} onChange={e => setGender(e.target.value)}>
                            <option value="">Wybierz płeć</option>
                            <option value="male">Mężczyzna</option>
                            <option value="female">Kobieta</option>
                        </select>
                    </div>
                    <div class="form-item">
                        <label>Wzrost [cm]:</label>
                        <input
                            type="number"
                            value={height}
                            onChange={e => setHeight(e.target.value)}
                        />
                    </div>
                    <div class="form-item">
                        <label>Waga [kg]:</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={e => setWeight(e.target.value)}
                        />
                    </div>
                    <div class="form-item">
                        <label>Wiek:</label>
                        <input
                            type="number"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                        />
                    </div>
                    <div class="form-item">
                        <label>Aktywność fizyczna:</label>
                        <select value={activity} onChange={e => setActivity(e.target.value)}>
                            <option value="">Wybierz aktywność fizyczną</option>
                            <option value="1.2">
                                Brak aktywności fizycznej / praca siedząca
                            </option>
                            <option value="1.4">
                                Niska aktywność fizyczna / praca siedząca + 1-2 treningi w
                                tygodniu
                            </option>
                            <option value="1.6">
                                Średnia aktywność fizyczna / praca siedząca + 3-4 treningi w
                                tygodniu
                            </option>
                            <option value="1.8">
                                Wysoka aktywność fizyczna / praca fizyczna + 3-4 treningi w
                                tygodniu
                            </option>
                            <option value="2">
                                Bardzo wysoka aktywność fizyczna / praca fizyczna + codzienne
                                treningi
                            </option>
                        </select>
                    </div>
                    <button class="btn licz" onClick={calculateBmr}>
                        OBLICZ
                    </button>
                    <button class="btn reset" onClick={reset}>
                        RESET
                    </button>
                    {
                        <div class="result">
                            Twoje BMR wynosi: {bmr} kcal. Aby utrzymać wagę, powinieneś
                            spożywaćm około {calories} kcal.
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default withAuth(BMRPage);
