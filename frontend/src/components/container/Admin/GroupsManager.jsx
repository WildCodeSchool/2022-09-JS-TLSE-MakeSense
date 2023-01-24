import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiPencilSquare, HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import Spinner from "@components/Spinner";
import { Text } from "../../../contexts/Language";
import api from "../../../services/api";
import Concerned from "../Protected/Decisions/form/Concerned";

function UsersManager() {
  const navigate = useNavigate();
  const [IsLoaded, SetIsLoaded] = useState(false);
  const [AllUsers, setAllUsers] = useState();
  const [AllGroups, setAllGroups] = useState();
  const [listUsers, setListUsers] = useState([]);
  const URLParam = useLocation().search;
  const [ModeSelect, setModeSelect] = useState(
    new URLSearchParams(URLParam).get("mode")
      ? new URLSearchParams(URLParam).get("mode")
      : "list"
  );

  const HandlerMode = (mode) => {
    setModeSelect(mode.currentTarget.value);
    navigate(
      `/admin/dashboard?tools=GroupsManager&mode=${
        mode.currentTarget.value === "edit"
          ? `${mode.currentTarget.value}&id=${mode.currentTarget.id}`
          : mode.currentTarget.value
      }`,
      {
        replace: true,
      }
    );
  };

  function handleDeleteGroup(e) {
    e.preventDefault();
    const id = e.currentTarget.value;
    const deletegroup = api.apideletemysql(
      `${import.meta.env.VITE_BACKEND_URL}/groups/${id}`
    );
    if (deletegroup.status === 204) {
      SetIsLoaded(false);
      navigate(`/admin/dashboard?tools=GroupsManager`, {
        replace: true,
      });
    }
    SetIsLoaded(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.gname.value;
    const body = { users: listUsers, name };
    const sendForm = async () => {
      const resgroupadd = await api.apipostmysql(
        `${import.meta.env.VITE_BACKEND_URL}/groups`,
        body
      );
      if (resgroupadd.status === 201) {
        SetIsLoaded(false);
        navigate(`/admin/dashboard?tools=GroupsManager`, {
          replace: true,
        });
      }
    };
    sendForm();
  }

  useEffect(() => {
    const getAllapi = async () => {
      const allusers = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/users`
      );
      const allgroups = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/groups`
      );
      setAllUsers(allusers);
      setAllGroups(allgroups);
      SetIsLoaded(true);
    };
    getAllapi();
  }, [IsLoaded]);

  const [searchTerm, setSearchTerm] = useState("");
  function handleChange(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  return IsLoaded ? (
    <div className="comp-admin-wrapper">
      {ModeSelect === "add" && (
        <>
          <button
            type="button"
            value="list"
            onClick={HandlerMode}
            className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-m px-5 py-2.5 text-center"
          >
            <Text tid="list" />
          </button>
          <div className="w-2/3">
            <div className="px-4 sm:px-6 lg:px-8 w-full">
              <div className="sm:flex sm:items-center">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="groupname">
                    <Text tid="name" />
                  </label>
                  <input type="text" id="gname" name="gname" required />
                  <Concerned
                    table={AllUsers}
                    name="users"
                    type={listUsers}
                    updateType={(event) => setListUsers(event)}
                    required
                  />
                  <button
                    type="submit"
                    className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-m px-5 py-2.5 m-5 text-center"
                  >
                    <Text tid="add" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      {ModeSelect === "list" && (
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
                  placeholder="Chercher un groupe"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg w-1/2 p-2.5 my-5"
                />
                <button
                  type="button"
                  value="add"
                  onClick={HandlerMode}
                  className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-m px-5 py-2.5 text-center"
                >
                  <Text tid="add" />
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
                          className="py-3.5 pl-4 pr-3 text-left text-xl font-semibold text-gray-900 sm:pl-6"
                        >
                          Nom
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900"
                        >
                          Nombre de personnes
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900"
                        >
                          Edit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {AllGroups.filter((data) =>
                        data.name
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
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xl sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src=""
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-gray-500">{data.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xl sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <div className="text-gray-500">...</div>
                              </div>
                            </div>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-xl font-medium">
                            <button
                              key={data.id}
                              id={data.id}
                              type="button"
                              value="edit"
                              onClick={HandlerMode}
                            >
                              <HiPencilSquare />
                            </button>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-xl font-medium">
                            <button
                              type="button"
                              value={data.id}
                              onClick={handleDeleteGroup}
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
      )}
    </div>
  ) : (
    <Spinner />
  );
}
export default UsersManager;
