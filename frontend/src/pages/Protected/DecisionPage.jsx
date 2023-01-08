import { useEffect, useState } from "react";
import api from "@services/api";
import "../../assets/css/decisionPage.css";

function Decisions() {
  const [datas, setDatas] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const id = 4;

  useEffect(() => {
    const getDatas = async () => {
      const decisions = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisionpage/${id}`
      );
      setDatas(decisions);
      setIsLoaded(true);
    };
    getDatas(); // lance la fonction getDatas
  }, [isLoaded]);

  // const JSONKeys = Object.getOwnPropertyNames(JSON.parse(datas.content));

  return (
    isLoaded && (
      <div className="decisionContainer">
        <div className="decisionDetailsContainer">
          <div>
            <h1>{JSON.parse(datas.content).title}</h1>
            <div>Par {datas.id}</div>
            <div>Date de création : {datas.date_created.substring(0, 10)}</div>
            <div>Mis à jour : {datas.date_update.substring(0, 10)}</div>
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
                  __html: JSON.parse(datas.content).description,
                }}
              />
            </details>
            <details>
              <summary>Contexte</summary>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: JSON.parse(datas.content).context,
                }}
              />
            </details>
            <details>
              <summary>Utilité</summary>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: JSON.parse(datas.content).utility,
                }}
              />
            </details>
            <details>
              <summary>Avantages</summary>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: JSON.parse(datas.content).pros,
                }}
              />
            </details>
            <details>
              <summary>Inconvénients</summary>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: JSON.parse(datas.content).cons,
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
              __html: JSON.parse(datas.content).firstDecision,
            }}
          />
          <h3>Fin de la période de conflit</h3>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.parse(datas.content).endConflict,
            }}
          />
          <h3>Décision finale</h3>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.parse(datas.content).finaleDecision,
            }}
          />
          <h3>Personnes impactées</h3>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.parse(datas.content).impacted[0].id,
            }}
          />
          <h3>Personnes expertes</h3>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.parse(datas.content).experts[0].id,
            }}
          />
        </div>
      </div>
    )
  );
}
export default Decisions;
