import React, { useState, useEffect } from "react";
import data from "../data/taladrod-cars.json";
import CarTable from "./CarTable";
import BrandPieChart from "./PieChart";
import StackedBarChart from "./StackedBarChart";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setCars(data.Cars);
  }, []);

  const filteredCars = cars.filter((car) =>
    car.NameMMT.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const carsByBrandAndModel = processCarData(cars);
  const carsByBrandAndModelForTable = processCarData(filteredCars);

  return (
    <div className="container">
      <h1 className="my-4">Car Dashboard</h1>
        <SearchControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <CarTableSection data={carsByBrandAndModelForTable} />
        <ChartSection carsByBrandAndModel={carsByBrandAndModel} />
      </div>
  );
};

const SearchControls = ({ searchQuery, setSearchQuery }) => (
  <div className="row mb-4">
    <div className="col-md-12">
      <div className="input-group">
        <span className="input-group-text bg-primary text-white">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search cars..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  </div>
);

const CarTableSection = ({ data }) => (
  <div className="card mb-4 shadow">
    <div className="card-body">
      <h2 className="card-title">Car Table</h2>
      <CarTable data={data} />
    </div>
  </div>
);

const ChartSection = ({ carsByBrandAndModel }) => (
  <div className="row">
    <div className="col-md-6">
      <div className="card mb-4 shadow">
        <div className="card-body">
          <h3 className="card-title">Brand Distribution</h3>
          <BrandPieChart data={carsByBrandAndModel} />
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="card mb-4 shadow">
        <div className="card-body">
          <h3 className="card-title">Brand and Model Comparison</h3>
          <StackedBarChart data={carsByBrandAndModel} />
        </div>
      </div>
    </div>
  </div>
);

const processCarData = (carsData) => {
  return carsData.reduce((acc, car) => {
    const { NameMMT, Prc } = car;
    const [brand, model] = NameMMT.split(" ");
    const replaceComma = Prc.replace(/,/g, "");
    console.log(replaceComma);

    const price = parseInt(Prc.replace(/[,*]/g, ""), 10);

    if (!acc[brand]) {
      acc[brand] = { totalValue: 0, totalCount: 0, models: {} };
    }

    acc[brand].totalValue += price;
    acc[brand].totalCount += 1;

    if (!acc[brand].models[model]) {
      acc[brand].models[model] = { value: 0, count: 0 };
    }

    acc[brand].models[model].value += price;
    acc[brand].models[model].count += 1;

    return acc;
  }, {});
};

export default Dashboard;
