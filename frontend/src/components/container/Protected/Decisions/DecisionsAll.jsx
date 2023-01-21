import React, { useState, useEffect } from "react";
import api from "@services/api";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "../../../../assets/css/layout.css";

// eslint-disable-next-line react/prop-types
function DecisionsAll() {
  const navigate = useNavigate();
  const [datas, setDatas] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [StatusSelect, setStatusSelect] = useState(null);
  const [DureeSelect, setDureeSelect] = useState(null);

  useEffect(() => {
    // Options query
    let duree;
    let status;
    /* eslint-disable no-unused-expressions */
    StatusSelect ? (status = `status=${StatusSelect}`) : (status = "");
    DureeSelect ? (duree = `duree=${DureeSelect}`) : (duree = "");
    const getDatas = async () => {
      const decisions = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisions?${status}&${duree}`
      );
      if (datas === null) {
        decisions.forEach((dec) => {
          const content = JSON.parse(dec.content);
          const body = {};
          let updateStatus;
          if (new Date(content.dateOpinion) < new Date()) {
            updateStatus = api.apiputmysql(
              `${import.meta.env.VITE_BACKEND_URL}/decisions/status/${
                dec.id
              }/2`,
              body
            );
          }
          if (new Date(content.dateFirstDecision) < new Date()) {
            updateStatus = api.apiputmysql(
              `${import.meta.env.VITE_BACKEND_URL}/decisions/status/${
                dec.id
              }/3`,
              body
            );
          }
          if (new Date(content.dateEndConflict) < new Date()) {
            updateStatus = api.apiputmysql(
              `${import.meta.env.VITE_BACKEND_URL}/decisions/status/${
                dec.id
              }/4`,
              body
            );
          }
          if (new Date(content.dateFinaleDecision) < new Date()) {
            updateStatus = api.apiputmysql(
              `${import.meta.env.VITE_BACKEND_URL}/decisions/status/${
                dec.id
              }/5`,
              body
            );
          }
        });
      }
      setDatas(decisions);
      setIsLoaded(true);
    };
    getDatas(); // lance la fonction getDatas
  }, [isLoaded]);

  const [searchTerm, setSearchTerm] = useState("");
  function handleChange(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  const HandlerStatus = (event) => {
    setStatusSelect(event.target.value !== "" ? event.target.value : null);
    setIsLoaded(false);
  };
  const HandlerDuree = (event) => {
    if (DureeSelect === event.target.value) {
      setDureeSelect(null);
    } else {
      setDureeSelect(event.target.value !== "" ? event.target.value : null);
    }
    setIsLoaded(false);
  };

  return (
    isLoaded && (
      <div className="protected_layout_decisions">
        <div className="decisions_filter">
          <div>
            <input
              key="searchbar"
              id="searchbar"
              name="searchbar"
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search..."
              className="block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <select
              value={StatusSelect || ""}
              id="select-status"
              onChange={HandlerStatus}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">--Please choose an option--</option>
              <option value="1">commencée</option>
              <option value="2">1rst décision prise</option>
              <option value="3">1rst décision conflit</option>
              <option value="4">définitive</option>
              <option value="5">non aboutie</option>
              <option value="6">terminée</option>
            </select>
          </div>
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              value="1"
              onClick={HandlerDuree}
              className={
                DureeSelect === "1"
                  ? "p-10 first-letter: font-medium text-blue-700 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                  : "px-4 py-2first-letter: font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              }
            >
              {`<24H`}
            </button>
            <button
              type="button"
              value="7"
              onClick={HandlerDuree}
              className={
                DureeSelect === "7"
                  ? "px-4 py-2first-letter: font-medium text-blue-700 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                  : "px-4 py-2first-letter: font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              }
            >
              {`<Semaine`}
            </button>
            <button
              type="button"
              value="31"
              onClick={HandlerDuree}
              // className={DureeSelect === "31" ? "active" : ""}
              className={
                DureeSelect === "7"
                  ? "px-4 py-2first-letter: font-medium text-blue-700 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                  : "px-4 py-2first-letter: font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              }
            >
              {`<Mois`}
            </button>
            <button
              type="button"
              value="93"
              onClick={HandlerDuree}
              // className={DureeSelect === "93" ? "active" : ""}
              className={
                DureeSelect === "7"
                  ? "px-4 py-2first-letter: font-medium text-blue-700 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                  : "px-4 py-2first-letter: font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              }
            >
              {`<3Mois`}
            </button>
          </div>
        </div>
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Job Postings
              </h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create new job
              </button>
            </div>
          </div>
        </div>
        <div className="flex flew-row flex-wrap">
          {
            // eslint-disable-next-line react/prop-types
            datas
              // eslint-disable-next-line react/prop-types
              .filter((data) =>
                JSON.parse(data.content)
                  .title.normalize("NFD")
                  .replace(/\p{Diacritic}/gu, "")
                  .toLocaleLowerCase()
                  .includes(
                    searchTerm
                      .normalize("NFD")
                      .replace(/\p{Diacritic}/gu, "")
                      .toLocaleLowerCase()
                  )
              )
              .map((data) => (
                <button
                  type="button"
                  key={data.id}
                  id={data.id}
                  onClick={() => {
                    navigate(`/user/decisions?comp=Page&id=${data.id}`);
                  }}
                  className="bg-black"
                >
                  <Card key={data.id} data={data} />
                </button>
              ))
          }
        </div>
      </div>
    )
  );
}
export default DecisionsAll;
