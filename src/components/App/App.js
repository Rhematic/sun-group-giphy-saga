import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom/";
import { useEffect, useState } from "react";
import axios from "axios";

// components
import Search from "../Search/Search";
import FavoritesView from "../FavoritesView/FavoritesView";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">APIS</h1>
          <nav>
            <Link to="/">Search</Link>
            <Link to="/favorites">Favorites</Link>
          </nav>

          <h4>
            <i>APIS</i>
            <Route path="/" exact>
              <Search />
            </Route>
            <Route path="/favorites" exact>
              <FavoritesView />
            </Route>
          </h4>
        </header>
        <br />
      </div>
    </Router>
  );
}

export default App;
