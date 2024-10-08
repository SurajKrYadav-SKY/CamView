import React from "react";
import "./HomePage.scss";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/alert_dashboard"); // Path to your dashboard
  };
  return (
    <div className="alert-dashboard-home">
      <h1>Welcome to the Alert Dashboard</h1>
      <p>
        This is your central hub for monitoring system alerts and activities.
      </p>

      <div className="dashboard-info">
        <div className="info-card">
          <h2>Live Alerts</h2>
          <p>Monitor and respond to active alerts in real-time.</p>
        </div>

        <div className="info-card">
          <h2>Alert History</h2>
          <p>Review past alerts and generate reports for analysis.</p>
        </div>

        <div className="info-card">
          <h2>System Health</h2>
          <p>Track the health and performance of your devices.</p>
        </div>
      </div>
      <div className="alert-dash-btn">
        <button onClick={handleClick}>Go to Alert Dashboard</button>
      </div>
    </div>
  );
};

export default HomePage;
