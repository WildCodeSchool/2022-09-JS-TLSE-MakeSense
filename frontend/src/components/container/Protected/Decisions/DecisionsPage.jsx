import { useEffect, useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Popover, Transition } from "@headlessui/react";
import api from "../../../../services/api";
import CommentSection from "../../../header/CommentSection";
import Spinner from "../../../Spinner";

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

  const timeline = [
    {
      id: 1,
      content: "Applied to",
      target: "Front End Developer",
      date: "Sep 20",
      datetime: "2020-09-20",
    },
    {
      id: 2,
      content: "Advanced to phone screening by",
      target: "Bethany Blake",
      date: "Sep 22",
      datetime: "2020-09-22",
    },
    {
      id: 3,
      content: "Completed phone screening with",
      target: "Martha Gardner",
      date: "Sep 28",
      datetime: "2020-09-28",
    },
    {
      id: 4,
      content: "Advanced to interview by",
      target: "Bethany Blake",
      date: "Sep 30",
      datetime: "2020-09-30",
    },
    {
      id: 5,
      content: "Completed interview with",
      target: "Katherine Snyder",
      date: "Oct 4",
      datetime: "2020-10-04",
    },
  ];

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
                  <details>
                    <summary
                      type="button"
                      className="px-5 flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
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
                  <details>
                    <summary
                      type="button"
                      className="px-5 flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
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
                  <details>
                    <summary
                      type="button"
                      className="px-5 flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
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
                  <details>
                    <summary
                      type="button"
                      className="px-5 flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
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
                      <div className="p-5 font-light border-b border-gray-200 dark:border-gray-700">
                        <div
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: JSON.parse(decisions.content).pros,
                          }}
                        />
                      </div>
                    </div>
                  </details>
                  <details>
                    <summary
                      type="button"
                      className="px-5 flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
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
                </div>
              </div>
            </section>
            <CommentSection
              id={id}
              comments={comments}
              setComments={setComments}
            />
          </div>

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
              <div className="mt-6 flow-root">
                <ul className="-mb-8">
                  {timeline.map((item, itemIdx) => (
                    <li key={item.id}>
                      <div className="relative pb-8">
                        {itemIdx !== timeline.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {item.content}{" "}
                                <a
                                  href="/"
                                  className="font-medium text-gray-900"
                                >
                                  {item.target}
                                </a>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime={item.datetime}>{item.date}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  ) : (
    <div>Is loading</div>
  );
}

export default DecisionsPage;
