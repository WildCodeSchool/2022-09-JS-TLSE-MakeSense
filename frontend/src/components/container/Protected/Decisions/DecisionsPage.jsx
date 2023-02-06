import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi2";
import api from "../../../../services/api";
import CommentSection from "./CommentSection";
import Spinner from "../../../Spinner";
import { Text } from "../../../../contexts/Language";
import { useAuth } from "../../../../contexts/useAuth";

function DecisionsPage() {
  const [decisions, setDecisions] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [comments, setComments] = useState();
  const [modale, setModale] = useState(false);

  const navigate = useNavigate();
  const URLParam = useLocation().search;
  const id = new URLSearchParams(URLParam).get("id")
    ? new URLSearchParams(URLParam).get("id")
    : "";

  // get user logged in from Context
  const { user } = useAuth();

  useEffect(() => {
    const getAllApis = async () => {
      // get the decision
      const callDecisions = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`
      );
      setDecisions(callDecisions);
      setIsLoaded(true);
    };
    getAllApis();
  }, [isLoaded]);

  const handleDelete = (e) => {
    e.preventDefault();
    const deleteDecision = async () => {
      // delete the decision
      const deleteTheDecision = await api.apideletemysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`
      );
    };
    deleteDecision();
    setModale(true);
  };

  return isLoaded ? (
    <>
      {modale && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 p-4 h-full overflow-x-hidden overflow-y-auto flex flex-col justify-center items-center backdrop-blur"
        >
          <div className="w-full max-w-md md:h-auto">
            <div className="relative bg-white rounded-lg shadow">
              <div className="p-6 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  <Text tid="thedecisionhasbeenremoved" />
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => navigate(`/user/decisions`)}
                >
                  <Text tid="backtodecisions" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="min-h-full">
        <main className="py-10">
          <div className="mt-8 max-w-7xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {/* Description list */}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="applicant-information-title"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {JSON.parse(decisions.decision.content).title}
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      <Text tid="through" /> {decisions.decision.firstname}{" "}
                      {decisions.decision.lastname}
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
                        <span>
                          <Text tid="description" />
                        </span>
                        <HiChevronDown />
                      </summary>
                      <div
                        id="accordion-flush-body-1"
                        aria-labelledby="accordion-flush-heading-1"
                      >
                        <div className="p-5 font-light border-b border-gray-200 dark:border-gray-700">
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: JSON.parse(decisions.decision.content)
                                .description,
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
                        <span>
                          <Text tid="context" />
                        </span>
                        <HiChevronDown />
                      </summary>
                      <div
                        id="accordion-flush-body-1"
                        aria-labelledby="accordion-flush-heading-1"
                      >
                        <div className="p-5 font-light border-b border-gray-200 dark:border-gray-700">
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: JSON.parse(decisions.decision.content)
                                .context,
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
                        <span>
                          <Text tid="usefulnessfortheorganization" />
                        </span>
                        <HiChevronDown />
                      </summary>
                      <div
                        id="accordion-flush-body-1"
                        aria-labelledby="accordion-flush-heading-1"
                      >
                        <div className="p-5 font-light border-b border-gray-200 dark:border-gray-700">
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: JSON.parse(decisions.decision.content)
                                .utility,
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
                        <span>
                          <Text tid="avantages" />
                        </span>
                        <HiChevronDown />
                      </summary>
                      <div
                        id="accordion-flush-body-1"
                        aria-labelledby="accordion-flush-heading-1"
                      >
                        <div className="p-5 font-light">
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: JSON.parse(decisions.decision.content)
                                .pros,
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
                        <span>
                          <Text tid="disadvantages" />
                        </span>
                        <HiChevronDown />
                      </summary>
                      <div
                        id="accordion-flush-body-1"
                        aria-labelledby="accordion-flush-heading-1"
                      >
                        <div className="p-5 font-light border-b border-gray-200 dark:border-gray-700">
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: JSON.parse(decisions.decision.content)
                                .cons,
                            }}
                          />
                        </div>
                      </div>
                    </details>
                    {user.id === decisions.decision.id_user_creator ? (
                      <div>
                        <button
                          className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-m px-5 py-2.5 m-2"
                          type="button"
                          key="key"
                          value="edit"
                          id={decisions.decision.id}
                          onClick={() => {
                            navigate(
                              `/user/decisions?comp=Edit&id=${decisions.decision.id}`
                            );
                          }}
                        >
                          <Text tid="modify" />
                        </button>
                        <button
                          className="bg-red-500 border border-red-500 text-red-900 text-m px-5 py-2.5 m-2 rounded-lg hover:bg-red-500 hover:text-white"
                          type="button"
                          value="edit"
                          onClick={handleDelete}
                        >
                          <Text tid="delete" />
                        </button>
                      </div>
                    ) : null}
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
                    <Text tid="timeline" />
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
                              decisions.decision.content
                            ).firstDate.substring(0, 10),
                          }}
                        />
                      </time>
                      <h3 className="text-m font-normal text-gray-900">
                        <Text tid="decisionmakingstarted" />
                      </h3>
                    </li>
                    {JSON.parse(decisions.decision.content).dateOpinion ? (
                      <li className="mb-10 ml-4">
                        {new Date(
                          JSON.parse(decisions.decision.content).dateOpinion
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
                                decisions.decision.content
                              ).dateOpinion.substring(0, 10),
                            }}
                          />
                        </time>
                        <h3 className="text-m font-normal text-gray-900">
                          <Text tid="deadline" />
                        </h3>
                      </li>
                    ) : null}
                    {JSON.parse(decisions.decision.content)
                      .dateFirstDecision ? (
                      <li className="mb-10 ml-4">
                        {new Date(
                          JSON.parse(
                            decisions.decision.content
                          ).dateFirstDecision
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
                                decisions.decision.content
                              ).dateFirstDecision.substring(0, 10),
                            }}
                          />
                        </time>
                        <h5 className="text-m font-normal text-gray-900">
                          <Text tid="firstdecision" />
                        </h5>
                      </li>
                    ) : null}
                    {JSON.parse(decisions.decision.content).dateEndConflict ? (
                      <li className="mb-10 ml-4">
                        {new Date(
                          JSON.parse(decisions.decision.content).dateEndConflict
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
                                decisions.decision.content
                              ).dateEndConflict.substring(0, 10),
                            }}
                          />
                        </time>
                        <h3 className="text-m font-normal text-gray-900">
                          <Text tid="deadlinetoenterdispute" />
                        </h3>
                      </li>
                    ) : null}
                    {JSON.parse(decisions.decision.content)
                      .dateFinaleDecision ? (
                      <li className="mb-10 ml-4">
                        {new Date(
                          JSON.parse(
                            decisions.decision.content
                          ).dateFinaleDecision
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
                                decisions.decision.content
                              ).dateFinaleDecision.substring(0, 10),
                            }}
                          />
                        </time>
                        <h3 className="text-m font-normal text-gray-900">
                          <Text tid="finaldecision" />
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
                    <Text tid="peopleconcerned" />
                  </h2>
                  {decisions.uimpacted.length === 0 ? (
                    <>
                      <h3 className="text-lg text-gray-900">
                        <Text tid="userimpacted" />
                      </h3>
                      <div>
                        <Text tid="noonehasbeennamedasimpacted" />
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg text-gray-900">
                        <Text tid="userimpacted" />
                      </h3>
                      <div className="flex -space-x-2 overflow-hidden">
                        {decisions.uimpacted.map((person) => (
                          <div key={`"userimpacted:"${person.id}`}>
                            <div
                              className="h-10 w-10 rounded-full border flex justify-center items-center text-white bg-calypso"
                              title={`${person.lastname} ${person.firstname}`}
                            >
                              {person.lastname.substring(0, 1)}
                              {person.firstname.substring(0, 1)}
                            </div>
                          </div>
                        ))}
                        {decisions.uimpacted.length > 4 && (
                          <div>
                            <Text tid="andothers" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {decisions.uexpert.length === 0 ? (
                    <>
                      <h3 className="text-lg text-gray-900">
                        <Text tid="userexpert" />
                      </h3>
                      <div>
                        <Text tid="noonehasbeenappointedasanexpert" />
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg text-gray-900">
                        <Text tid="userexpert" />
                      </h3>
                      <div className="flex -space-x-2 overflow-hidden">
                        {decisions.uexpert.map((person) => (
                          <div key={`"userexpert:"${person.id}`}>
                            <div
                              className="h-10 w-10 rounded-full border flex justify-center items-center text-white bg-calypso"
                              title={`${person.lastname} ${person.firstname}`}
                            >
                              {person.lastname.substring(0, 1)}
                              {person.firstname.substring(0, 1)}
                            </div>
                          </div>
                        ))}
                        {decisions.uexpert.length > 4 && (
                          <div>
                            <Text tid="andothers" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </section>
              <section className="lg:col-start-3 lg:col-span-1">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                  <h2
                    id="timeline-title"
                    className="text-lg font-medium text-gray-900"
                  >
                    <Text tid="groupsconcerned" />
                  </h2>
                  {decisions.gimpacted.length === 0 ? (
                    <>
                      <h3 className="text-lg text-gray-900">
                        <Text tid="groupsimpacted" />
                      </h3>
                      <div>
                        <Text tid="noonehasbeennamedasimpacted" />
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg text-gray-900">
                        <Text tid="groupsimpacted" />
                      </h3>
                      <div className="flex -space-x-2 overflow-hidden">
                        {decisions.gimpacted.map((group) => (
                          <div key={`"groupimpacted:"${group.id}`}>
                            <div
                              className="h-10 w-10 rounded-full border flex justify-center items-center text-white bg-calypso"
                              title={group.name}
                            >
                              {group.name
                                .split(/\s/)
                                .reduce(
                                  // eslint-disable-next-line no-return-assign
                                  (response, word) =>
                                    // eslint-disable-next-line no-param-reassign
                                    (response += word.slice(0, 1)),
                                  ""
                                )
                                .substring(0, 2)}
                            </div>
                          </div>
                        ))}
                        {decisions.gimpacted.length > 4 && (
                          <div>
                            <Text tid="andothers" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {decisions.gexpert.length === 0 ? (
                    <>
                      <h3 className="text-lg text-gray-900">
                        <Text tid="groupsexperts" />
                      </h3>
                      <div>
                        <Text tid="noonehasbeenappointedasanexpert" />
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg text-gray-900">
                        <Text tid="designatethepeopleconcerned" />
                      </h3>
                      <div className="flex -space-x-2 overflow-hidden">
                        {decisions.gexpert.map((group) => (
                          <div key={`"groupexpert:"${group.id}`}>
                            <div
                              className="h-10 w-10 rounded-full border flex justify-center items-center text-white bg-calypso"
                              title={group.name}
                            >
                              {group.name
                                .split(/\s/)
                                .reduce(
                                  // eslint-disable-next-line no-return-assign
                                  (response, word) =>
                                    // eslint-disable-next-line no-param-reassign
                                    (response += word.slice(0, 1)),
                                  ""
                                )
                                .substring(0, 2)}
                            </div>
                          </div>
                        ))}
                        {decisions.gexpert.length > 4 && (
                          <div>
                            <Text tid="andothers" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  ) : (
    <Spinner />
  );
}

export default DecisionsPage;
