import React, { useState } from "react";
import "./AlertTable.scss";
import AlertModal from "./AlertModal";

const AlertTable = ({ searchQuery, isToggled, rows }) => {
  // Accept searchQuery as a prop
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRowAlerts, setSelectedRowAlerts] = useState(null);
  const groupAlerts = (alerts) => {
    return alerts.reduce((grouped, currentAlert) => {
      const key = isToggled
        ? `${currentAlert.camera_name}`
        : `${currentAlert.camera_name}-${currentAlert.feature}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(currentAlert);
      return grouped;
    }, {});
  };

  const groupedAlerts = groupAlerts(rows);

  const latestAlerts = Object.keys(groupedAlerts).map((key) => {
    const alerts = groupedAlerts[key];
    return alerts.reduce((latest, current) => {
      const latestTime = new Date(`1970-01-01T${latest.time}`);
      const currentTime = new Date(`1970-01-01T${current.time}`);
      return currentTime > latestTime ? current : latest;
    });
  });

  const handleRowClick = (camera_name, feature) => {
    if (!isToggled) {
      const alertsForModal = groupedAlerts[`${camera_name}-${feature}`];
      setSelectedRowAlerts(alertsForModal);
      setModalOpen(true);
    }
  };

  const handleActionClick = (camera_name) => {
    if (isToggled) {
      const alertsForModal = groupedAlerts[`${camera_name}`]; // Grouped by camera only
      setSelectedRowAlerts(alertsForModal);
      setModalOpen(true);
      console.log("view button clicked");
      console.log(isToggled);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRowAlerts(null);
  };

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setPage(1);
  };

  // Filter rows based on search query
  const filteredRows = latestAlerts.filter(
    (row) =>
      row.center_name.toLowerCase().includes(searchQuery) ||
      row.camera_name.toLowerCase().includes(searchQuery) ||
      row.feature.toLowerCase().includes(searchQuery) ||
      row.location.toLowerCase().includes(searchQuery)
  );

  const displayedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSelectRow = (rowId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(rowId)
        ? prevSelected.filter((id) => id !== rowId)
        : [...prevSelected, rowId]
    );
  };

  const getPriorityColor = (alertsCount) => {
    if (alertsCount === 0) {
      return "#39D56F";
    } else if (alertsCount >= 1 && alertsCount <= 2) {
      return "#86ED62";
    } else if (alertsCount >= 3 && alertsCount <= 5) {
      return "#FFCD29";
    } else if (alertsCount >= 6 && alertsCount <= 10) {
      return "#FFA629";
    } else if (alertsCount > 10) {
      return "#FF7250";
    }
    return "#39D56F";
  };

  const getStatusColor = (status) => {
    switch (priority) {
      case "True":
        return "green";
      case "False":
        return "red";
      case "Exception":
        return "gray";
      case "Pending":
        return "#f5b042";
      default:
        return "Pending";
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toTimeString().split(" ")[0];
  };

  return (
    <div className="alert-table-container">
      <div className="alert-table">
        <table className="custom-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Center Name</th>
              <th>Camera Name</th>
              <th>Location</th>
              {isToggled ? (
                <>
                  <th>Alerts</th>
                  <th>Time</th>
                  <th>Action</th>
                </>
              ) : (
                <>
                  <th>Feature</th>
                  <th>Time</th>
                  <th>Priority</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {displayedRows.length > 0 ? (
              displayedRows.map((row) => (
                <tr
                  key={`${row.camera_name}-${row.feature}`}
                  onClick={() => handleRowClick(row.camera_name, row.feature)}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </td>
                  <td>{row.center_name}</td>
                  <td>{row.camera_name}</td>
                  <td>
                    {row.location} <br />
                    {row.sublocation}
                  </td>
                  {isToggled ? (
                    <>
                      <td>{row.alerts_per_camera}</td>
                      {/* <td>{row.time}</td> */}
                      <td>{formatTime(row.timestamp)}</td>
                      <td>
                        <span
                          style={{
                            padding: "5px 15px",
                            backgroundColor: "#6A94FF",
                            borderRadius: "2px",
                            cursor: "pointer",
                            color: "white",
                          }}
                          onClick={() => handleActionClick(row.camera_name)} // Action click opens modal for camera
                        >
                          {row.action}
                        </span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{row.feature}</td>
                      {/* <td>{row.timestamp}</td> */}
                      <td>{formatTime(row.timestamp)}</td>

                      <td>
                        <div
                          style={{
                            width: "18px",
                            height: "18px",
                            border: `1px solid ${getPriorityColor(
                              groupedAlerts[`${row.camera_name}-${row.feature}`]
                                .length
                            )}`,
                            backgroundColor: getPriorityColor(
                              groupedAlerts[`${row.camera_name}-${row.feature}`]
                                .length
                            ),
                            borderRadius: "2px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: getPriorityColor(
                              groupedAlerts[`${row.camera_name}-${row.feature}`]
                                .length
                            ),
                            marginTop: "10px",
                            marginLeft: "10px",
                          }}
                        >
                          .
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <label>
          Rows per page:
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            style={{ border: "none", background: "transparent" }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </label>
        <div className="pagination-controls">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            {"<"}
          </button>
          <span>
            {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
      {selectedRowAlerts && (
        <AlertModal
          alerts={selectedRowAlerts}
          isOpen={modalOpen}
          onClose={handleCloseModal}
          isToggled={isToggled}
        />
      )}
    </div>
  );
};

export default AlertTable;
