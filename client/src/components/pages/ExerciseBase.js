import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from './Header';
import withAuth from '../../withAuth';

const ExerciseBase = (props) => {
    const [formVisible, setFormVisible] = useState(props.formVisible);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(
        props.defaultLevel || "Początkowy"
    );
    const [exercise, setExercise] = useState("");
    const [reps, setReps] = useState(0);
    const [exercises, setExercises] = useState([]);
    const [exerciseSets, setExerciseSets] = useState([]);

    useEffect(() => {
        // pobieranie listy ćwiczeń z bazy danych
        axios
            .get("/exercises")
            .then((response) => {
                setExercises(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        // pobieranie listy zestawów z bazy danych
        axios
            .get("/exercise-sets")
            .then((response) => {
                setExerciseSets(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleLevelClick = (level) => {
        setSelectedLevel(level);
    };

    const handleExerciseChange = (event) => {
        setExercise(event.target.value);
    };

    const handleRepsChange = (event) => {
        setReps(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const showForm = () => {
        setFormVisible(true);
        setIsButtonClicked(true);
    };

    const hideForm = () => {
        setFormVisible(false);
        setIsButtonClicked(false);
    };

    // obsługa 2 x onClick dla przycisków poziomu zaawansowania
    const handleLevelClickAndHideForm = level => {
        handleLevelClick(level);
        hideForm();
    };

    return (
        <div>
            <Header />
            <section id="hero" className="d-flex align-items-center justify-content-center">
                <div className="container text-center">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-8 mb-3">
                            <h1 className="nagl1"> Wybierz poziom </h1> <br />
                            <div className="exercise_main">
                                <button onClick={() => handleLevelClickAndHideForm("Początkowy")}>
                                    Początkowy
                                </button>
                                <button onClick={() => handleLevelClickAndHideForm("Średni")}>
                                    Średni
                                </button>
                                <button onClick={() => handleLevelClickAndHideForm("Zaawansowany")}>
                                    Zaawansowany
                                </button>
                            </div>
                            {exerciseSets.map((exerciseSet, index) => {
                                if (
                                    (selectedLevel === "Początkowy" && index === 0) ||
                                    (selectedLevel === "Średni" && index === 1) ||
                                    (selectedLevel === "Zaawansowany" && index >= 2)
                                ) {
                                    return (
                                        <div className="exercise_result" key={index}>
                                            <h2 style={{ color: "white" }}>
                                                Zestawy ćwiczeń dla poziomu: {selectedLevel}
                                            </h2>
                                            <h2 style={{ color: "aqua" }}>Zestaw {index + 1}</h2>
                                            <table className="trening_list">
                                                <thead>
                                                    <tr>
                                                        <th>Nr</th>
                                                        <th>Ćwiczenie</th>
                                                        <th>Liczba powtórzeń</th>
                                                        <th>Przerwa</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {exerciseSet.map((exercise, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{exercise.exercise}</td>
                                                            <td>{exercise.repetitions}</td>
                                                            <td>{exercise.breakTime}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <button>Usuń zestaw</button>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                                    <br />
                                    {!isButtonClicked && (
                                        <button className="own_exercise_button" onClick={showForm}>
                                            Dodaj własny zestaw
                                        </button>
                                    )}
                                    <br />
                                    {formVisible && (
                                        <form onSubmit={handleSubmit}>
                                            <label htmlFor="exercise_select">
                                                Wybierz 5 kolejnych ćwiczeń:
                                            </label>
                                            <select
                                                id="exercise_select"
                                                className="exercise_select"
                                                onChange={handleExerciseChange}
                                                value={exercise}
                                            >
                                                <option value="">Wybierz ćwiczenie</option>
                                                {exercises.map(exercise => (
                                                    <option key={exercise.id} value={exercise.name}>
                                                        {exercise.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <label htmlFor="reps_input">Liczba powtórzeń:</label> <br />
                                            <input
                                                id="reps_input"
                                                type="number"
                                                min="1"
                                                value={reps}
                                                onChange={handleRepsChange}
                                            />
                                            <br /> <br />
                                            <button
                                                type="button"
                                                style={{ backgroundColor: "rgba(49, 88, 65, 0.534)" }}
                                            >
                                                Dodaj kolejne ćwiczenie
                                            </button>
                                            <button
                                                type="button"
                                                style={{ backgroundColor: "rgba(221, 40, 34, 0.534)" }}
                                                onClick={hideForm}
                                            >
                                                Anuluj
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
            </section>
        </div>
    );
};

export default withAuth(ExerciseBase);
