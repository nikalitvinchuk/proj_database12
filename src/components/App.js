import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
//import Header from './pages/Header';
//import Hero from './pages/Hero';
//import StartPage from './pages/StartPage';
import Login from './pages/Login';
import "bootstrap/dist/css/bootstrap.min.css";
class App extends Component {
  render() {
    return ( 
      <Router>
        <div>
            {<Login/>}              
        </div>
      </Router>

  );
  }
}
export default App;

/*
        <div>
            {<Login/>}              
        </div>

        //strona startowa
*/