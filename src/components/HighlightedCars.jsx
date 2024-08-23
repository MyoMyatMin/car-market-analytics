import React, { useState, useEffect } from "react";
import { Tabs, Tab, Button, Container, Row, Col } from "react-bootstrap";
import data from "../data/taladrod-cars.min.json";
import "bootstrap/dist/css/bootstrap.min.css";


function HighlightedCars() {
  const [highlightedCars, setHighlightedCars] = useState([]);
  const [allCars] = useState(data.Cars);
  const [activeTab, setActiveTab] = useState("All");
  const [activeAllCarsTab, setActiveAllCarsTab] = useState("All");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    try {
      const savedCars =
        JSON.parse(localStorage.getItem("highlightedCars")) || [];
      const uniqueCars = Array.from(
        new Set(savedCars.map((car) => car.Cid))
      ).map((id) => savedCars.find((car) => car.Cid === id));
      setHighlightedCars(uniqueCars);
    } catch (error) {
      console.error("Failed to load highlighted cars from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveToLocalStorage = (cars) => {
    try {
      localStorage.setItem("highlightedCars", JSON.stringify(cars));
    } catch (error) {
      console.error("Failed to save highlighted cars to localStorage", error);
    }
  };

  const addCarToHighlight = (carId) => {
    const carToAdd = allCars.find((car) => car.Cid === carId);
    if (!carToAdd) return;

    if (highlightedCars.some((car) => car.Cid === carId)) return;

    const updatedCars = [...highlightedCars, carToAdd];
    setHighlightedCars(updatedCars);
    saveToLocalStorage(updatedCars);

    const brand = carToAdd.NameMMT.split(" ")[0];
    setActiveTab(brand);
  };

  const removeCarFromHighlight = (carId) => {
    const updatedCars = highlightedCars.filter((car) => car.Cid !== carId);
    setHighlightedCars(updatedCars);
    saveToLocalStorage(updatedCars);

    const remainingBrands = [
      ...new Set(updatedCars.map((car) => car.NameMMT.split(" ")[0])),
    ];
    if (!remainingBrands.includes(activeTab)) {
      setActiveTab("All");
    }
  };

  const brands = [
    ...new Set(highlightedCars.map((car) => car.NameMMT.split(" ")[0])),
  ];

  const allBrands = [
    ...new Set(allCars.map((car) => car.NameMMT.split(" ")[0])),
  ];

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="my-4">Highlighted Cars</h1>
      {highlightedCars.length === 0 ? (
        <p>No highlighted cars yet</p>
      ) : (
        <Tabs
          id="highlighted-car-tabs"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
        >
          {brands.map((brand) => (
            <Tab eventKey={brand} title={brand} key={brand}>
              <Row className="my-4">
                {highlightedCars
                  .filter((car) => car.NameMMT.split(" ")[0] === brand)
                  .map((car) => (
                    <Col key={car.Cid} xs={12} sm={6} md={4} lg={3} className="mb-4" >
                      <table className="table table-bordered bg-light text-center" style={{ height: '100%', minHeight: '300px' }}>
  <tbody>
    <tr>
      <td colSpan="2">
        <img
          src={car.Img100}
          alt={car.NameMMT}
          className="img-fluid mb-2"
        />
      </td>
    </tr>
    <tr>
      <td colSpan="2">{car.NameMMT}</td>
    </tr>
    <tr>
      <td>Year</td>
      <td>{car.Yr}</td>
    </tr>
    <tr>
      <td>Price</td>
      <td>{car.Prc}</td>
    </tr>
    <tr>
      <td colSpan="2">
        <Button
          variant="danger"
          onClick={() => removeCarFromHighlight(car.Cid)}
        >
          Remove
        </Button>
      </td>
    </tr>
  </tbody>
</table>

                    </Col>
                  ))}
              </Row>
            </Tab>
          ))}
        </Tabs>
      )}

<h2 className="my-4">All Cars</h2>
<Tabs
  id="all-cars-tabs"
  activeKey={activeAllCarsTab}
  onSelect={(k) => setActiveAllCarsTab(k)}
  className="mb-4"
>
  <Tab eventKey="All" title="All">
    <Row className="my-4">
      {allCars.map((car) => {
        const isHighlighted = highlightedCars.some(
          (highlightedCar) => highlightedCar.Cid === car.Cid
        );
        
        return (
          <Col key={car.Cid} xs={12} sm={6} md={4} lg={3} className="d-flex">
 <table className={`table table-bordered text-center ${isHighlighted ? 'bg-success text-white' : 'bg-light'}`}>
  <tbody>
    <tr>
      <td colSpan="2">
        <img
          src={car.Img100}
          alt={car.NameMMT}
          className="img-fluid mb-2"
        />
      </td>
    </tr>
    <tr>
      <td colSpan="2">
        {car.NameMMT}
        {isHighlighted && <i className="fas fa-check-circle ml-2"></i>}
      </td>
    </tr>
    <tr>
      <td>Year</td>
      <td>{car.Yr}</td>
    </tr>
    <tr>
      <td>Price</td>
      <td>{car.Prc}</td>
    </tr>
    <tr>
      <td colSpan="2">
        <Button
          variant={isHighlighted ? "secondary" : "primary"}
          onClick={() => addCarToHighlight(car.Cid)}
          disabled={isHighlighted}
        >
          {isHighlighted ? "Highlighted" : "Highlight"}
        </Button>
      </td>
    </tr>
  </tbody>
</table>

          </Col>
        );
      })}
    </Row>
    </Tab>
     {allBrands.map((brand) => (
       <Tab eventKey={brand} title={brand} key={brand}>
        <Row className="my-4">
        {allCars
          .filter((car) => car.NameMMT.split(" ")[0] === brand)
          .map((car) => {
            const isHighlighted = highlightedCars.some(
              (highlightedCar) => highlightedCar.Cid === car.Cid
            );
            
            return (
              <Col
                key={car.Cid}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <div className={`border rounded p-3 text-center ${isHighlighted ? 'bg-success text-white' : 'bg-light'}`}>
                  <img
                    src={car.Img100}
                    alt={car.NameMMT}
                    className="img-fluid mb-2"
                  />
                  <p className="mb-1">
                    {car.NameMMT}
                    {isHighlighted && <i className="fas fa-check-circle ml-2"></i>}
                  </p>
                  <p className="mb-1">Year: {car.Yr}</p>
                  <p className="mb-1">Price: {car.Prc}</p>
                  <Button
                    variant={isHighlighted ? "secondary" : "primary"}
                    onClick={() => addCarToHighlight(car.Cid)}
                    disabled={isHighlighted}
                  >
                    {isHighlighted ? "Highlighted" : "Highlight"}
                  </Button>
                </div>
              </Col>
            );
          })}
         </Row>
       </Tab>
        ))}
      </Tabs>
    </Container>
  );
}

export default HighlightedCars;