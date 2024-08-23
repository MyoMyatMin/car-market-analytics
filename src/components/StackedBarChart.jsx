import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, Container } from "react-bootstrap";

// Register necessary components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function StackedBarChart({ data }) {
  // Format the data for the chart
  const brands = Object.keys(data);
  const models = Array.from(
    new Set(brands.flatMap((brand) => Object.keys(data[brand].models)))
  ); // Collect all unique models

  const chartData = {
    labels: brands,
    datasets: models.map((model, index) => ({
      label: model,
      data: brands.map((brand) => data[brand].models[model]?.count || 0), // Fill with 0 if model does not exist for the brand
      backgroundColor: `hsl(${(index * 360) / models.length}, 70%, 50%)`, // Generate a color for each model
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const brand = context.label || "";
            const model = context.dataset.label || "";
            const value = context.raw || 0;
            return `${brand} - ${model}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Brands",
        },
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90,
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Counts",
        },
      },
    },
  };

  return (
    <Container>
      <div className="bg-primary text-white p-3">
        <h4 className="m-0 text-center">Brand Model Distribution</h4>
      </div>
      <div className="p-3">
        <div className="d-flex justify-content-center">
          <Bar data={chartData} options={options} height={400} width={600} />
        </div>
      </div>
      <h5 className="text-muted mt-4 text-center">
        This chart displays the distribution of different models across various
        brands.
      </h5>
    </Container>
  );
}

export default StackedBarChart;