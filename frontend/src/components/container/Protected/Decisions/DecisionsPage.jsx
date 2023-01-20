import { useEffect, useState } from "react";
import api from "@services/api";
import "@assets/css/container/protected/DecisionPage.css";
import CommentSection from "@components/header/CommentSection";
import { useLocation } from "react-router-dom";
import Spinner from "@components/Spinner";

function DecisionsPage() {
  const [decisions, setDecisions] = useState(null);
  const [impacted, setImpacted] = useState();
  const [expert, setExpert] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [comments, setComments] = useState();
  const [modifDecision, setModifDecision] = useState(false);
  const [descriptionData, setDescriptionData] = useState();
  const [contextData, setContextData] = useState();
  const [utilityData, setUtilityData] = useState();
  const [advantagesData, setAdvantagesData] = useState();
  const [inconvenientsData, setInconvenientsData] = useState();

  const URLParam = useLocation().search;
  const id = new URLSearchParams(URLParam).get("id")
    ? new URLSearchParams(URLParam).get("id")
    : "";

  useEffect(() => {
    const getAllApis = async () => {
      // get the decision
      const callDecisions = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`
      );
      setDecisions(callDecisions);
      setImpacted(JSON.parse(callDecisions.content).impacted);
      setExpert(JSON.parse(callDecisions.content).experts);
      setIsLoaded(true);
    };
    getAllApis();
  }, []);

  useEffect(() => {
    const getDecisionData = async () => {
      const getDecision = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`
      );
      setDescriptionData(getDecisionData.description);
      setContextData(getDecisionData.context);
      setUtilityData(getDecisionData.utility);
      setAdvantagesData(getDecisionData.advantages);
      setInconvenientsData(getDecisionData.inconvenients);
    };
    getDecisionData(); // lance la fonction getDecisionData
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    setModifDecision(true);
  };

  return isLoaded ? (
    <div className="decisionContainer">
      <div className="decisionDetailsContainer">
        <div>
          <h1>{JSON.parse(decisions.content).title}</h1>
          <div>
            Par {decisions.firstname} {decisions.lastname}
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
            <input
              type="text"
              id="description"
              name="description"
              defaultValue={decisions.content}
            />
            <button type="button">Modifier la descritpion</button>
          </details>
          <details>
            <summary>Contexte</summary>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.parse(decisions.content).context,
              }}
            />
            <button type="button">Modifier le contexte</button>
          </details>
          <details>
            <summary>Utilité</summary>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.parse(decisions.content).utility,
              }}
            />
            <button type="button">Modifier l'utilité</button>
          </details>
          <details>
            <summary>Avantages</summary>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.parse(decisions.content).pros,
              }}
            />
            <button type="button">Modifier les avantages</button>
          </details>
          <details>
            <summary>Inconvénients</summary>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.parse(decisions.content).cons,
              }}
            />
            <button type="button">Modifier les inconvénients</button>
          </details>
          <CommentSection
            id={id}
            comments={comments}
            setComments={setComments}
          />
        </div>
      </div>
      <div>
        {JSON.parse(decisions.content).firstDecision ? (
          <>
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
          </>
        ) : null}
        {JSON.parse(decisions.content).endConflict ? (
          <>
            <h3>Fin de la période de conflit</h3>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.parse(decisions.content).firstDecision.substring(
                  0,
                  10
                ),
              }}
            />
          </>
        ) : null}
        {JSON.parse(decisions.content).finaleDecision ? (
          <>
            <h3>Décision finale</h3>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.parse(decisions.content).firstDecision.substring(
                  0,
                  10
                ),
              }}
            />
          </>
        ) : null}
        {impacted.length > 0 ? (
          <>
            <h3>Personnes impactées</h3>
            <div>
              {impacted.map((person) => (
                <div key={person.id}>{person.text}</div>
              ))}
            </div>
          </>
        ) : null}
        {expert.length > 0 ? (
          <>
            <h3>Personnes expertes</h3>
            <div>
              {expert.map((person) => (
                <div key={person.id}>{person.text}</div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  ) : (
    <Spinner />
  );
}
export default DecisionsPage;
