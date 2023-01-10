import { useEffect, useState } from "react";
import api from "@services/api";
import "../../assets/css/decisionPage.css";
import CommentSection from "@components/header/CommentSection";

function Decisions() {
  const [decisions, setDecisions] = useState(null);
  const [user, setUser] = useState();
  const [impacted, setImpacted] = useState();
  const [expert, setExpert] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const id = 24;

  const getDecisions = async () => {
    // get the decision
    const callDecisions = await api.apigetmysql(
      `${import.meta.env.VITE_BACKEND_URL}/decisionpage/${id}`
    );
    setDecisions(callDecisions);
  };

  // get users (writer, impacted, experts) by id
  const getUsers = async () => {
    const callUserById = await api.apigetmysql(
      `${import.meta.env.VITE_BACKEND_URL}/users/${parseInt(
        decisions.id_user_creator,
        10
      )}`
    );
    // const callImpactedById = await api.apigetmysql(
    //   `${import.meta.env.VITE_BACKEND_URL}/users/${parseInt(
    //     JSON.parse(decisions.content).impacted[0].id,
    //     10
    //   )}`
    // );
    // const callExpertById = await api.apigetmysql(
    //   `${import.meta.env.VITE_BACKEND_URL}/users/${parseInt(
    //     JSON.parse(decisions.content).experts[0].id,
    //     10
    //   )}`
    // );

    setUser(callUserById);
    setImpacted(JSON.parse(decisions.content).impacted);
    setExpert(JSON.parse(decisions.content).experts);
    setIsLoaded(true);
  };

  useEffect(() => {
    getDecisions();
  }, [isLoaded]);
  useEffect(() => {
    getUsers();
  }, [decisions]);

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
            <CommentSection id={id} />
          </div>
        </div>
        <div>
          <h3>Première décision prise</h3>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.parse(decisions.content).firstDecision.substring(
                0,
                10
              ),
            }}
          />
          <h3>Fin de la période de conflit</h3>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.parse(decisions.content).endConflict.substring(
                0,
                10
              ),
            }}
          />
          <h3>Décision finale</h3>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.parse(decisions.content).finaleDecision.substring(
                0,
                10
              ),
            }}
          />
          <h3>Personnes impactées</h3>
          <div>
            {impacted.map((person) => (
              <div>{person.text}</div>
            ))}
          </div>
          <h3>Personnes expertes</h3>
          <div>
            {expert.map((person) => (
              <div>{person.text}</div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
export default Decisions;
