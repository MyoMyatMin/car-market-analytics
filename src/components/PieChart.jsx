import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Card, Container } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

function BrandPieChart({ data }) {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF5555",
    "#A45DBE",
    "#00BFFF",
    "#FFD700",
    "#FF69B4",
    "#32CD32",
    "#FFA07A",
    "#6A5ACD",
    "#20B2AA",
    "#FF4500",
    "#2E8B57",
    "#800080",
    "#FF1493",
    "#00CED1",
    "#FF6347",
    "#B8860B",
    "#CCCCCC", // Grey color for "Others"
  ];

  const threshold = 5; // Set a threshold for including segments

  let chartData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };

  let otherValue = 0;

  Object.keys(data).forEach((brand, index) => {
    const count = data[brand].totalCount;
    if (count > threshold) {
      chartData.labels.push(brand);
      chartData.datasets[0].data.push(count);
      chartData.datasets[0].backgroundColor.push(COLORS[index % COLORS.length]);
    } else {
      otherValue += count;
    }
  });

  if (otherValue > 0) {
    chartData.labels.push("Others");
    chartData.datasets[0].data.push(otherValue);
    chartData.datasets[0].backgroundColor.push("#CCCCCC"); // Grey color for "Others"
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
      title: {
        display: true,
        text: "Car Brands Distribution",
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <Container>
      <Card className="p-3 mt-4" style={{ maxWidth: "600px" }}>
        <Doughnut data={chartData} options={options} height={300} />
      </Card>
    </Container>
  );
}

export default BrandPieChart;

// import React from "react";
// import { Doughnut } from "react-chartjs-2";
// import { Card, Container } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend, Title);

// function BrandPieChart({ data }) {
//   const COLORS = [
//     "#0088FE",
//     "#00C49F",
//     "#FFBB28",
//     "#FF8042",
//     "#FF5555",
//     "#A45DBE",
//     "#00BFFF",
//     "#FFD700",
//     "#FF69B4",
//     "#32CD32",
//     "#FFA07A",
//     "#6A5ACD",
//     "#20B2AA",
//     "#FF4500",
//     "#2E8B57",
//     "#800080",
//     "#FF1493",
//     "#00CED1",
//     "#FF6347",
//     "#B8860B",
//   ];

//   let chartData = {
//     labels: [],
//     datasets: [
//       {
//         data: [],
//         backgroundColor: [],
//       },
//     ],
//   };

//   Object.keys(data).forEach((brand, index) => {
//     const count = data[brand].totalCount;
//     chartData.labels.push(brand);
//     chartData.datasets[0].data.push(count);
//     chartData.datasets[0].backgroundColor.push(COLORS[index % COLORS.length]);
//   });

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//         labels: {
//           boxWidth: 20,
//           padding: 15,
//         },
//       },
//       title: {
//         display: true,
//         text: "Car Brands Distribution",
//         font: {
//           size: 18,
//         },
//       },
//     },
//   };

//   return (
//     <Container>
//       <Card className="p-3 mt-4" style={{ maxWidth: "400px" }}>
//         <Doughnut data={chartData} options={options} height={300} />
//       </Card>
//     </Container>
//   );
// }

// export default BrandPieChart;
