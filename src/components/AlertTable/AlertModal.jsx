import React, { useState } from "react";
import { CSVLink } from "react-csv";
import InfoModal from "./InfoModal"; // Import PictureModal
import { FaImage, FaVideo } from "react-icons/fa"; // Icons for image and video
import "./AlertModal.scss";

const AlertModal = ({ alerts, isOpen, onClose, isToggled }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [isActive, setIsActive] = useState(false);
  if (!isOpen || !alerts) return null;

  const totalPages = Math.ceil(alerts.length / rowsPerPage);

  const handlePageChange = (newPage) => setPage(newPage);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setPage(1);
  };

  const handleSearchChange = (e) =>
    setSearchQuery(e.target.value.toLowerCase());

  const toggleFilterMenu = () => {
    setIsActive(!isActive);
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  const handleStatusChange = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.center_name.toLowerCase().includes(searchQuery) ||
      alert.camera_name.toLowerCase().includes(searchQuery) ||
      alert.location.toLowerCase().includes(searchQuery);

    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(alert.status);

    return matchesSearch && matchesStatus;
  });

  const displayedAlerts = filteredAlerts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const csvHeaders = [
    { label: "Center Name", key: "center_name" },
    { label: "Camera Name", key: "camera_name" },
    { label: "Location", key: "location" },
    { label: "Alert Type", key: "feature" },
    { label: "Time", key: "time" },
    { label: "Image", key: "image_path" },
    { label: "Video", key: "video_path" },
    { label: "Status", key: "status" },
  ];

  // Open InfoModal with the selected alert data
  const handleRowClick = (alert, index) => {
    setSelectedAlert(alert);
    setCurrentIndex(index);
    setIsPictureModalOpen(true);
  };

  const closePictureModal = () => {
    setIsPictureModalOpen(false);
    setSelectedAlert(null);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredAlerts.length);
    setSelectedAlert(
      filteredAlerts[(currentIndex + 1) % filteredAlerts.length]
    );
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredAlerts.length) % filteredAlerts.length
    );
    setSelectedAlert(
      filteredAlerts[
        (currentIndex - 1 + filteredAlerts.length) % filteredAlerts.length
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "true":
        return "green";
      case "false":
        return "red";
      case "exception":
        return "gray";
      case "pending":
        return "#f5b042";
      default:
        return "#f5b042";
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="top">
          <div>
            <h2>Alert Details</h2>
          </div>
          <div>
            <button className="close-btn" onClick={onClose}>
              X
            </button>
          </div>
        </div>

        <div className="filter-search-container">
          <input
            type="text"
            placeholder="Search Alerts"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <CSVLink
            data={displayedAlerts}
            headers={csvHeaders}
            filename={"alert-data.csv"}
          >
            <button className="export-btn">Export CSV</button>
          </CSVLink>
          <button
            className={`filter-btn ${isActive ? "active" : ""}`} // Apply 'active' class if isActive is true
            onClick={toggleFilterMenu}
          >
            Filter
          </button>
          {isFilterMenuOpen && (
            <div className="filter-menu">
              <label>
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes("true")}
                  onChange={() => handleStatusChange("true")}
                />
                True
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes("false")}
                  onChange={() => handleStatusChange("false")}
                />
                False
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes("pending")}
                  onChange={() => handleStatusChange("pending")}
                />
                Pending
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes("exception")}
                  onChange={() => handleStatusChange("exception")}
                />
                Exception
              </label>
            </div>
          )}
        </div>

        <div className="alert-modal-table">
          <table className="custom-modal-table">
            <thead>
              <tr>
                <th>Center Name</th>
                <th>Camera Name</th>
                <th>Location</th>
                <th>Alert Type</th>
                <th>Time</th>
                <th>Image</th>
                <th>Video</th>
                {!isToggled ? <th>Status</th> : null}
              </tr>
            </thead>
            <tbody>
              {displayedAlerts.length > 0 ? (
                displayedAlerts.map((alert, index) => (
                  <tr
                    key={alert.id}
                    onClick={() => handleRowClick(alert, index)}
                  >
                    <td>{alert.center_name}</td>
                    <td>{alert.camera_name}</td>
                    <td>{alert.location}</td>
                    <td>{alert.feature}</td>
                    <td>{alert.time}</td>

                    <td>
                      {alert.image_path ? (
                        <a href={alert.image_path} download>
                          <FaImage style={{ cursor: "pointer" }} />
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    <td>
                      {alert.video_path ? (
                        <a href={alert.video_path} download>
                          <FaVideo style={{ cursor: "pointer" }} />
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    {!isToggled ? (
                      <td>
                        <span
                          style={{
                            display: "inline-block",
                            width: "10px",
                            height: "10px",
                            backgroundColor: getStatusColor(alert.status),
                            borderRadius: "50%",
                            marginTop: "10px",
                            marginLeft: "10px",
                          }}
                        ></span>
                      </td>
                    ) : null}
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

        {isPictureModalOpen && selectedAlert && (
          <InfoModal
            isOpen={isPictureModalOpen}
            alert={selectedAlert}
            currentIndex={currentIndex}
            totalAlerts={filteredAlerts.length}
            onClose={closePictureModal}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
      </div>
    </div>
  );
};

export default AlertModal;
