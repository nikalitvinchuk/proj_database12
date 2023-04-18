import React from 'react';
import Logo from '../logo.png';
import { NavLink, Switch} from "react-router-dom";
const Header = () => {
    return ( 
        <header id="header" className="fixed-top">
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'#000'}}>
                <div className="container">
                <NavLink to="/" exact="True" className="navbar-brand" href="poradnia_ZTZ.html"><img src={Logo} style={{width:'55%'}} /></NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
    
                    <div className="collapse navbar-collapse" id="navContent">
                        <ul className="navbar-nav mr-auto mb-3 mb-lg 0">
                            <li className="nav-item">
                                <NavLink to="/" exact="True" className="nav-link"><i className="fa fa-home"></i> Strona główna</NavLink>
                            </li>
    
                            <li className="nav-item">
                                <NavLink to="about" className="nav-link"><i className="fa fa-users" aria-hidden="true"></i> O nas</NavLink>
                            </li>
    
                            <li className="nav-item">
                                <NavLink to="contact" className="nav-link"><i className="fa fa-envelope-open-o" aria-hidden="true"></i> Kontakt</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="account" className="nav-link"><i className="fa fa-heart-o" aria-hidden="true"></i> Moje konto</NavLink>
                            </li>
                        </ul>
                        <form action="#" className="d-flex" id="szukaj">
                            <input type="search" placeholder="Search" className="form-control mr-2" />
                            <button type="submit" className="btn btn-outline-dark">Search</button>
                        </form>
                    </div>
    
                </div>
            </nav>
        </header>

    );
}
 
export default Header;