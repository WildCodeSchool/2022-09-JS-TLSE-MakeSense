import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "@components/Spinner";
import { HiPencilSquare } from "react-icons/hi2";
import { Text, LanguageContext } from "../../../contexts/Language";
import api from "../../../services/api";

function LangSettings() {
  const navigate = useNavigate();
  const { dictionary, userLanguage } = useContext(LanguageContext);
  const [Alllang, setAlllang] = useState();
  const [LangActive, setLangActive] = useState();
  const [AddLangSelect, setAddLangSelect] = useState();
  const [AddLangForm, setAddLangForm] = useState({});
  const [IsLoaded, SetIsLoaded] = useState(false);

  // Params Get
  const URLParam = useLocation().search;
  const [ModeSelect, setModeSelect] = useState(
    new URLSearchParams(URLParam).get("mode")
      ? new URLSearchParams(URLParam).get("mode")
      : "add"
  );

  const HandlerMode = (mode) => {
    setModeSelect(mode.target.value);
    navigate(`/admin/dashboard?tools=Languages&mode=${mode.target.value}`, {
      replace: true,
    });
  };

  const HandlerLang = (event) => {
    setAddLangSelect(event.target.value !== "" ? event.target.value : null);
  };

  const HandlerKey = (event) => {
    setAddLangForm({ ...AddLangForm, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const lang = event.target.addlangselect.value;
    const json = JSON.stringify(AddLangForm);
    const body = { lang, json };
    const sendForm = async () => {
      const resalllang = await api.apipostmysql(
        `${import.meta.env.VITE_BACKEND_URL}/addlang`,
        body
      );
    };
    sendForm();
    navigate("/admin/dashboard?tools=Languages", { replace: true });
  };

  useEffect(() => {
    const getAllapi = async () => {
      const alllang = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/alllang`
      );
      const langactive = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/lang`
      );
      setAlllang(alllang);
      setLangActive(langactive);
      SetIsLoaded(true);
    };
    getAllapi();
  }, []);

  return IsLoaded ? (
    <div className="w-2/3">
      <div className="w-full flex flex-row justify-center m-5">
        <button
          type="button"
          value="edit"
          onClick={HandlerMode}
          className={
            ModeSelect === "edit"
              ? "text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2"
              : "text-calypso bg-white opacity-1 hover:bg-calypsoLight hover:text-white font-medium rounded-lg border border-calypso text-sm px-5 py-2.5 text-center mx-2"
          }
        >
          <Text tid="modify" />
        </button>
        <button
          type="button"
          value="add"
          onClick={HandlerMode}
          className={
            ModeSelect === "add"
              ? "text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2"
              : "text-calypso bg-white opacity-1 hover:bg-calypsoLight hover:text-white font-medium rounded-lg border border-calypso text-sm px-5 py-2.5 text-center mx-2"
          }
        >
          <Text tid="add" />
        </button>
        <button
          type="button"
          value="delete"
          onClick={HandlerMode}
          className={
            ModeSelect === "delete"
              ? "text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2"
              : "text-calypso bg-white opacity-1 hover:bg-calypsoLight hover:text-white font-medium rounded-lg border border-calypso text-sm px-5 py-2.5 text-center mx-2"
          }
        >
          <Text tid="delete" />
        </button>
      </div>
      {ModeSelect !== "delete" && (
        <form onSubmit={handleSubmit}>
          {ModeSelect === "add" && (
            <select
              key="addlangselect"
              id="addlangselect"
              onChange={HandlerLang}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
            >
              <option key="select" value="">
                <Text tid="selectlanguage" />
              </option>
              {Alllang.filter(
                (el) =>
                  !LangActive.find((act) => act.iso_639_1 === el.iso_639_1)
              ).map((key, index) => (
                <option key={key.id} id={key.id} value={key.name}>
                  {key.iso_639_1} : {key.name}
                </option>
              ))}
            </select>
          )}

          {Object.entries(dictionary).map((key, index) => (
            <section className="lg:col-start-3 lg:col-span-1 py-5">
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <div key={key} className="wrapper-form">
                  <div className="key">Mot : {key[0]}</div>
                  {/* Lang courante exemple */}
                  <div className="inputs-keys">
                    <div className="div-input">
                      <label>{userLanguage}</label>
                      {ModeSelect === "add" && (
                        <input value={key[1]} readOnly />
                      )}
                      {ModeSelect === "edit" && (
                        <input
                          key={key[1]}
                          value={key[1]}
                          id={key[1]}
                          onChange={HandlerKey}
                          required
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:outline-2 focus:outline-cyan-800 w-full p-2.5"
                        />
                      )}
                    </div>
                    {/* Lang que l'on veut ajouter */}
                    {ModeSelect === "add" && (
                      <div className="div-input">
                        <label>
                          {AddLangSelect ?? <Text tid="selectlanguage" />}
                        </label>
                        <input
                          key={key[0]}
                          id={key[0]}
                          onChange={HandlerKey}
                          required
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:outline-2 focus:outline-cyan-800 w-full p-2.5"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ))}
          <div className="w-full flex justify-center">
            <button
              key="submit"
              type="submit"
              value="Submit"
              className="w-full text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center my-5"
            >
              <Text tid="send" />
            </button>
          </div>
        </form>
      )}
      {ModeSelect === "delete" && (
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
                        Langage
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {LangActive.map((lang) => (
                      <tr key={lang.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xl sm:pl-6">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {lang.name}
                              </div>
                            </div>
                          </div>
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
      )}
    </div>
  ) : (
    <Spinner />
  );
}
export default LangSettings;
