import React from "react";
import "@assets/css/container/protected/Decision.css";

// eslint-disable-next-line react/prop-types
function Card({ data, content }) {
  return (
    <div className="Card">
      <div className="body">
        <h2>{data}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default Card;
