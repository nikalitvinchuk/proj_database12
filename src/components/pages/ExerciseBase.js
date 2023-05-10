import React, { useState } from "react";
import Header from './Header';
import withAuth from '../../withAuth';

//funkcje obsługujące dodatkowy formularz do wprowadzenia swoich danych
const ExerciseBase = props => {
    const [formVisible, setFormVisible] = useState(props.formVisible);

    function ExerciseForm() {
        const [formVisible, setFormVisible] = useState(false);
    }

    //obsługa przycisku Dodaj zestaw
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const showForm = () => {
        setFormVisible(true);
        setIsButtonClicked(true);
    };

    const hideForm = () => {
        setFormVisible(false);
        setIsButtonClicked(false);
    };

    const [selectedLevel, setSelectedLevel] = useState(
        props.defaultLevel || "Początkowy"
    );
    const handleLevelClick = level => {
        setSelectedLevel(level);
    };

    const [exercise, setExercise] = useState(""); // dodajemy stan dla wybranego ćwiczenia
    const [reps, setReps] = useState(0); // dodajemy stan dla liczby powtórzeń

    const exercises = [
        // tworzymy listę dostępnych ćwiczeń
        { id: "1", name: "Brzuszki" },
        { id: "2", name: "Przysiady" },
        { id: "3", name: "Deska" },
        { id: "4", name: "Podciąganie" },
        { id: "5", name: "Pompki" }
    ];

    const handleSubmit = event => {
        // funkcja obsługująca przesłanie formularza
        event.preventDefault();
        console.log(`Wybrane ćwiczenie: ${exercise}, liczba powtórzeń: ${reps}`);
    };

    const handleExerciseChange = event => {
        // funkcja obsługująca zmianę wybranego ćwiczenia
        setExercise(event.target.value);
    };

    const handleRepsChange = event => {
        // funkcja obsługująca zmianę liczby powtórzeń
        setReps(event.target.value);
    };

    // macierz przykładowych wyświetlanych zestawów
    const exerciseSets = [
        [
            { exercise: "Pompki", repetitions: 10, breakTime: "1 min" },
            { exercise: "Przysiady", repetitions: 15, breakTime: "1 min" },
            { exercise: "Brzuszki", repetitions: 20, breakTime: "1 min" }
        ],
        [
            { exercise: "Podciąganie na drążku", repetitions: 8, breakTime: "2 min" },
            {
                exercise: "Przysiady z obciążeniem",
                repetitions: 12,
                breakTime: "2 min"
            },
            { exercise: "Plank", repetitions: "max", breakTime: "2 min" }
        ],
        [
            { exercise: "Muscle up", repetitions: 5, breakTime: "3 min" },
            { exercise: "Pistol squat", repetitions: 10, breakTime: "3 min" },
            { exercise: "Hollow body hold", repetitions: "max", breakTime: "3 min" }
        ],
        [
            { exercise: "Podnoszenie ciężaru", repetitions: 5, breakTime: "3 min" },
            { exercise: "Brzuszki", repetitions: 10, breakTime: "3 min" },
            { exercise: "Bieg na miejscu", repetitions: "10 min", breakTime: "3 min" }
        ]
    ];

    // obsługa 2 x onClick dla przycisków poziomu zaawansowania
    const handleLevelClickAndHideForm = level => {
        handleLevelClick(level);
        hideForm();
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
                            <h1 className="nagl1"> Wybierz poziom </h1> <br />
                            <div className="exercise_main">
                                <button onClick={() => handleLevelClickAndHideForm("Początkowy")}>
                                    Początkowy
                                </button>
                                <button onClick={() => handleLevelClickAndHideForm("Średni")}>
                                    Średni
                                </button>
                                <button
                                    onClick={() => handleLevelClickAndHideForm("Zaawansowany")}
                                >
                                    Zaawansowany
                                </button>
                            </div>
                            <div className="exercise_result">
                                <div className="trening_list center-table">
                                    {exerciseSets.map((exerciseSet, index) => {
                                        if (selectedLevel === "Początkowy" && index === 0) {
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
                                        } else if (selectedLevel === "Średni" && index === 1) {
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
                                        } else if (selectedLevel === "Zaawansowany" && index >= 2) {
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
                    </div>
                </div>
            </section>
        </div>
    );
};

export default withAuth(ExerciseBase);
