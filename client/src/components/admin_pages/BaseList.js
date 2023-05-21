import React, { useEffect, useState } from 'react';
import Header from '../pages/Header';

const BaseList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/baseList')
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.users);
            });
    }, []);

    return (
        <div>
            <Header />
            <section id="hero" className="d-flex align-items-center justify-content-center">
                <div className="container text-center">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-8 mb-3">
                            <h1 style={{ marginTop: '40px' }}>BaseList</h1>
                            <select style={{ width: '340px', height: '50px' }}>
                                <option>Baza PZTZ</option>
                            </select>
                            <br />
                            <button style={{ width: '340px', height: '50px' }}>Wyświetl</button>
                            <div className="BLResult">                       
                                {users && users.length > 0 ? (
                                    <table className="bl_table text-center">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Login</th>
                                                <th>Imię</th>
                                                <th>Nazwisko</th>
                                                <th>Wiek</th>
                                                <th>Email</th>
                                                <th>Admin</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user.id_user}>
                                                    <td>{user.id_user}</td>
                                                    <td>{user.login}</td>
                                                    <td>{user.imie}</td>
                                                    <td>{user.nazwisko}</td>
                                                    <td>{user.wiek}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.isAdmin ? 'Tak' : 'Nie'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div>Brak danych użytkowników</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BaseList;