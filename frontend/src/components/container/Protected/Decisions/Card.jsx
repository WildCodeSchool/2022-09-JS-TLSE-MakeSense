import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

// eslint-disable-next-line react/prop-types

function Card({ data }) {
  // eslint-disable-next-line react/prop-types
  const dataContent = JSON.parse(data.content);
  const parseDescription = parse(dataContent.description);
  return (
    <div className="block max-w-sm p-10 m-10 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {dataContent.title}
      </h2>
      <div className="">
        <div>{data.status}</div>
        <div>{dataContent.dateFinaleDecision.substring(0, 10)}</div>
      </div>
      <div className="font-normal text-gray-700 dark:text-gray-400">
        {parseDescription.props.children}
      </div>
    </div>
  );
}

export default Card;
