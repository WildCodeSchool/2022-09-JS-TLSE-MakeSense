import React, { useState } from "react";
import { Text } from "../../../../contexts/Language";
import "../../../../assets/css/layout.css";
import ShowUserComment from "./ShowUserComment";
import ShowUserConcerned from "./ShowUserConcerned";
import ShowUserDecisions from "./ShowUserDecisions";
import ShowAllDecisions from "./ShowAllDecisions";

// eslint-disable-next-line react/prop-types
function DecisionsAll() {
  const [tab, setTab] = useState("all");

  return (
    <div className="mx-auto px-2 rounded flex flex-col mt-0">
      <div className="">
        <div className="mx-auto">
          <div className="w-11/12 flex sm:flex-row sm:justify-center flex-col m-5">
            <button
              type="button"
              value="allDecisions"
              onClick={() => setTab("all")}
              className={
                tab === "all"
                  ? "text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
                  : "text-calypso bg-white opacity-1 hover:bg-calypsoLight hover:text-white font-medium rounded-lg border border-calypso text-sm px-5 py-2.5 text-center m-2"
              }
            >
              <Text tid="alldecisions" />
            </button>
            <button
              type="button"
              value="myDecision"
              onClick={() => setTab("mine")}
              className={
                tab === "mine"
                  ? "text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
                  : "text-calypso bg-white opacity-1 hover:bg-calypsoLight hover:text-white font-medium rounded-lg border border-calypso text-sm px-5 py-2.5 text-center m-2"
              }
            >
              <Text tid="mydecisions" />
            </button>
            <button
              type="button"
              value="add"
              onClick={() => setTab("concerned")}
              className={
                tab === "concerned"
                  ? "text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
                  : "text-calypso bg-white opacity-1 hover:bg-calypsoLight hover:text-white font-medium rounded-lg border border-calypso text-sm px-5 py-2.5 text-center m-2"
              }
            >
              <Text tid="iamconcerned" />
            </button>
            <button
              type="button"
              value="delete"
              onClick={() => setTab("comment")}
              className={
                tab === "comment"
                  ? "text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
                  : "text-calypso bg-white opacity-1 hover:bg-calypsoLight hover:text-white font-medium rounded-lg border border-calypso text-sm px-5 py-2.5 text-center m-2"
              }
            >
              <Text tid="icommented" />
            </button>
          </div>
          <div>{tab === "all" && <ShowAllDecisions />}</div>
          <div>{tab === "mine" && <ShowUserDecisions />}</div>
          <div>{tab === "concerned" && <ShowUserConcerned />}</div>
          <div>{tab === "comment" && <ShowUserComment />}</div>
        </div>
      </div>
    </div>
  );
}
export default DecisionsAll;
