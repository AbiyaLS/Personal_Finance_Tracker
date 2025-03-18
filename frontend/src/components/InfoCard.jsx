import React from "react";
import "../style/Dashboard.css"
const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="info-card">
      <div className={`icon-circle ${color}`}>{icon}</div>
      <div className="info-text">
        <h4>{label}</h4>
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default InfoCard;
