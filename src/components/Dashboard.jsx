import React from "react";
import CarTable from "./CarTable";
import PieChart from "./PieChart";
import HighilightedCars from "./HighlightedCars";

const Dashboard = () => {
  return (
    <div>
      <p>Dashboard</p>
      <CarTable />
      <PieChart />
      <HighilightedCars />
    </div>
  );
};

export default Dashboard;
