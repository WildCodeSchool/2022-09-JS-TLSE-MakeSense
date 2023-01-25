import { useEffect, useState, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Popover, Transition } from "@headlessui/react";
import api from "../../../../services/api";
import CommentSection from "./CommentSection";
import Spinner from "../../../Spinner";

function DecisionsPage() {
  const [decisions, setDecisions] = useState(null);
  const [impacted, setImpacted] = useState();
  const [expert, setExpert] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [comments, setComments] = useState();
  const [contentComment, setContentComment] = useState();

  const navigate = useNavigate();
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
  }, [isLoaded]);

  return isLoaded ? (
    <div className="min-h-full">
      <main className="py-10">
        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* Description list */}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {JSON.parse(decisions.content).title}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Par {decisions.firstname} {decisions.lastname}
                  </p>
                </div>
                <div
                  id="accordion-flush"
                  data-accordion="collapse"
                  data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  data-inactive-classes="text-gray-500 dark:text-gray-400"
                >
                  <details className="text-gray-500 border-b border-gray-200">
                    <summary
                      type="button"
                      className="px-5 flex items-center justify-between w-full py-5 font-medium text-left text-gray-500"
                      data-accordion-target="#accordion-flush-body-1"
                      aria-expanded="true"
                      aria-controls="accordion-flush-body-1"
                    >
                      <span>Description</span>
                      <svg
                        data-accordion-icon
                        className="w-6 h-6 rotate-180 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </summary>
                    <div
                      id="accordion-flush-body-1"
                      aria-labelledby="accordion-flush-heading-1"
                    >
                      <div className="p-5 font-light border-b border-gray-200 dark:border-gray-700">
                        <div
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: JSON.parse(decisions.content).description,
                          }}
                        />
                      </div>
                    </div>
                  </details>
                  <details className="text-gray-500 border-b border-gray-200">
                    <summary
                      type="button"
                      className="px-5 flex items-center justify-between w-full py-5 font-medium text-left text-gray-500"
                      data-accordion-target="#accordion-flush-body-1"
                      aria-expanded="true"
                      aria-controls="accordion-flush-body-1"
                    >
                      <span>Contexte</span>
                      <svg
                        data-accordion-icon
                        className="w-6 h-6 rotate-180 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </summary>
                    <div
                      id="accordion-flush-body-1"
                      aria-labelledby="accordion-flush-heading-1"
                    >
                      <div className="p-5 font-light border-b border-gray-200 dark:border-gray-700">
                        <div
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: JSON.parse(decisions.content).context,
                          }}
                        />
                      </div>
                    </div>
                  </details>
                  <details className="text-gray-500 border-b border-gray-200">
                    <summary
                      type="button"
                      className="px-5 flex items-center justify-between w-full py-5 font-medium text-left text-gray-500"
                      data-accordion-target="#accordion-flush-body-1"
                      aria-expanded="true"
                      aria-controls="accordion-flush-body-1"
                    >
                      <span>Utilité</span>
                      <svg
                        data-accordion-icon
                        className="w-6 h-6 rotate-180 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </summary>
                    <div
                      id="accordion-flush-body-1"
                      aria-labelledby="accordion-flush-heading-1"
                    >
                      <div className="p-5 font-light border-b border-gray-200 dark:border-gray-700">
                        <div
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: JSON.parse(decisions.content).utility,
                          }}
                        />
                      </div>
                    </div>
                  </details>
                  <details className="text-gray-500 border-b border-gray-200">
                    <summary
                      type="button"
                      className="px-5 flex items-center justify-between w-full py-5 font-medium text-left text-gray-500"
                      data-accordion-target="#accordion-flush-body-1"
                      aria-expanded="true"
                      aria-controls="accordion-flush-body-1"
                    >
                      <span>Avantages</span>
                      <svg
                        data-accordion-icon
                        className="w-6 h-6 rotate-180 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </summary>
                    <div
                      id="accordion-flush-body-1"
                      aria-labelledby="accordion-flush-heading-1"
                    >
                      <div className="p-5 font-light">
                        <div
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: JSON.parse(decisions.content).pros,
                          }}
                        />
                      </div>
                    </div>
                  </details>
                  <details className="text-gray-500 border-b border-gray-200">
                    <summary
                      type="button"
                      className="px-5 flex items-center justify-between w-full py-5 font-medium text-left text-gray-500"
                      data-accordion-target="#accordion-flush-body-1"
                      aria-expanded="true"
                      aria-controls="accordion-flush-body-1"
                    >
                      <span>Inconvénients</span>
                      <svg
                        data-accordion-icon
                        className="w-6 h-6 rotate-180 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </summary>
                    <div
                      id="accordion-flush-body-1"
                      aria-labelledby="accordion-flush-heading-1"
                    >
                      <div className="p-5 font-light border-b border-gray-200 dark:border-gray-700">
                        <div
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: JSON.parse(decisions.content).cons,
                          }}
                        />
                      </div>
                    </div>
                  </details>
                  <button
                    className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-m px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="button"
                    key="key"
                    id="8"
                    onClick={() => {
                      navigate(`/user/decisions?comp=Edit`);
                    }}
                  >
                    Modifier la décision
                  </button>
                </div>
              </div>
            </section>
            <CommentSection
              id={id}
              comments={comments}
              setComments={setComments}
            />
          </div>
          <div className="space-y-6">
            <section
              aria-labelledby="timeline-title"
              className="lg:col-start-3 lg:col-span-1"
            >
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2
                  id="timeline-title"
                  className="text-lg font-medium text-gray-900"
                >
                  Timeline
                </h2>

                {/* Activity Feed */}
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                  <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-calypso rounded-full mt-1.5 -left-1.5 border border-white" />
                    <time className="mb-1 text-calypso text-m font-bold leading-none">
                      <div
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html: JSON.parse(
                            decisions.content
                          ).firstDate.substring(0, 10),
                        }}
                      />
                    </time>
                    <h3 className="text-m font-normal text-gray-900">
                      Prise de décision commencée
                    </h3>
                  </li>
                  {JSON.parse(decisions.content).dateOpinion ? (
                    <li className="mb-10 ml-4">
                      {new Date(JSON.parse(decisions.content).dateOpinion) >
                      new Date() ? (
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white" />
                      ) : (
                        <div className="absolute w-3 h-3 bg-calypso rounded-full mt-1.5 -left-1.5 border border-white" />
                      )}
                      <time className="mb-1 text-calypso text-m font-bold leading-none">
                        <div
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: JSON.parse(
                              decisions.content
                            ).dateOpinion.substring(0, 10),
                          }}
                        />
                      </time>
                      <h3 className="text-m font-normal text-gray-900">
                        Deadline pour donner son avis
                      </h3>
                      <div>Plus que </div>
                    </li>
                  ) : null}
                  {JSON.parse(decisions.content).dateFirstDecision ? (
                    <li className="mb-10 ml-4">
                      {new Date(
                        JSON.parse(decisions.content).dateFirstDecision
                      ) > new Date() ? (
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white" />
                      ) : (
                        <div className="absolute w-3 h-3 bg-calypso rounded-full mt-1.5 -left-1.5 border border-white" />
                      )}
                      <time className="mb-1 text-calypso text-m font-bold leading-none">
                        <div
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: JSON.parse(
                              decisions.content
                            ).dateFirstDecision.substring(0, 10),
                          }}
                        />
                      </time>
                      <h5 className="text-m font-normal text-gray-900">
                        Première décision prise
                      </h5>
                    </li>
                  ) : null}
                  {JSON.parse(decisions.content).dateEndConflict ? (
                    <li className="mb-10 ml-4">
                      {new Date(JSON.parse(decisions.content).dateEndConflict) >
                      new Date() ? (
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white" />
                      ) : (
                        <div className="absolute w-3 h-3 bg-calypso rounded-full mt-1.5 -left-1.5 border border-white" />
                      )}
                      <time className="mb-1 text-calypso text-m font-bold leading-none">
                        <div
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: JSON.parse(
                              decisions.content
                            ).dateEndConflict.substring(0, 10),
                          }}
                        />
                      </time>
                      <h3 className="text-m font-normal text-gray-900">
                        Deadline pour entrer en conflit
                      </h3>
                    </li>
                  ) : null}
                  {JSON.parse(decisions.content).dateFinaleDecision ? (
                    <li className="mb-10 ml-4">
                      {new Date(
                        JSON.parse(decisions.content).dateFinaleDecision
                      ) > new Date() ? (
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white" />
                      ) : (
                        <div className="absolute w-3 h-3 bg-calypso rounded-full mt-1.5 -left-1.5 border border-white" />
                      )}
                      <time className="mb-1 text-calypso text-m font-bold leading-none">
                        <div
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: JSON.parse(
                              decisions.content
                            ).dateFinaleDecision.substring(0, 10),
                          }}
                        />
                      </time>
                      <h3 className="text-m font-normal text-gray-900">
                        Décision définitive
                      </h3>
                    </li>
                  ) : null}
                </ol>
              </div>
            </section>
            <section className="lg:col-start-3 lg:col-span-1">
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2
                  id="timeline-title"
                  className="text-lg font-medium text-gray-900"
                >
                  Les personnes concernées
                </h2>
                {impacted.length === 0 ? (
                  <>
                    <h3 className="text-lg text-gray-900">
                      Personnes impactées
                    </h3>
                    <div>Personne n'a été désigné comme étant impacté.</div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg text-gray-900">
                      Personnes impactées
                    </h3>
                    <div className="flex -space-x-2 overflow-hidden">
                      {impacted.map((person) => (
                        <div>
                          <img
                            key={person.id}
                            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                          {person.firstname} {person.lastname.toUpperCase()}
                        </div>
                      ))}
                      {impacted.length > 4 && <div>et autres...</div>}
                    </div>
                  </>
                )}
                {expert.length === 0 ? (
                  <>
                    <h3 className="text-lg text-gray-900">
                      Personnes expertes
                    </h3>
                    <div>Personne n'a été désigné expert.</div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg text-gray-900">
                      Personnes expertes
                    </h3>
                    <div className="flex -space-x-2 overflow-hidden">
                      {expert.map((person) => (
                        <div>
                          <img
                            key={person.id}
                            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt={`${
                              person.firstname
                            } ${person.lastname.toUpperCase()}`}
                          />
                        </div>
                      ))}
                      {expert.length > 4 && <div>et autres...</div>}
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  ) : (
    <div>Is loading</div>
  );
}

export default DecisionsPage;
