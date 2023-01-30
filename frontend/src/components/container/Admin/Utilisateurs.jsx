import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiPencilSquare, HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { Text, LanguageContext } from "../../../contexts/Language";
import api from "../../../services/api";
import Spinner from "../../Spinner";

function UsersManager() {
  const [IsLoaded, SetIsLoaded] = useState(false);
  const [AllUsers, setAllUsers] = useState();
  const [toModify, setToModify] = useState(false);
  const [userData, setUserData] = useState();
  const [userToModify, setUserToModify] = useState(userData);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllapi = async () => {
      const allusers = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/users`
      );
      setAllUsers(allusers);
      SetIsLoaded(true);
    };
    getAllapi();
  }, [toModify]);

  const [searchTerm, setSearchTerm] = useState("");
  function handleChange(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  const handleSubmit = () => {
    const body = userToModify;

    const updateUserData = async () => {
      const updateUser = await api.apiputmysql(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userData.id}`,
        body
      );
    };
    updateUserData();
    setToModify(false);
  };

  const handleDelete = (id) => {
    const deleteUser = async () => {
      // delete the user
      const deleteTheUser = await api.apideletemysql(
        `${import.meta.env.VITE_BACKEND_URL}/users/${id}`
      );
    };
    deleteUser();
    setIsSubmit(true);
  };

  return IsLoaded ? (
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
                  L'utilisateur a été supprimé
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
      {toModify && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 p-4 h-full overflow-x-hidden overflow-y-auto flex flex-col justify-center items-center backdrop-blur"
        >
          <div className="w-full max-w-md md:h-auto">
            <div className="relative bg-white rounded-lg shadow">
              <div className="p-6 flex flex-col">
                <div className="py-6 px-4 sm:p-6 lg:pb-8 flex justify-center items-center">
                  <div className="flex flew-row justify-between">
                    <div className="mt-6">
                      <div className="flex justify-center items-center">
                        <input
                          type="text"
                          id="lastname"
                          name="lastname"
                          defaultValue={userData.lastname}
                          onChange={(event) =>
                            setUserToModify({
                              ...userToModify,
                              [event.target.name]: event.target.value,
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        />
                      </div>
                      <div className="">
                        <input
                          type="text"
                          id="firstname"
                          name="firstname"
                          defaultValue={userData.firstname}
                          onChange={(event) =>
                            setUserToModify({
                              ...userToModify,
                              [event.target.name]: event.target.value,
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        />
                      </div>
                      <div className="">
                        <input
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                          type="email"
                          id="email"
                          name="email"
                          defaultValue={userData.email}
                          onChange={(event) =>
                            setUserToModify({
                              ...userToModify,
                              [event.target.name]: event.target.value,
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => {
                      handleSubmit();
                      setToModify(false);
                    }}
                    className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-m px-5 py-2.5 mr-2 mb-2"
                  >
                    Valider les nouvelles informations
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setToModify(false);
                    }}
                    className="text-calypso bg-white opacity-1 hover:bg-calypsoLight hover:text-white font-medium rounded-lg border border-calypso text-sm  px-5 py-2.5 mr-2 mb-2"
                  >
                    Revenir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg w-1/2 p-2.5 my-5"
              />
              <button
                type="button"
                className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-m px-5 py-2.5 text-center"
                onClick={() => navigate(`/admin/dashboard?tools=Register`)}
              >
                Ajouter un utilisateur
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
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-m font-semibold text-gray-900"
                      >
                        Email
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
                        Edit
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
                    {AllUsers.filter(
                      (data) =>
                        data.lastname
                          .normalize("NFD")
                          .replace(/\p{Diacritic}/gu, "")
                          .toLocaleLowerCase()
                          .includes(
                            searchTerm
                              .normalize("NFD")
                              .replace(/\p{Diacritic}/gu, "")
                              .toLocaleLowerCase()
                          ) ||
                        data.firstname
                          .normalize("NFD")
                          .replace(/\p{Diacritic}/gu, "")
                          .toLocaleLowerCase()
                          .includes(
                            searchTerm
                              .normalize("NFD")
                              .replace(/\p{Diacritic}/gu, "")
                              .toLocaleLowerCase()
                          ) ||
                        data.email
                          .normalize("NFD")
                          .replace(/\p{Diacritic}/gu, "")
                          .toLocaleLowerCase()
                          .includes(
                            searchTerm
                              .normalize("NFD")
                              .replace(/\p{Diacritic}/gu, "")
                              .toLocaleLowerCase()
                          )
                    ).map((data) => (
                      <tr key={data.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-m sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full border flex justify-center items-center text-white bg-calypso">
                                {data.lastname.substring(0, 1)}
                                {data.firstname.substring(0, 1)}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {data.lastname} {data.firstname}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-m text-gray-500">
                          {data.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-m text-gray-500">
                          {data.admin === 0 ? "Utilisateur" : "Admin"}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-m font-medium">
                          <button
                            type="button"
                            onClick={() => {
                              setToModify(true);
                              setUserData(data);
                              setUserToModify(data);
                            }}
                          >
                            <HiPencilSquare />
                          </button>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-m font-medium">
                          <button
                            type="button"
                            onClick={() => handleDelete(data.id)}
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
    <Spinner />
  );
}
export default UsersManager;
