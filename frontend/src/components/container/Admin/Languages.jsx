import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "@components/Spinner";
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
    <div className="comp-admin-wrapper">
      <h1>
        <Text tid="language" />
      </h1>
      <button
        type="button"
        value="edit"
        onClick={HandlerMode}
        className={ModeSelect === "edit" ? "active" : ""}
      >
        <Text tid="modify" />
      </button>
      <button
        type="button"
        value="add"
        onClick={HandlerMode}
        className={ModeSelect === "add" ? "active" : ""}
      >
        <Text tid="add" />
      </button>

      <button
        type="button"
        value="delete"
        onClick={HandlerMode}
        className={ModeSelect === "delete" ? "active" : ""}
      >
        <Text tid="delete" />
      </button>

      {ModeSelect !== "delete" && (
        <form onSubmit={handleSubmit}>
          {ModeSelect === "add" && (
            <select
              key="addlangselect"
              id="addlangselect"
              onChange={HandlerLang}
              required
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
            <div key={key} className="wrapper-form">
              <div className="key">Key : {key[0]}</div>
              {/* Lang courante exemple */}
              <div className="inputs-keys">
                <div className="div-input">
                  <label>{userLanguage}</label>
                  {ModeSelect === "add" && <input value={key[1]} readOnly />}
                  {ModeSelect === "edit" && (
                    <input
                      key={key[1]}
                      value={key[1]}
                      id={key[1]}
                      onChange={HandlerKey}
                      required
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
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          <button key="submit" type="submit" value="Submit">
            <Text tid="send" />
          </button>
        </form>
      )}
      {ModeSelect === "delete" &&
        LangActive.map((lang) => (
          <div className="wrapper-form">
            <div className="inputs-keys">{lang.name}</div>
          </div>
        ))}
    </div>
  ) : (
    <Spinner />
  );
}
export default LangSettings;
