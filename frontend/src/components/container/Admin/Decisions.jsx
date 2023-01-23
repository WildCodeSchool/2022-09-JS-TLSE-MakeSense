import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiPencilSquare, HiOutlineXMark } from "react-icons/hi2";
import api from "../../../services/api";
import Spinner from "../../Spinner";

function DecisionsPage() {
  const [decisions, setDecisions] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
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
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  function handleChange(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  return isLoaded ? (
    <div className=" ">
      <div className="px-4 sm:px-6 lg:px-8 w-full">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-none flex flex-row justify-between items-center w-full">
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
            <button
              type="button"
              className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-m px-5 py-2.5 text-center"
            >
              Ajouter une décision
            </button>
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
                      Titre
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-m font-semibold text-gray-900"
                    >
                      Auteur
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-m font-semibold text-gray-900"
                    >
                      Statut
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-m font-semibold text-gray-900"
                    >
                      Date de dépôt
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-m font-semibold text-gray-900"
                    >
                      Edit
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-m font-semibold text-gray-900"
                    >
                      Delete
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
                          <HiOutlineXMark />
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
  ) : (
    <div>Is loading</div>
  );
}

export default DecisionsPage;
