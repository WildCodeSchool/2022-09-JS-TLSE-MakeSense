import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function Card({ data }) {
  // eslint-disable-next-line react/prop-types
  const dataContent = JSON.parse(data.content);
  const parseDescription = parse(dataContent.description);
  return (
    <div className="col-span-1 bg-white block max-w-sm p-10 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h2 className="text-left mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {dataContent.title}
      </h2>
      <div className="flex flex-row justify-between">
        <div>{data.status}</div>
        <div className="bg-blue-100 text-blue-800 text-m font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          {dataContent.dateFinaleDecision.substring(0, 10)}
        </div>
      </div>
      <p className="font-normal text-justify py-5 text-gray-700 dark:text-gray-400 longText">
        {parseDescription.props.children > 25
          ? parseDescription.props.children.substring(0, 25)
          : parseDescription.props.children}
      </p>
      <div className="flex flex-row justify-between">
        <div>{data.id_user_creator}</div>
        <div className="bg-green-100 text-green-800 text-m font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
          avis
        </div>
      </div>
    </div>
  );
}

export default Card;
