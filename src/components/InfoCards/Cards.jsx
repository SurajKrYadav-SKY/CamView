import React from "react";
import "./Cards.scss"; // Import the custom CSS file

const cardData = [
  {
    title: "Total Cameras",
    count: 1250,
    icon: "📷", // You can replace this with an actual image or SVG
    color: "gray",
  },
  {
    title: "Total ROIs",
    count: 2700,
    icon: "✏️",
    color: "orange",
  },
  {
    title: "Entry/Exit",
    count: 150,
    icon: "🏰",
    color: "blue",
  },
  {
    title: "Server Room",
    count: 200,
    icon: "🖥️",
    color: "green",
  },
  {
    title: "Classroom",
    count: 900,
    icon: "🪑",
    color: "red",
  },
];

const Cards = () => {
  return (
    <div className="card-container">
      {cardData.map((card, index) => (
        <div key={index} className="card">
          <div className="card-content">
            <div className="card-info">
              <h4>{card.title}</h4>
              <h3>{card.count}</h3>
            </div>
            <div className="card-icon" style={{ color: card.color }}>
              {card.icon}
            </div>
          </div>
          {/* Colored line at the bottom */}
          <div
            className="card-line"
            style={{ backgroundColor: card.color }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
