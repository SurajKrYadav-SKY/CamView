import React, { useState } from "react";
import "./AlertTable.scss";

const AlertTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data
  const rows = [
    {
      id: 1,
      client: "NTA",
      examName: "JEE MAINS",
      examCode: "NTAJEE24",
      dateRange: "17 Mar 24 - 27 Mar 24",
      shifts: 8,
      centres: 100,
      instances: 4,
      userId: "nta_user1",
      password: "*********",
    },
    {
      id: 2,
      client: "NTA",
      examName: "NEET",
      examCode: "NTANEET24",
      dateRange: "17 Mar 24 - 27 Mar 24",
      shifts: 2,
      centres: 110,
      instances: 4,
      userId: "nta_user2",
      password: "*********",
    },
    {
      id: 3,
      client: "SSC",
      examName: "SSC CGL",
      examCode: "SSCCGL24",
      dateRange: "01 Apr 24 - 15 Apr 24",
      shifts: 5,
      centres: 80,
      instances: 3,
      userId: "ssc_user1",
      password: "*********",
    },
    {
      id: 4,
      client: "UPSC",
      examName: "CIVIL SERVICES",
      examCode: "UPSC24",
      dateRange: "10 May 24 - 25 May 24",
      shifts: 3,
      centres: 50,
      instances: 2,
      userId: "upsc_user1",
      password: "*********",
    },
    {
      id: 5,
      client: "RBI",
      examName: "RBI GRADE B",
      examCode: "RBIGB24",
      dateRange: "05 Jun 24 - 15 Jun 24",
      shifts: 4,
      centres: 70,
      instances: 2,
      userId: "rbi_user1",
      password: "*********",
    },
    {
      id: 6,
      client: "IBPS",
      examName: "IBPS PO",
      examCode: "IBPSPO24",
      dateRange: "20 Jun 24 - 30 Jun 24",
      shifts: 6,
      centres: 90,
      instances: 3,
      userId: "ibps_user1",
      password: "*********",
    },
    {
      id: 7,
      client: "SSC",
      examName: "SSC CHSL",
      examCode: "SSCCHSL24",
      dateRange: "10 Jul 24 - 20 Jul 24",
      shifts: 3,
      centres: 60,
      instances: 2,
      userId: "ssc_user2",
      password: "*********",
    },
    {
      id: 8,
      client: "NTA",
      examName: "UGC NET",
      examCode: "NTAUGC24",
      dateRange: "01 Aug 24 - 10 Aug 24",
      shifts: 5,
      centres: 100,
      instances: 4,
      userId: "nta_user3",
      password: "*********",
    },
    {
      id: 9,
      client: "DRDO",
      examName: "DRDO MTS",
      examCode: "DRDOMTS24",
      dateRange: "15 Aug 24 - 25 Aug 24",
      shifts: 2,
      centres: 50,
      instances: 2,
      userId: "drdo_user1",
      password: "*********",
    },
    {
      id: 10,
      client: "UPSC",
      examName: "INDIAN FOREST SERVICES",
      examCode: "UPSCIFS24",
      dateRange: "01 Sep 24 - 10 Sep 24",
      shifts: 4,
      centres: 40,
      instances: 2,
      userId: "upsc_user2",
      password: "*********",
    },
    {
      id: 11,
      client: "SBI",
      examName: "SBI CLERK",
      examCode: "SBICL24",
      dateRange: "15 Sep 24 - 25 Sep 24",
      shifts: 6,
      centres: 90,
      instances: 3,
      userId: "sbi_user1",
      password: "*********",
    },
    {
      id: 12,
      client: "IBPS",
      examName: "IBPS CLERK",
      examCode: "IBPSCL24",
      dateRange: "01 Oct 24 - 15 Oct 24",
      shifts: 5,
      centres: 85,
      instances: 3,
      userId: "ibps_user2",
      password: "*********",
    },
  ];

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setPage(1); // Reset to first page when changing rows per page
  };

  const handleSelectRow = (rowId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(rowId)
        ? prevSelected.filter((id) => id !== rowId)
        : [...prevSelected, rowId]
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter data based on the search query
  const filteredRows = rows.filter(
    (row) =>
      row.examName.toLowerCase().includes(searchQuery) ||
      row.examCode.toLowerCase().includes(searchQuery)
  );

  // Paginate the filtered data
  const displayedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="alert-table-container">
      <div className="filter-search-container">
        <button className="filter-btn">Filter</button>
        <input
          type="text"
          placeholder="Search Exam by Code, Name"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* <div className="action-buttons">
          <button>Edit Exam</button>
          <button>Add Exam</button>
          <button>Delete Exam</button>
        </div> */}
      </div>

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
              <th>Feature</th>
              <th>Time</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {displayedRows.length > 0 ? (
              displayedRows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </td>
                  <td>{row.client}</td>
                  <td>{row.examName}</td>
                  <td>{row.examCode}</td>
                  <td>{row.dateRange}</td>
                  <td>{row.shifts}</td>
                  <td>{row.centres}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="no-data">
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
    </div>
  );
};

export default AlertTable;
