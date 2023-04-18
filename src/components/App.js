import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from './pages/Header';
import Hero from './pages/Hero';
import "bootstrap/dist/css/bootstrap.min.css";
class App extends Component {
  render() {
    return ( 
      <Router>
        <div>
            {<Header/>}
            {<Hero/>}                
        </div>
      </Router>
  );
  }
}
export default App;
