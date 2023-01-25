import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import api from "../../../../services/api";
import { useAuth } from "../../../../contexts/useAuth";
import { Text } from "../../../../contexts/Language";
import Spinner from "../../../Spinner";

export default function ShowUserDecisions() {
  const [datas, setDatas] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [StatusSelect, setStatusSelect] = useState(null);
  const [DureeSelect, setDureeSelect] = useState(null);

  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    // Options query
    let duree;
    let status;
    const userId = `id=${user.id}`;
    /* eslint-disable no-unused-expressions */
    StatusSelect ? (status = `status=${StatusSelect}`) : (status = "");
    DureeSelect ? (duree = `duree=${DureeSelect}`) : (duree = "");
    const getDatas = async () => {
      const decisions = await api.apigetmysql(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/decisions?${status}&${duree}&${userId}`
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
        });
      }
      setDatas(decisions);
      setIsLoaded(true);
    };
    getDatas(); // lance la fonction getDatas
  }, [isLoaded]);

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

  return datas ? (
    <>
      <div className="rounded flex flex-col items-center">
        <input
          key="searchbar"
          id="searchbar"
          name="searchbar"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Rechercher une décision..."
          className="block py-4 my-10 pl-10 text-m w-1/2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-2 focus:outline-cyan-800"
        />
        <div className="flex flex-row w-full justify-between p-3">
          <div>
            <select
              value={StatusSelect || ""}
              id="select-status"
              onChange={HandlerStatus}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
            >
              <option value="">-- Toutes les décisions --</option>
              <option value="1">En attente d'avis</option>
              <option value="2">En attente première décision</option>
              <option value="3">En conflit</option>
              <option value="4">Décision prise définitivement</option>
              <option value="5">Décisions archivées</option>
              <option value="6">Décisions non abouties</option>
            </select>
          </div>
          <div>
            <button
              type="button"
              value="1"
              onClick={HandlerDuree}
              className={
                DureeSelect === "1"
                  ? "text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2"
                  : "text-calypso bg-white opacity-1 hover:bg-calypsoLight hover:text-white font-medium rounded-lg border border-calypso text-sm px-5 py-2.5 text-center mx-2"
              }
            >
              {`< 24H`}
            </button>
            <button
              type="button"
              value="7"
              onClick={HandlerDuree}
              className={
                DureeSelect === "7"
                  ? "text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2"
                  : "text-calypso bg-white opacity-1 hover:bg-calypsoLight hover:text-white font-medium rounded-lg border border-calypso text-sm px-5 py-2.5 text-center mx-2"
              }
            >
              {`< 1 semaine`}
            </button>
            <button
              type="button"
              value="31"
              onClick={HandlerDuree}
              className={
                DureeSelect === "31"
                  ? "text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2"
                  : "text-calypso bg-white opacity-1 hover:bg-calypsoLight hover:text-white font-medium rounded-lg border border-calypso text-sm px-5 py-2.5 text-center mx-2"
              }
            >
              {`< 1 mois`}
            </button>
            <button
              type="button"
              value="93"
              onClick={HandlerDuree}
              className={
                DureeSelect === "93"
                  ? "text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2"
                  : "text-calypso bg-white opacity-1 hover:bg-calypsoLight hover:text-white font-medium rounded-lg border border-calypso text-sm px-5 py-2.5 text-center mx-2"
              }
            >
              {`< 3 mois`}
            </button>
          </div>
        </div>
      </div>
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
              <Card key={data.id} data={data} user={user} />
            </button>
          ))
      }
    </>
  ) : (
    <Spinner />
  );
}
