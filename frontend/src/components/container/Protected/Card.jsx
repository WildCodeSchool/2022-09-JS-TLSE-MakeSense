import React from "react";
import "@assets/css/container/protected/Decision.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Card({ data }) {
  // eslint-disable-next-line react/prop-types
  const dataContent = JSON.parse(data.content);
  return (
    <div className="Card">
      <div className="body">
        <h2>{dataContent.title}</h2>
        <p>{dataContent.description}</p>
      </div>
    </div>
  );
}

export default Card;
