import { useEffect, useState } from "react";
import api from "@services/api";
import "../../assets/css/decisionPage.css";

function Decisions() {
  const [decisions, setDecisions] = useState(null);
  const [user, setUser] = useState();
  const [impacted, setImpacted] = useState();
  const [expert, setExpert] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const id = 4;

  const getDecisions = async () => {
    const callDecisions = await api.apigetmysql(
      `${import.meta.env.VITE_BACKEND_URL}/decisionpage/${id}`
    );
    setDecisions(callDecisions);
  };

  const getUsers = async () => {
    const callUserById = await api.apigetmysql(
      `${import.meta.env.VITE_BACKEND_URL}/users/${parseInt(
        decisions.id_user_creator,
        10
      )}`
    );
    const callImpactedById = await api.apigetmysql(
      `${import.meta.env.VITE_BACKEND_URL}/users/${parseInt(
        JSON.parse(decisions.content).impacted[0].id,
        10
      )}`
    );
    const callExpertById = await api.apigetmysql(
      `${import.meta.env.VITE_BACKEND_URL}/users/${parseInt(
        JSON.parse(decisions.content).experts[0].id,
        10
      )}`
    );
    setUser(callUserById);
    setImpacted(callImpactedById);
    setExpert(callExpertById);
    setIsLoaded(true);
  };

  useEffect(() => {
    getDecisions();
  }, [isLoaded]);

  useEffect(() => {
    getUsers();
  }, [decisions]);

  // const JSONKeys = Object.getOwnPropertyNames(JSON.parse(datas.content));

  return (
    isLoaded && (
      <div className="decisionContainer">
        <div className="decisionDetailsContainer">
          <div>
            <h1>{JSON.parse(decisions.content).title}</h1>
            <div>
              Par {user.firstname} {user.lastname}
            </div>
            <div>
              Date de création : {decisions.date_created.substring(0, 10)}
            </div>
            <div>Mis à jour : {decisions.date_update.substring(0, 10)}</div>
          </div>
          {
            // ou utiliser html-react-parser
          }
          <div>
            <details>
              <summary>Description</summary>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: JSON.parse(decisions.content).description,
                }}
              />
            </details>
            <details>
              <summary>Contexte</summary>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: JSON.parse(decisions.content).context,
                }}
              />
            </details>
            <details>
              <summary>Utilité</summary>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: JSON.parse(decisions.content).utility,
                }}
              />
            </details>
            <details>
              <summary>Avantages</summary>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: JSON.parse(decisions.content).pros,
                }}
              />
            </details>
            <details>
              <summary>Inconvénients</summary>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: JSON.parse(decisions.content).cons,
                }}
              />
            </details>
            <details>
              <summary>Avis</summary>
              <div>Les avis</div>
            </details>
          </div>
        </div>
        <div>
          <h3>Première décision prise</h3>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.parse(decisions.content).firstDecision,
            }}
          />
          <h3>Fin de la période de conflit</h3>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.parse(decisions.content).endConflict,
            }}
          />
          <h3>Décision finale</h3>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.parse(decisions.content).finaleDecision,
            }}
          />
          <h3>Personnes impactées</h3>
          <div>
            {impacted.firstname} {impacted.lastname}
          </div>
          <h3>Personnes expertes</h3>
          <div>
            {expert.firstname} {expert.lastname}
          </div>
        </div>
      </div>
    )
  );
}
export default Decisions;
