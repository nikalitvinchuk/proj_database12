import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Logo from '../styles/logo.png';
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

const Header = ({ isAdmin }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get('/logout')
            .then(response => {
                console.log(response.data);
                navigate('/login');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <header id="header" className="fixed-top">
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#000' }}>
                <div className="container">
                    <NavLink to="/" exact={true} className="navbar-brand"><img src={Logo} alt="" style={{ width: '55%' }} /></NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navContent">
                        <ul className="navbar-nav mr-auto mb-3 mb-lg 0">
                            <li className="nav-item">
                                <NavLink to="/" exact={true} className="nav-link"><i className="fa fa-home"></i> Strona główna</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link"><i className="fa fa-users" aria-hidden="true"></i> O nas</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact" className="nav-link"><i className="fa fa-envelope-open-o" aria-hidden="true"></i> Kontakt</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/account" className="nav-link"><i className="fa fa-heart-o" aria-hidden="true"></i> Moje konto</NavLink>
                            </li>
                            {isAdmin ? (
                                <li className="nav-item">
                                    <NavLink to="admin" className="nav-link">
                                        <i className="fa fa-heart-o" aria-hidden="true"></i> Bazy danych
                                    </NavLink>
                                </li>
                            ) : null}
                        </ul>
                        <form action="#" className="d-flex" id="wyloguj">
                            <button type="button" onClick={handleLogout} className="btn-outline-dark">Wyloguj</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
