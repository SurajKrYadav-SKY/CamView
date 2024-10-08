import React, { useState, useEffect } from "react";
import "./InfoModal.scss";

const InfoModal = ({
  isOpen,
  alert,
  totalAlerts,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}) => {
  const [select, setSelect] = useState("image");
  const [boolean, setBoolean] = useState("true");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [mediaData, setMediaData] = useState([]);

  useEffect(() => {
    if (alert) {
      setMediaData([
        { type: "image", src: alert.image_path },
        { type: "video", src: alert.video_path || "./images/vid.mp4" },
      ]);
    }
  }, [alert]);

  if (!isOpen || !alert) return null;

  const handleClick = (type) => {
    setSelect(type);
  };

  const handleClickBoolean = (type) => {
    setBoolean(type);
  };

  const openModal = (index) => {
    setModalContent(mediaData[index].type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    console.log(`Submitting tab: ${boolean}`);
    if (boolean === "true") {
      console.log("Submit TRUE alert");
    } else if (boolean === "false") {
      console.log("Submit FALSE alert");
    } else if (boolean === "exception") {
      console.log("Submit EXCEPTION alert");
    }
  };

  return (
    <div className="info-modal-container">
      <div className="close">
        <span className="close" onClick={onClose}>
          &times;
        </span>
      </div>
      <div className="modal-tab-up">
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
      <div className="display-info">
        <div className="img-vid">
          {select === "image" ? (
            <img
              src={mediaData[0]?.src}
              alt={alert.feature}
              onClick={() => openModal(0)}
            />
          ) : (
            <video
              src={mediaData[1]?.src}
              controls
              onClick={() => openModal(1)}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="modal-navigation">
          <button className="prev-btn" onClick={onPrevious}>
            &lt;&lt; Previous
          </button>
          <div className="countStatus">
            {currentIndex + 1}/{totalAlerts}
          </div>
          <button className="next-btn" onClick={onNext}>
            Next &gt;&gt;
          </button>
        </div>
        <div className="info">
          <div className="top">
            <span>
              Center Name : <strong>{alert.center_name}</strong>
            </span>
          </div>
          <div className="bottom">
            <div className="left">
              <span>
                Event Id: <strong>{alert.id}</strong>
              </span>
              <span>
                Timestamp: <strong>{alert.time}</strong>
              </span>
              <span>
                Alert Type: <strong>{alert.feature}</strong>
              </span>
            </div>
            <div className="right">
              <span>
                Camera Name: <strong>{alert.camera_name}</strong>
              </span>
              <span>
                Sub Location: <strong>{alert.sub_location}</strong>
              </span>
              <span>
                Location: <strong>{alert.location}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-tab-down">
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
      <div className="modal-submit-btn">
        <button className="btn primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {modalContent === "image" ? (
              <img src={mediaData[0]?.src} alt="image-not-found" />
            ) : (
              <video src={mediaData[currentIndex]?.src} controls autoPlay>
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoModal;
