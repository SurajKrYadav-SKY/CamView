import React, { useState } from "react";
import "./LiveFeed.scss";

const LiveFeed = () => {
  const [select, setSelect] = useState("image");
  const [boolean, setBoolean] = useState("true");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); // Content to show in the modal

  const handleClick = (type) => {
    setSelect(type);
  };

  const handleClickBoolean = (type) => {
    setBoolean(type);
  };

  const openModal = (content) => {
    setModalContent(content); // Set the content (image/video) to display in the modal
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="container">
      <div className="tab-up">
        <span
          onClick={() => handleClick("image")}
          className={select === "image" ? "selected" : ""}
        >
          IMAGE
        </span>
        <span
          onClick={() => handleClick("video")}
          className={select === "video" ? "selected" : ""}
        >
          VIDEO
        </span>
      </div>
      <div className="display">
        <div className="img-vid">
          {select === "image" ? (
            <img
              src="./images/factory.jpeg"
              alt="Factory"
              onClick={() => openModal("image")}
            />
          ) : (
            <video
              src="./images/vid.mp4"
              controls
              onClick={() => openModal("video")}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="info">
          <div className="top">
            <span>
              Center Name : <strong>ABC Senior Sec. School</strong>
            </span>
          </div>
          <div className="bottom">
            <div className="left">
              <span>
                Event Id: <strong>1</strong>
              </span>
              <span>
                Timestamp: <strong>09:00 AM</strong>
              </span>
              <span>
                Alert Type: <strong>Zone Intrusion</strong>
              </span>
            </div>
            <div className="right">
              <span>
                Camera Name: <strong>Camera 1</strong>
              </span>
              <span>
                Sub Location: <strong>Entry</strong>
              </span>
              <span>
                State: <strong>Delhi</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-down">
        <span
          onClick={() => handleClickBoolean("true")}
          className={boolean === "true" ? "selected" : ""}
        >
          TRUE
        </span>
        <span
          onClick={() => handleClickBoolean("false")}
          className={boolean === "false" ? "selected" : ""}
        >
          FALSE
        </span>
        <span
          onClick={() => handleClickBoolean("exception")}
          className={boolean === "exception" ? "selected" : ""}
        >
          EXCEPTION
        </span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {modalContent === "image" ? (
              <img src="./images/factory.jpeg" alt="Factory" />
            ) : (
              <video src="./images/vid.mp4" controls autoPlay>
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveFeed;
