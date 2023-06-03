import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from './Header';
import withAuth from '../../withAuth';

const ExerciseBase = (props) => {
    const [formVisible, setFormVisible] = useState(props.formVisible);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [exercise, setExercise] = useState("");
    const [repetitions, setRepetitions] = useState("");
    const [breakTime, setBreakTime] = useState("");
    const [series, setSeries] = useState("");
    const [selectedExerciseSet, setSelectedExerciseSet] = useState(null);
    const [exerciseSets, setExerciseSets] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [addedExercises, setAddedExercises] = useState([]);

    useEffect(() => {
        axios
            .get("/exercise-sets")
            .then((response) => {
                console.log(response.data)
                setExerciseSets(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleExerciseChange = (event) => {
        setExercise(event.target.value);
    };

    const handleRepetitionsChange = (event) => {
        setRepetitions(event.target.value);
    };

    const handleBreakTimeChange = (event) => {
        setBreakTime(event.target.value);
    };

    const handleSeriesChange = (event) => {
        setSeries(event.target.value);
    };

    const handleExerciseSetChange = (event) => {
        const selectedId = event.target.value;
        console.log(selectedId)
        axios.post("/get_exercises", {id: selectedId})
        .then((response) => {
            console.log(response);
            setExercises(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newExerciseSet = {
            name: exercise,
            repetitions: repetitions,
            break: breakTime,
            series: series
        };

        setAddedExercises([...addedExercises, newExerciseSet]);

        setExercise("");
        setRepetitions("");
        setBreakTime("");
        setSeries("");
    };

    const handleConfirm = (event) => {
        event.preventDefault();
        var tds = document.querySelectorAll("form table tbody tr")
        var datas = []

        for (let index = 0; index < tds.length; index++) {
            var x = tds[index];
            console.log(x.getElementsByClassName("name"))
            datas.push({
                name: x.getElementsByClassName("name")[0].innerHTML,
                reps: x.getElementsByClassName("reps")[0].innerHTML,
                break: x.getElementsByClassName("breakTime")[0].innerHTML,
                series: x.getElementsByClassName("series")[0].innerHTML
            })
        }
        console.log(datas)
        axios.post("/exercise-sets/add", {exerciseSet: datas})
        .then((response) => {
            console.log(response.data);
            setSelectedExerciseSet(response.data);
            setAddedExercises([]);
        })
        .catch((error) => {
            console.log(error);
        });
    };
    

    const showForm = () => {
        setFormVisible(true);
        setIsButtonClicked(true);
        setSelectedExerciseSet(null);
    };

    const hideForm = () => {
        setFormVisible(false);
        setIsButtonClicked(false);
        setExercise("");
        setRepetitions("");
        setBreakTime("");
        setSeries("");
    };

    return (
        <div>
            <Header />
            <section id="hero" className="d-flex align-items-center justify-content-center">
                <div className="container text-center">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-8 mb-3">
                            <h1 className="nagl1">Zestawy ćwiczeń</h1> <br />
                            <label htmlFor="exercise_set_select">Wybierz zestaw:</label>
                            <select
                                id="exercise_set_select"
                                className="exercise_set_select"
                                onChange={handleExerciseSetChange}
                                value={selectedExerciseSet ? selectedExerciseSet.id : ""}
                            >
                                <option value="">Wybierz zestaw</option>
                                {exerciseSets.map((exerciseSet) => (
                                    <option key={exerciseSet.id} value={exerciseSet.id}>
                                    {exerciseSet.id}
                                    </option>
                                ))}
                            </select>
                            <br />
                            <br />
                            {exercises.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nr</th>
                                            <th>Ćwiczenie</th>
                                            <th>Liczba powtórzeń</th>
                                            <th>Przerwa</th>
                                            <th>Serie</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {exercises.map((addedExercise, index) => (
                                                <tr key={index}>
                                                    <td className="id">{addedExercise.id}</td>
                                                    <td className="name">{addedExercise.name}</td>
                                                    <td className="reps">{addedExercise.reps}</td>
                                                    <td className="breakTime">{addedExercise.break}</td>
                                                    <td className="series">{addedExercise.series}</td>
                                                </tr>
                                            ))}
                                      

                                    </tbody>
                                </table>
                            ): "Puste"}
                            <br />
                            {!isButtonClicked && (
                                <button className="own_exercise_button" onClick={showForm}>
                                    Dodaj zestaw
                                </button>
                            )}
                            <br />
                            {formVisible && (
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="exercise_input">Ćwiczenie:</label><br />
                                    <input
                                        type="text"
                                        id="exercise_input"
                                        value={exercise}
                                        onChange={handleExerciseChange}
                                    />
                                    <br />
                                    <label htmlFor="repetitions_input">Liczba powtórzeń:</label><br />
                                    <input
                                        type="text"
                                        id="repetitions_input"
                                        value={repetitions}
                                        onChange={handleRepetitionsChange}
                                    />
                                    <br />
                                    <label htmlFor="break_input">Przerwa:</label><br />
                                    <input
                                        type="text"
                                        id="break_input"
                                        value={breakTime}
                                        onChange={handleBreakTimeChange}
                                    />
                                    <br />
                                    <label htmlFor="series_input">Serie:</label><br />
                                    <input
                                        type="text"
                                        id="series_input"
                                        value={series}
                                        onChange={handleSeriesChange}
                                    />
                                    <br />
                                    <br />
                                    <button
                                        type="submit"
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

                            {formVisible && addedExercises.length > 0 && (
                                <div>
                                    <h3>Dodane ćwiczenia:</h3>
                                    <form onSubmit={handleConfirm}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Ćwiczenie</th>
                                                <th>Liczba powtórzeń</th>
                                                <th>Przerwa</th>
                                                <th>Serie</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {addedExercises.map((addedExercise, index) => (
                                                <tr key={index}>
                                                    <td className="name">{addedExercise.name}</td>
                                                    <td className="reps">{addedExercise.repetitions}</td>
                                                    <td className="breakTime">{addedExercise.break}</td>
                                                    <td className="series">{addedExercise.series}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    
                                        <input type="submit" value="Zatwierdź" />
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default withAuth(ExerciseBase);
