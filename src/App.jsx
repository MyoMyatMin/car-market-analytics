import Dashboard from "./components/Dashboard";
import HighlightedCars from "./components/HighlightedCars";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Car Market Analytics</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                to="/"
                className="text-decoration-none"
              >
                Dashboard
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link
                to="/highlighted-car"
                className="text-decoration-none"
              >
                Highlighted Cars
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route
            path="/highlighted-car"
            element={<HighlightedCars />}
          />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
