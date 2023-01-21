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
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-10 m-10 rounded flex flex-col">
        <div className="sm:px-4 lg:px-8 rounded flex flex-col">
          <input
            key="searchbar"
            id="searchbar"
            name="searchbar"
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search..."
            className="block py-4 my-10 pl-10 text-m w-1/2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div className="flex flex-row w-full justify-between">
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
            <div>
              <button
                type="button"
                value="1"
                onClick={HandlerDuree}
                className={
                  DureeSelect === "1"
                    ? "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                    : "text-calypso bg-white border hover:bg-calypso hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
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
                    ? "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                    : "text-calypso bg-white border hover:bg-calypso hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                }
              >
                {`<Semaine`}
              </button>
              <button
                type="button"
                value="31"
                onClick={HandlerDuree}
                className={
                  DureeSelect === "31"
                    ? "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                    : "text-calypso bg-white border hover:bg-calypso hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                }
              >
                {`<Mois`}
              </button>
              <button
                type="button"
                value="93"
                onClick={HandlerDuree}
                className={
                  DureeSelect === "93"
                    ? "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                    : "text-calypso bg-white border hover:bg-calypso hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                }
              >
                {`<3Mois`}
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-3 gap-10">
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
                  className=""
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
