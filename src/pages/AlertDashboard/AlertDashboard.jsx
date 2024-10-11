import React, { useContext, useState, useEffect } from "react";
import "./AlertDashboard.scss";
import AlertTable from "../../components/AlertTable/AlertTable";
import LiveFeed from "../../components/LiveFeed/LiveFeed";
import { CSVLink } from "react-csv";
import { StoreContext } from "../../Context/StoreContext";
import Charts from "react-apexcharts";

const AlertDashboard = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [graphAlerts, setGraphAlerts] = useState([]);
  const [uniqueStates, setUniqueStates] = useState([]);
  const [uniqueDistricts, setUniqueDistricts] = useState([]);

  const { rows } = useContext(StoreContext);

  // // Access alert features from the environment variable
  // const allAlertFeaturesString = import.meta.env.VITE_ALERT_FEATURES;

  // // Parse the environment variable to create mapping
  // const featureMapping = allAlertFeaturesString
  //   ? allAlertFeaturesString.split(",").reduce((acc, feature) => {
  //       const [friendlyName, actualName] = feature
  //         .split(":")
  //         .map((name) => name.trim());
  //       acc[friendlyName] = actualName;
  //       return acc;
  //     }, {})
  //   : {};

  // // Extract user-friendly feature names from the mapping
  // const allAlertFeatures = Object.keys(featureMapping);

  const allAlertFeaturesArray = JSON.parse(import.meta.env.VITE_ALERT_FEATURES);

  // Create a feature mapping from the new JSON array
  const featureMapping = allAlertFeaturesArray.reduce((acc, featureObj) => {
    acc[featureObj.card_name] = featureObj.feature; // Map card_name to actual feature name
    return acc;
  }, {});

  // Extract user-friendly feature names from the mapping (card names)
  const allAlertFeatures = allAlertFeaturesArray.map(
    (featureObj) => featureObj.card_name
  );

  useEffect(() => {
    const states = [...new Set(rows.map((row) => row.state))];
    setUniqueStates(states);

    if (selectedState) {
      const districts = [
        ...new Set(
          rows
            .filter((row) => row.state === selectedState)
            .map((row) => row.district)
        ),
      ];
      setUniqueDistricts(districts);
    } else {
      const districts = [...new Set(rows.map((row) => row.district))];
      setUniqueDistricts(districts);
    }
  }, [rows, selectedState]);

  const filteredRows = React.useMemo(() => {
    return rows.filter((row) => {
      const matchesState = selectedState ? row.state === selectedState : true;
      const matchesDistrict = selectedDistrict
        ? row.district === selectedDistrict
        : true;
      const matchesStatus = selectedStatus
        ? selectedStatus === "all"
          ? true
          : row.status === selectedStatus
        : true;
      return matchesState && matchesDistrict && matchesStatus;
    });
  }, [rows, selectedState, selectedDistrict, selectedStatus]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const resetFilters = () => {
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedStatus("");
  };

  const isFilterApplied = selectedState || selectedDistrict || selectedStatus;

  const groupAlertsByFeatureAndHour = (alerts) => {
    const groupedData = {};

    alerts.forEach((alert) => {
      const { feature, timestamp } = alert;

      const alertDate = new Date(timestamp);
      const alertHour = alertDate.getHours();

      if (!groupedData[feature]) {
        groupedData[feature] = new Array(24).fill(0);
      }

      groupedData[feature][alertHour]++;
    });

    return Object.keys(groupedData).map((feature) => ({
      name: feature,
      data: groupedData[feature],
    }));
  };

  useEffect(() => {
    if (filteredRows.length) {
      const dynamicData = groupAlertsByFeatureAndHour(filteredRows);
      setGraphAlerts(dynamicData);
    }
  }, [filteredRows]);

  const [option, setOption] = useState({
    title: { text: "All alerts" },
    xaxis: {
      title: { text: "Alerts per Hours" },
      categories: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
      ],
    },
    yaxis: {
      title: { text: "No. of alerts" },
    },
  });

  const totalAlerts = filteredRows.length;

  // // Calculate feature-wise alerts using the mapping
  // const featureWiseAlerts = allAlertFeatures.reduce((acc, feature) => {
  //   const actualFeatureName = featureMapping[feature]; // Get the actual feature name from mapping
  //   acc[feature] = filteredRows.filter(
  //     (row) => row.feature === actualFeatureName
  //   ).length; // Count the alerts
  //   return acc;
  // }, {});

  const featureWiseAlerts = allAlertFeaturesArray.reduce((acc, featureObj) => {
    const { card_name, feature } = featureObj; // Extract friendly name and actual feature name
    acc[card_name] = filteredRows.filter(
      (row) => row.feature === feature
    ).length;
    return acc;
  }, {});

  // // Construct alertsData
  // const alertsData = allAlertFeatures.map((feature, index) => ({
  //   id: index + 1,
  //   message: feature,
  //   count: featureWiseAlerts[feature] || 0, // Use the count from featureWiseAlerts
  // }));

  const alertsData = allAlertFeaturesArray.map((featureObj, index) => ({
    id: index + 1,
    message: featureObj.card_name,
    count: featureWiseAlerts[featureObj.card_name] || 0,
  }));

  alertsData.unshift({ id: 0, message: "Total Alerts", count: totalAlerts });

  // //card selection logic
  // const handleCardClick = (friendlyFeatureName) => {
  //   const actualFeatureName = featureMapping[friendlyFeatureName]; // Get the actual feature name
  //   setSelectedFeatures((prevSelected) => {
  //     if (prevSelected.includes(actualFeatureName)) {
  //       return prevSelected.filter((item) => item !== actualFeatureName);
  //     } else {
  //       return [...prevSelected, actualFeatureName];
  //     }
  //   });
  // };

  const handleCardClick = (cardName) => {
    const actualFeatureName = featureMapping[cardName];
    setSelectedFeatures((prevSelected) => {
      if (prevSelected.includes(actualFeatureName)) {
        return prevSelected.filter((item) => item !== actualFeatureName);
      } else {
        return [...prevSelected, actualFeatureName];
      }
    });
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

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

  const advCsvHeaders = [
    { label: "Center Name", key: "center_name" },
    { label: "Camera Name", key: "camera_name" },
    { label: "Location", key: "location" },
    { label: "Sub Location", key: "sublocation" },
    { label: "State", key: "state" },
    { label: "District", key: "district" },
    { label: "Alert Type", key: "feature" },
    { label: "Time", key: "time" },
    { label: "Image", key: "image_path" },
    { label: "Video", key: "video_path" },
    { label: "Status", key: "status" },
  ];

  const doubleFilteredRows =
    selectedFeatures.length === 0
      ? filteredRows
      : filteredRows.filter((row) => selectedFeatures.includes(row.feature));

  // console.log("alerts data for the card : " + alertsData);

  return (
    <div className="alert-dashboard">
      <div className="filter-section">
        <button className="filter-btn" onClick={togglePopup}>
          <img
            src="./images/filter.png"
            alt="Filter Icon"
            className="filter-icon"
          />
          Filter
        </button>
        {isOpen && (
          <div className="filter-popup">
            <div className="filter-category">
              <p>FEATURE :</p>
              <label>
                <span>All</span>
                <input type="radio" name="feature" value="All" />
              </label>
              <label>
                <span>Zone Intrusion</span>
                <input type="radio" name="feature" value="Zone Intrusion" />
              </label>
              <label>
                <span>Crowd Detection</span>
                <input type="radio" name="feature" value="Zone Intrusion" />
              </label>
              <label>
                <span>Trunk Placed</span>
                <input type="radio" name="feature" value="Zone Intrusion" />
              </label>
              <label>
                <span>Trunk Opened</span>
                <input type="radio" name="feature" value="Zone Intrusion" />
              </label>
              {/* Add other feature options here */}
            </div>
            <div className="filter-category">
              <p>SUB LOCATION :</p>
              <label>
                <span>Class Room</span>
                <input type="radio" name="sub_locatin" value="Class Room" />
              </label>
              <label>
                <span>Server Room</span>
                <input type="radio" name="sub_locatin" value="Server Room" />
              </label>
              <label>
                <span>Main Gate</span>
                <input type="radio" name="sub_locatin" value="Main Gate" />
              </label>
              {/* Add other feature options here */}
            </div>

            {/* Other filter categories (sub-location, status, special alerts, etc.) */}
            <div className="filter-category">
              <p>EVENT :</p>
              <label>
                <span>All</span>
                <input type="radio" name="status" value="All" />
              </label>
              <label>
                <span>Before Entry</span>
                <input type="radio" name="status" value="Before Entry" />
              </label>
              <label>
                <span>Enrty</span>
                <input type="radio" name="status" value="Entry" />
              </label>
              <label>
                <span>During Exam</span>
                <input type="radio" name="status" value="During Entry" />
              </label>
              {/* Add other status options here */}
            </div>

            {/* Close button for popup */}
            <div className="action-btn">
              <button className="close-popup-btn" onClick={togglePopup}>
                Close
              </button>
              <button className="close-popup-btn" onClick={togglePopup}>
                Apply
              </button>
            </div>
          </div>
        )}
        <div className="search-input">
          <input
            type="text"
            placeholder="Search Alerts by State, District, Center or Feature"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="dropdown-container">
          <div className="dropdown">
            <label className={selectedState ? "active" : ""}>
              Select State
            </label>
            <select
              className="state"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="" disabled hidden></option>
              {uniqueStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
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
              disabled={!selectedState}
            >
              <option value="" disabled hidden></option>
              {uniqueDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
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
              <option value="" disabled hidden></option>
              <option value="all">All</option>
              <option value="true">True</option>
              <option value="false">False</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          {/* Conditionally render Reset Button if any filter is applied */}
          {isFilterApplied && (
            <button className="reset-button" onClick={resetFilters}>
              Reset Filters
            </button>
          )}
        </div>
      </div>
      <div className="graph-alert-section">
        <div className="graph-section">
          <p>
            <strong>Total Alerts: {totalAlerts}</strong>
          </p>
          <Charts
            type="line"
            width={750}
            height={500}
            series={graphAlerts}
            options={option}
          ></Charts>
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
                <CSVLink
                  data={rows}
                  headers={csvHeaders}
                  filename={"alert-data.csv"}
                >
                  <button className="btn primary">EXPORT</button>
                </CSVLink>
                <CSVLink
                  data={rows}
                  headers={advCsvHeaders}
                  filename={"adv-alert-data.csv"}
                >
                  <button className="btn primary">ADVANCE EXPORT</button>
                </CSVLink>

                <button className="btn primary">EDIT</button>
              </div>
            </div>
          </div>
          <div className="bottom-section">
            {alertsData.map((alert) => {
              const actualFeatureName = featureMapping[alert.message]; // Get the actual feature name

              return (
                <div
                  className={`alert-card ${
                    selectedFeatures.includes(actualFeatureName)
                      ? "selected"
                      : ""
                  }`} // Apply selected class based on the actual feature name
                  key={alert.id}
                  onClick={() => handleCardClick(alert.message)} // Pass friendly name to handleCardClick
                >
                  <p>{alert.message}</p>
                  <strong>{alert.count}</strong>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="horizontal-line"></div>
      <div className="table-image-section">
        <div className="table-section">
          <AlertTable
            searchQuery={searchQuery}
            isToggled={isToggled}
            // rows={rows}
            rows={doubleFilteredRows}
          />
          {/*  passing the search query as a prop */}
        </div>
        <div className="image-section">
          <LiveFeed />
        </div>
      </div>
    </div>
  );
};

export default AlertDashboard;
