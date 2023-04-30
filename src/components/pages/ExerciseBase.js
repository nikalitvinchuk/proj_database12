import React from "react";
const ExerciseBase = () => {
    return (
        <section
            id="hero"
            className="d-flex.align-items-center justify-content-center"
        >
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-8 mb-3">
                        <h1 className="nagl1"> Zestawy ćwiczeń</h1>
                        <h3>Wybierz poziom zaawansowania</h3>
                        <div className="exercise_main">
                            <br />
                            <select>
                                <option>Początkowy</option>
                                <option>Średni</option>
                                <option>Zaawansowany</option>
                            </select> <br />
                            <button>Wyświetl</button>
                            <div className="trening_list center-table">
                                <table>
                                    <tr>
                                        <td>Nr</td>
                                        <td>Ćwiczenie</td>
                                        <td>Liczba powtórzeń</td>
                                        <td>Przerwa</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td></td>
                                        <td></td>
                                        <td>5 min</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td></td>
                                        <td></td>
                                        <td>5 min</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td></td>
                                        <td></td>
                                        <td>5 min</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td></td>
                                        <td></td>
                                        <td>5 min</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td></td>
                                        <td></td>
                                        <td>Koniec</td>
                                    </tr>
                                </table>
                            </div>
                            <br />
                            <button>Resetuj</button> <br />
                        </div>

                    </div>
                </div>

                <div className="row mt-5 justify-content-center"></div>
            </div>
        </section>
    );
};

export default ExerciseBase;
