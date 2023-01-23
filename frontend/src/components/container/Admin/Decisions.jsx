import { useEffect, useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Popover, Transition } from "@headlessui/react";
import { HiPencilSquare } from "react-icons/hi2";
import api from "../../../services/api";
import CommentSection from "../../header/CommentSection";
import Spinner from "../../Spinner";

function DecisionsPage() {
  const [decisions, setDecisions] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

  // console.log(decisions);

  return isLoaded ? (
    <div className="w-2/3">
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
              placeholder="Chercher un utilisateur"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg w-1/2 p-2.5 my-5"
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
                {/* <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-xl font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900"
                    >
                      Statut
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900"
                    >
                      Edit
                    </th>
                  </tr>
                </thead> */}
                <tbody className="divide-y divide-gray-200 bg-white">
                  {decisions
                    // .filter(
                    //   (data) =>
                    //     data.lastname
                    //       .normalize("NFD")
                    //       .replace(/\p{Diacritic}/gu, "")
                    //       .toLocaleLowerCase()
                    //       .includes(
                    //         searchTerm
                    //           .normalize("NFD")
                    //           .replace(/\p{Diacritic}/gu, "")
                    //           .toLocaleLowerCase()
                    //       ) ||
                    //     data.firstname
                    //       .normalize("NFD")
                    //       .replace(/\p{Diacritic}/gu, "")
                    //       .toLocaleLowerCase()
                    //       .includes(
                    //         searchTerm
                    //           .normalize("NFD")
                    //           .replace(/\p{Diacritic}/gu, "")
                    //           .toLocaleLowerCase()
                    //       ) ||
                    //     data.email
                    //       .normalize("NFD")
                    //       .replace(/\p{Diacritic}/gu, "")
                    //       .toLocaleLowerCase()
                    //       .includes(
                    //         searchTerm
                    //           .normalize("NFD")
                    //           .replace(/\p{Diacritic}/gu, "")
                    //           .toLocaleLowerCase()
                    //       )
                    // )
                    .map((decision) => (
                      <tr key={decision.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xl sm:pl-6">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {JSON.parse(decision.content).title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-xl text-gray-500">
                          {JSON.parse(decision.content).title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-xl text-gray-500">
                          {JSON.parse(decision.content).title}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-xl font-medium">
                          <HiPencilSquare />
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
