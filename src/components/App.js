import React, { Component } from "react";
import "./App.css";
import Header from './pages/Header';
import Hero from './pages/Hero';
import "bootstrap/dist/css/bootstrap.min.css";
class App extends Component {
  render() {
    return ( 
        <div>
            <Header />
            <Hero />            
        </div>
    );
  }
}

export default App;
