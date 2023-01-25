import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { Text } from "../../../../contexts/Language";

function Card({ data, user }) {
  // eslint-disable-next-line react/prop-types
  const dataContent = JSON.parse(data.content);
  const parseDescription = parse(dataContent.description);
  let decisionStatus;
  if (data.status === 1) {
    decisionStatus = "En attente d'avis";
  } else if (data.status === 2) {
    decisionStatus = "En attente première décision";
  } else if (data.status === 3) {
    decisionStatus = "En conflit";
  } else if (data.status === 4) {
    decisionStatus = "Décision prise définitivement";
  } else if (data.status === 5) {
    decisionStatus = "Décision archivée";
  } else if (data.status === 6) {
    decisionStatus = "Décision non aboutie";
  }
  return (
    <div className="col-span-1 bg-white block max-w-sm p-10 m-5 border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-left mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {dataContent.title}
      </h2>
      <div className="flex flex-row justify-between">
        <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1.5 rounded-full">
          {decisionStatus}
        </div>
        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1.5 rounded-full">
          {dataContent.dateFinaleDecision.substring(0, 10)}
        </div>
      </div>
      <p className="font-normal text-justify py-5 text-gray-700 dark:text-gray-400 longText">
        {parseDescription.props.children}
      </p>
      <div className="flex flex-row justify-between text-xs text-gray-400 items-baseline">
        <div>
          {user
            ? `Par ${user.firstname} ${user.lastname}`
            : `Par ${data.firstname} ${data.lastname}`}
        </div>
        <div className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-lg">
          <Text tid="notice" />
        </div>
      </div>
    </div>
  );
}

export default Card;
