// import React, { useState,useContext } from "react";
// import "./LiveFeed.scss";
// import { StoreContext } from "../../Context/StoreContext";

// const LiveFeed = () => {
//   const [select, setSelect] = useState("image");
//   const [boolean, setBoolean] = useState("true");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalContent, setModalContent] = useState(null); // Content to show in the modal

//     // CONTEXT API
//     const { rows } = useContext(StoreContext);

//   const handleClick = (type) => {
//     setSelect(type);
//   };

//   const handleClickBoolean = (type) => {
//     setBoolean(type);
//   };

//   const openModal = (content) => {
//     setModalContent(content); // Set the content (image/video) to display in the modal
//     setIsModalOpen(true); // Open the modal
//   };

//   const closeModal = () => {
//     setIsModalOpen(false); // Close the modal
//   };

//   const handleSubmit = () => {
//     // Handle submission based on the selected boolean value
//     console.log(`Submitting tab: ${boolean}`);

//     // You can perform the desired action based on the boolean value
//     if (boolean === "true") {
//       console.log("Submit TRUE alert");
//       // Add your logic for TRUE submission
//     } else if (boolean === "false") {
//       console.log("Submit FALSE alert");
//       // Add your logic for FALSE submission
//     } else if (boolean === "exception") {
//       console.log("Submit EXCEPTION alert");
//       // Add your logic for EXCEPTION submission
//     }

//     // Optionally, you can make an API call or update the state
//     // Example:
//     // fetch('/api/submit', {
//     //   method: 'POST',
//     //   body: JSON.stringify({ alertType: boolean }),
//     //   headers: { 'Content-Type': 'application/json' }
//     // })
//   };

//   return (
//     <div className="container">
//       <div className="tab-up">
//         <span
//           onClick={() => handleClick("image")}
//           className={select === "image" ? "selected" : ""}
//         >
//           IMAGE
//         </span>
//         <span
//           onClick={() => handleClick("video")}
//           className={select === "video" ? "selected" : ""}
//         >
//           VIDEO
//         </span>
//       </div>
//       <div className="display">
//         <div className="img-vid">
//           {select === "image" ? (
//             <img
//               src="./images/factory.jpeg"
//               alt="Factory"
//               onClick={() => openModal("image")}
//             />
//           ) : (
//             <video
//               src="./images/vid.mp4"
//               controls
//               onClick={() => openModal("video")}
//             >
//               Your browser does not support the video tag.
//             </video>
//           )}
//         </div>
//         <div className="info">
//           <div className="top">
//             <span>
//               Center Name : <strong>ABC Senior Sec. School</strong>
//             </span>
//           </div>
//           <div className="bottom">
//             <div className="left">
//               <span>
//                 Event Id: <strong>1</strong>
//               </span>
//               <span>
//                 Timestamp: <strong>09:00 AM</strong>
//               </span>
//               <span>
//                 Alert Type: <strong>Zone Intrusion</strong>
//               </span>
//             </div>
//             <div className="right">
//               <span>
//                 Camera Name: <strong>Camera 1</strong>
//               </span>
//               <span>
//                 Sub Location: <strong>Entry</strong>
//               </span>
//               <span>
//                 State: <strong>Delhi</strong>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="tab-down">
//         <span
//           onClick={() => handleClickBoolean("true")}
//           className={boolean === "true" ? "selected" : ""}
//         >
//           TRUE
//         </span>
//         <span
//           onClick={() => handleClickBoolean("false")}
//           className={boolean === "false" ? "selected" : ""}
//         >
//           FALSE
//         </span>
//         <span
//           onClick={() => handleClickBoolean("exception")}
//           className={boolean === "exception" ? "selected" : ""}
//         >
//           EXCEPTION
//         </span>
//       </div>
//       <div className="submit-btn">
//         <button className="btn primary" onClick={handleSubmit}>
//           Submit
//         </button>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="modal" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <span className="close" onClick={closeModal}>
//               &times;
//             </span>
//             {modalContent === "image" ? (
//               <img src="./images/factory.jpeg" alt="Factory" />
//             ) : (
//               <video src="./images/vid.mp4" controls autoPlay>
//                 Your browser does not support the video tag.
//               </video>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LiveFeed;

import React, { useState, useContext } from "react";
import "./LiveFeed.scss";
import { StoreContext } from "../../Context/StoreContext";

const LiveFeed = () => {
  const [select, setSelect] = useState("image");
  const [boolean, setBoolean] = useState("true");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); // Content to show in the modal
  const [submitted, setSubmitted] = useState(false); // State to track if the alert has been submitted

  // CONTEXT API
  // const { rows } = useContext(StoreContext);

  const { rows } = useContext(StoreContext); // Now rows will be updated dynamically

  // Get the latest alert from the rows
  const latestAlert = rows?.[rows.length - 1];

  if (!latestAlert) {
    return <div>No alerts available</div>;
  }

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

  const handleSubmit = () => {
    // Handle submission based on the selected boolean value
    console.log(`Submitting tab: ${boolean}`);

    // You can perform the desired action based on the boolean value
    if (boolean === "true") {
      console.log("Submit TRUE alert");
      // Add your logic for TRUE submission
    } else if (boolean === "false") {
      console.log("Submit FALSE alert");
      // Add your logic for FALSE submission
    } else if (boolean === "exception") {
      console.log("Submit EXCEPTION alert");
      // Add your logic for EXCEPTION submission
    }
    // Optionally, you can make an API call or update the state
    // Example:
    // fetch('/api/submit', {
    //   method: 'POST',
    //   body: JSON.stringify({ alertType: boolean }),
    //   headers: { 'Content-Type': 'application/json' }
    // })
    setSubmitted(true);
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
              src={latestAlert.image_path}
              alt={latestAlert.feature}
              onClick={() => openModal("image")}
            />
          ) : (
            <video
              src={latestAlert.video_path}
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
              Center Name : <strong>{latestAlert.center_name}</strong>
            </span>
          </div>
          <div className="bottom">
            <div className="left">
              <span>
                Event Id: <strong>{latestAlert.id}</strong>
              </span>
              <span>
                Timestamp: <strong>{latestAlert.timestamp}</strong>
              </span>
              <span>
                Alert Type: <strong>{latestAlert.feature}</strong>
              </span>
            </div>
            <div className="right">
              <span>
                Camera Name: <strong>{latestAlert.camera_name}</strong>
              </span>
              <span>
                Sub Location: <strong>{latestAlert.sublocation}</strong>
              </span>
              <span>
                State: <strong>{latestAlert.state}</strong>
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
      <div className="submit-btn">
        <button className="btn primary" onClick={handleSubmit}>
          {!submitted ? "Submit" : "Re-Submit"}
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
              <img src={latestAlert.image_path} alt="Alert Media" />
            ) : (
              <video src={latestAlert.video_path} controls autoPlay>
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
