import React, { useState, useEffect } from "react";
import "../../../../assets/css/layout.css";
import ShowUserDecisions from "./ShowUserDecisions";

// eslint-disable-next-line react/prop-types
function DecisionsUser() {
  const [tab, setTab] = useState("mine");

  // eslint-disable-next-line eqeqeq
  return (
    <div className="max-w-7xl mx-auto px-2 py-10 m-10 rounded flex flex-col mt-0">
      <div className="mx-auto">
        <div className="w-full flex flex-row justify-center m-5">
          <button
            type="button"
            value="myDecision"
            onClick={() => setTab("mine")}
            className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-5"
          >
            Mes décisions
          </button>
          <button
            type="button"
            value="add"
            onClick={() => setTab("concerned")}
            className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-5"
          >
            Je suis concerné
          </button>
          <button
            type="button"
            value="delete"
            onClick={() => setTab("comment")}
            className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-5"
          >
            J'ai commenté
          </button>
        </div>
        <div>{tab === "mine" && <ShowUserDecisions />}</div>
      </div>
    </div>
  );
}
export default DecisionsUser;
