import React from "react";
import CarTable from "./CarTable";
import PieChart from "./PieChart";
import StackedBarChart from "./StackedBarChart";

const Dashboard = () => {
  return (
    <div>
      <p>Dashboard</p>
      <CarTable />
      <PieChart />
      <StackedBarChart />
    </div>
  );
};

export default Dashboard;
