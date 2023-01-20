import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

// eslint-disable-next-line react/prop-types

function Card({ data }) {
  // eslint-disable-next-line react/prop-types
  const dataContent = JSON.parse(data.content);
  const parseDescription = parse(dataContent.description);
  return (
    <div className="bg-black">
      <div className="body">
        <h2>{dataContent.title}</h2>
        <div>
          <div>{data.status}</div>
          <div>{dataContent.dateFinaleDecision.substring(0, 10)}</div>
          <div>{parseDescription.props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
