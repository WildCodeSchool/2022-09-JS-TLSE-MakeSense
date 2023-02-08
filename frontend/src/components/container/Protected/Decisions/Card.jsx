import React from "react";
import parse from "html-react-parser";
import { Text } from "../../../../contexts/Language";

function Card({ data, user }) {
  // eslint-disable-next-line react/prop-types
  const dataContent = JSON.parse(data.content);
  const parseDescription = parse(dataContent.description);
  let decisionStatus;
  let textColor;
  if (data.status === 1) {
    decisionStatus = "En attente d'avis";
    textColor = "yellow";
  } else if (data.status === 2) {
    decisionStatus = "En attente première décision";
    textColor = "orange";
  } else if (data.status === 3) {
    decisionStatus = "En conflit";
    textColor = "red";
  } else if (data.status === 4) {
    decisionStatus = "Décision prise définitivement";
    textColor = "lime";
  } else if (data.status === 5) {
    decisionStatus = "Décision archivée";
    textColor = "fuschia";
  } else if (data.status === 6) {
    decisionStatus = "Décision non aboutie";
    textColor = "stone";
  }

  return (
    data && (
      <div className="col-span-1 text-center bg-white block max-w-md sm:max-w-sm max-h-xs p-10 my-3 sm:m-5 border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-left mb-2 text-2xl font-bold tracking-tight text-gray-900 truncate">
          {dataContent.title}
        </h2>
        <div className="flex flex-row justify-between">
          <div
            className={`bg-${textColor}-100 text-${textColor}-800 text-xs font-medium px-2.5 py-1.5 rounded-full`}
          >
            {decisionStatus}
          </div>
          <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1.5 rounded-full">
            {dataContent.dateFinaleDecision.substring(0, 10)}
          </div>
        </div>
        {data.name ? (
          <div className="bg-rose-100 text-rose-800 text-xs font-medium px-2.5 py-1.5 rounded-full max-w-max">
            {data.name}
          </div>
        ) : null}
        <p className="font-normal text-justify py-5 text-gray-700 longText">
          {parseDescription.props.children}
        </p>
        <div className="flex flex-row justify-between text-xs text-gray-400 items-baseline">
          <div>
            {user
              ? `Par ${user.firstname} ${user.lastname}`
              : `Par ${data.firstname} ${data.lastname}`}
          </div>
        </div>
      </div>
    )
  );
}

export default Card;
