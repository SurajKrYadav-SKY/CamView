import React, { useState } from "react";
import "./AlertDashboard.scss";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import AlertTable from "../../components/AlertTable/AlertTable";
import LiveFeed from "../../components/LiveFeed/LiveFeed";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const alertsData = [
  { id: 1, message: "Total Alerts", count: 500 },
  { id: 2, message: "Zone Intrusion", count: 12 },
  { id: 3, message: "Trunk Placed", count: 20 },
  { id: 4, message: "Trunk Tamper", count: 8 },
  { id: 5, message: "Loitering", count: 3 },
  { id: 6, message: "Crowd Detection", count: 3 },
  { id: 7, message: "Camera Fault", count: 3 },
  { id: 8, message: "Trunk Detection", count: 3 },
];

const AlertDashboard = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value); // Update to selectedDistrict
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value); // Update to selectedStatus
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const data = {
    labels: [
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
    ],
    datasets: [
      {
        label: "Zone Intrusion",
        data: [20, 30, 25, 40, 35, 29, 25, 30, 40],
        borderColor: "#4b2ee6",
        backgroundColor: "rgba(75, 46, 230, 0.1)",
        pointBorderColor: "#4b2ee6",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 6,
        tension: 0.1,
      },
      {
        label: "Crowd Detection",
        data: [15, 10, 20, 25, 30, 15, 20, 15, 10],
        borderColor: "#b385e6",
        backgroundColor: "rgba(179, 133, 230, 0.1)",
        pointBorderColor: "#b385e6",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 6,
        tension: 0.1,
      },
      {
        label: "Trunk Detection",
        data: [30, 40, 35, 45, 40, 35, 29, 25, 50],
        borderColor: "#36d3e9",
        backgroundColor: "rgba(54, 211, 233, 0.1)",
        pointBorderColor: "#36d3e9",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 6,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "#2e2e48",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 4,
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#eee",
        },
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="alert-dashboard">
      <div className="filter-section">
        <button className="filter-btn">
          <img
            src="./images/filter.png"
            alt="Filter Icon"
            className="filter-icon"
          />
          Filter
        </button>
        <div className="search-input">
          <input
            type="text"
            placeholder="Search Alerts by State, District, Center or Feature"
          />
        </div>
        <div className="dropdown-container">
          {/* <div className="dropdown">
            <select>
              <option value="">Select State</option>
              <option value="option1">Uttar Pradesh</option>
              <option value="option2">Andhra Pradesh</option>
              <option value="option3">Haryana</option>
            </select>
          </div>

          <div className="dropdown">
            <select>
              <option value="">Select District</option>
              <option value="District 1">District 1</option>
              <option value="District 2">District 2</option>
              <option value="District 3">District 3</option>
            </select>
          </div>
          <div className="dropdown">
            <select>
              <option value="">All/True/False/Pending</option>
              <option value="all">All</option>
              <option value="true">True</option>
              <option value="false">False</option>
              <option value="pending">Pending</option>
            </select>
          </div> */}
          <div className="dropdown">
            <label className={selectedState ? "active" : ""}>
              Select State
            </label>
            <select
              className="state"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="" disabled hidden></option> {/* Placeholder */}
              <option value="option1">Uttar Pradesh</option>
              <option value="option2">Andhra Pradesh</option>
              <option value="option3">Haryana</option>
            </select>
          </div>
          <div className="dropdown">
            <label className={selectedDistrict ? "active" : ""}>
              Select District
            </label>
            <select
              className="district"
              value={selectedDistrict}
              onChange={handleDistrictChange}
            >
              <option value="" disabled hidden></option> {/* Placeholder */}
              <option value="District 1">District 1</option>
              <option value="District 2">District 2</option>
              <option value="District 3">District 3</option>
            </select>
          </div>
          <div className="dropdown">
            <label className={selectedStatus ? "active" : ""}>
              All/True/False/Pending
            </label>
            <select
              className="status"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="" disabled hidden></option>{" "}
              <option value="all">All</option>
              <option value="true">True</option>
              <option value="false">False</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>
      <div className="graph-alert-section">
        <div className="graph-section">
          <h3>Alerts</h3>
          <p>
            <strong>Total: 1162</strong>
          </p>
          <Line data={data} options={options} />
        </div>
        <div className="alerts-section">
          <div className="top-section">
            <div className="toggle-buttons-container">
              <div className="toggle-button">
                <span>Feature</span>
                <div
                  className={`toggle ${isToggled ? "active" : ""}`}
                  onClick={handleToggle}
                >
                  <div className="toggle-circle"></div>
                </div>
                <span>Camera</span>
              </div>

              <div className="action-buttons">
                <button className="btn primary">EXPORT</button>
                <button className="btn primary">ADVANCE EXPORT</button>
                <button className="btn primary">EDIT</button>
              </div>
            </div>
          </div>
          <div className="bottom-section">
            {alertsData.map((alert, index) => (
              <div className="alert-card" key={index}>
                <p>{alert.message}</p>
                <strong>{alert.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="horizontal-line"></div>
      <div className="table-image-section">
        <div className="table-section">
          <AlertTable />
        </div>
        <div className="image-section">
          <LiveFeed />
        </div>
      </div>
    </div>
  );
};

export default AlertDashboard;
