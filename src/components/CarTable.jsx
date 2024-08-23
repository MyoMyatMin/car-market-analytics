import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function CarTable({ data }) {
  return (
    <Table striped bordered hover responsive className="mt-4">
      <thead className="thead-dark">
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>Count</th>
          <th>Total Value (Baht)</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((brand) => (
          <React.Fragment key={brand}>
            <tr className="table-secondary">
              <td>{brand}</td>
              <td colSpan="3"></td>
            </tr>
            {Object.keys(data[brand].models).map((model) => (
              <tr key={`${brand}-${model}`}>
                <td></td>
                <td>{model}</td>
                <td>{data[brand].models[model].count}</td>
                <td>{data[brand].models[model].value.toLocaleString()}</td>
              </tr>
            ))}
            <tr className="table-primary">
              <td colSpan="2">Total for {brand}</td>
              <td>{data[brand].totalCount}</td>
              <td>{data[brand].totalValue.toLocaleString()}</td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
}

export default CarTable;
