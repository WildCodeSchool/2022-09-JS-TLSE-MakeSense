import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiPencilSquare, HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import api from "../../../services/api";
import Spinner from "../../Spinner";
import { Text, LanguageContext } from "../../../contexts/Language";

function DecisionsPage() {
  const [decisions, setDecisions] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllApis = async () => {
      // get the decision
      const callDecisions = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisions`
      );
      setDecisions(callDecisions);
      setIsLoaded(true);
    };
    getAllApis();
  }, [isSubmit]);

  const [searchTerm, setSearchTerm] = useState("");
  function handleChange(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  const handleDelete = (id) => {
    const deleteDecision = async () => {
      // delete the decision
      const deleteTheDecision = await api.apideletemysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`
      );
    };
    deleteDecision();
    setIsSubmit(true);
  };

  return isLoaded ? (
    <>
      {isSubmit && (
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
                  onClick={() => {
                    setIsSubmit(false);
                  }}
                >
                  <Text tid="backtodecisions" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className=" ">
        <div className="px-4 sm:px-6 lg:px-8 w-full">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-none flex flex-row justify-center items-center w-full">
              <input
                key="searchbarusers"
                id="searchbarusers"
                name="searchbarusers"
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Chercher une décision"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg w-1/2 p-2.5 my-5"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-m font-semibold text-gray-900 sm:pl-6"
                      >
                        <Text tid="title" />
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-m font-semibold text-gray-900"
                      >
                        <Text tid="author" />
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-m font-semibold text-gray-900"
                      >
                        <Text tid="Statut" />
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-m font-semibold text-gray-900"
                      >
                        <Text tid="depositdate" />
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-m font-semibold text-gray-900"
                      >
                        <Text tid="edit" />
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-m font-semibold text-gray-900"
                      >
                        <Text tid="delete" />
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {decisions
                      .filter((data) =>
                        data.content
                          .normalize("NFD")
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
                        <tr key={decision.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-m sm:pl-6">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <button
                                  type="submit"
                                  className="font-medium text-gray-900 text-calypso text-ellipsis overflow-hidden"
                                  onClick={() =>
                                    navigate(
                                      `/user/decisions?comp=Page&id=${decision.id}`
                                    )
                                  }
                                >
                                  {JSON.parse(decision.content).title.substring(
                                    0,
                                    40
                                  )}
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-m text-gray-500">
                            {decision.firstname} {decision.lastname}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-m text-gray-500">
                            {decision.status}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-m text-gray-500">
                            {JSON.parse(decision.content).firstDate.substring(
                              0,
                              10
                            )}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-m font-medium">
                            <HiPencilSquare />
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-m font-medium">
                            <button
                              type="button"
                              onClick={() => handleDelete(decision.id)}
                            >
                              <HiOutlineArchiveBoxXMark />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>Is loading</div>
  );
}

export default DecisionsPage;
