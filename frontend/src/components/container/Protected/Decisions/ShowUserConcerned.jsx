import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import api from "../../../../services/api";
import { useAuth } from "../../../../contexts/useAuth";
import { Text } from "../../../../contexts/Language";
import Spinner from "../../../Spinner";

export default function ShowUserConcerned() {
  const [decisionsWhereUserImpacted, setDecisionsWhereUserImpacted] = useState(
    []
  );
  const [decisionsWhereUserExpert, setDecisionsWhereUserExpert] = useState([]);
  const [decisionsWhereGroupImpacted, setDecisionsWhereGroupImpacted] =
    useState([]);
  const [decisionsWhereGroupExpert, setDecisionsWhereGroupExpert] = useState(
    []
  );
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
    const userImpacted = `idImpacted=${user.id}`;
    const userExpert = `idExpert=${user.id}`;
    const groupImpacted = `idUserInGroupImpacted=${user.id}`;
    const groupExpert = `idUserInGroupExpert=${user.id}`;
    /* eslint-disable no-unused-expressions */
    StatusSelect ? (status = `status=${StatusSelect}`) : (status = "");
    DureeSelect ? (duree = `duree=${DureeSelect}`) : (duree = "");
    const getDatas = async () => {
      const getDecisionsWhereUserImpacted = await api.apigetmysql(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/decisions?${status}&${duree}&${userImpacted}`
      );
      const getDecisionsWhereUserExpert = await api.apigetmysql(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/decisions?${status}&${duree}&${userExpert}`
      );
      const getDecisionsWhereGroupImpacted = await api.apigetmysql(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/decisions?${status}&${duree}&${groupImpacted}`
      );
      const getDecisionsWhereGroupExpert = await api.apigetmysql(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/decisions?${status}&${duree}&${groupExpert}`
      );
      setDecisionsWhereUserImpacted(getDecisionsWhereUserImpacted);
      setDecisionsWhereUserExpert(getDecisionsWhereUserExpert);
      setDecisionsWhereGroupImpacted(getDecisionsWhereGroupImpacted);
      setDecisionsWhereGroupExpert(getDecisionsWhereGroupExpert);
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

  return decisionsWhereUserImpacted.length ||
    decisionsWhereUserExpert.length ||
    decisionsWhereGroupImpacted.length ||
    decisionsWhereGroupExpert.length ? (
    <>
      <div className="rounded flex flex-col items-center justify-center">
        <input
          key="searchbar"
          id="searchbar"
          name="searchbar"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Rechercher une décision..."
          className="block py-4 pl-10 text-m w-10/12 sm:w-1/2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-2 focus:outline-cyan-800"
        />
        <div className="flex flex-wrap sm:flex-row sm:w-full justify-center sm:justify-between p-3">
          <div>
            <select
              value={StatusSelect || ""}
              id="select-status"
              onChange={HandlerStatus}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 my-5"
            >
              <option value="">
                {" "}
                <Text tid="alldecisions" />
              </option>
              <option value="1">
                <Text tid="waitopinion" />
              </option>
              <option value="2">
                {" "}
                <Text tid="awaitingfirstdecision" />
              </option>
              <option value="3">
                <Text tid="inconflict" />
              </option>
              <option value="4">
                <Text tid="finaldecision" />
              </option>
              <option value="5">
                <Text tid="archiveddecisions" />
              </option>
              <option value="6">
                <Text tid="unsuccessfuldecisions" />
              </option>
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
      <div className="ml-10 mr-10">
        <h1 className="text-left mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Les décisions où je suis directement impacté
        </h1>
        {decisionsWhereUserImpacted.length ? (
          <div>
            {
              // eslint-disable-next-line react/prop-types
              decisionsWhereUserImpacted
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
          </div>
        ) : (
          <div className="my-5">Il n'y a pas de décision.</div>
        )}
        <h1 className="text-left mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Les décisions où je suis expert
        </h1>
        {decisionsWhereUserExpert.length ? (
          <div>
            {
              // eslint-disable-next-line react/prop-types
              decisionsWhereUserExpert
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
          </div>
        ) : (
          <div className="my-5">Il n'y a pas de décision.</div>
        )}
        <div>
          <h1 className="text-left mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Les décisions qui impactent mes groupes
          </h1>
          {decisionsWhereGroupImpacted.length ? (
            // eslint-disable-next-line react/prop-types
            decisionsWhereGroupImpacted
              // eslint-disable-next-line react/prop-types
              .filter((decision) =>
                JSON.parse(decision.content)
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
              .map((decision) => (
                <button
                  type="button"
                  key={decision.id}
                  id={decision.id}
                  onClick={() => {
                    navigate(`/user/decisions?comp=Page&id=${decision.id}`);
                  }}
                >
                  <Card
                    key={decision.id}
                    data={decision}
                    user={user}
                    statut="groupes impactés"
                  />
                </button>
              ))
          ) : (
            <div className="my-5">Il n'y a pas de décision.</div>
          )}
        </div>
        <h1 className="text-left mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Les décisions qui ont besoin de l'expertise de mes groupes
        </h1>
        {decisionsWhereGroupExpert.length ? (
          <div>
            {
              // eslint-disable-next-line react/prop-types
              decisionsWhereGroupExpert
                // eslint-disable-next-line react/prop-types
                .filter((decision) =>
                  JSON.parse(decision.content)
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
                .map((decision) => (
                  <button
                    type="button"
                    key={decision.id}
                    id={decision.id}
                    onClick={() => {
                      navigate(`/user/decisions?comp=Page&id=${decision.id}`);
                    }}
                  >
                    <Card
                      key={decision.id}
                      data={decision}
                      user={user}
                      statut="groupes experts"
                    />
                  </button>
                ))
            }
          </div>
        ) : (
          <div className="my-5">Il n'y a pas de décision.</div>
        )}
      </div>
    </>
  ) : (
    <div className="flex flex-col justify-center items-center h-2/3">
      <p>Il n'y a pas encore de décision où je suis concerné !</p>
    </div>
  );
}
