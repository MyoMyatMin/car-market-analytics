import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import HighlightedCars from "./components/HighlightedCars";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">DASHBOARD</Link>
            </li>
            <li>
              <Link to="/highlightedcars">Highlighted Cars</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/highlightedcars" element={<HighlightedCars />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
