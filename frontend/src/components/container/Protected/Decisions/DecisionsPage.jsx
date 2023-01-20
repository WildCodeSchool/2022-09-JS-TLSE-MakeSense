import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../../../Spinner";
import api from "../../../../services/api";
import "../../../../assets/css/container/protected/DecisionPage.css";
import CommentSection from "../../../header/CommentSection";

function DecisionsPage() {
  const [decisions, setDecisions] = useState(null);
  const [impacted, setImpacted] = useState();
  const [expert, setExpert] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [comments, setComments] = useState();

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
      // get the impacted
      const callImpacted = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/impacted/${id}`
      );
      // get the experts
      const callExperts = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/experts/${id}`
      );
      setDecisions(callDecisions);
      setImpacted(callImpacted);
      setExpert(callExperts);
      setIsLoaded(true);
    };
    getAllApis();
  }, []);

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
        {impacted.length === 0 ? (
          <>
            <h3>Personnes impactées</h3>
            <div>Personne n'a été désigné comme étant impacté.</div>
          </>
        ) : (
          <>
            <h3>Personnes impactées</h3>
            <div>
              {impacted.map((person) => (
                <div key={person.id}>
                  {person.firstname} {person.lastname.toUpperCase()}
                </div>
              ))}
              {impacted.length > 4 && <div>et autres...</div>}
            </div>
          </>
        )}
        {expert.length === 0 ? (
          <>
            <h3>Personnes expertes</h3>
            <div>Personne n'a été désigné expert.</div>
          </>
        ) : (
          <>
            <h3>Personnes expertes</h3>
            <div>
              {expert.map((person) => (
                <div key={person.id}>
                  {person.firstname} {person.lastname.toUpperCase()}
                </div>
              ))}
              {expert.length > 4 && <div>et {expert.length - 4} autres...</div>}
            </div>
          </>
        )}
      </div>
    </div>
  ) : (
    <Spinner />
  );
}
export default DecisionsPage;
