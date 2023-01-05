import { useState, useContext, useEffect, useRef } from "react";
import { Text, LanguageContext } from "../../../contexts/Language";
import api from "../../../services/api";
import "../../../assets/css/container/admin/Language.scss";

function LangSettings() {
  const { dictionary, userLanguage } = useContext(LanguageContext);
  const [Alllang, setAlllang] = useState();
  const [LangActive, setLangActive] = useState();
  const [AddLangSelect, setAddLangSelect] = useState();
  const [AddLangForm, setAddLangForm] = useState({});
  const [IsLoaded, SetIsLoaded] = useState(false);

  const HandlerLang = (event) => {
    setAddLangSelect(event.target.value !== "" ? event.target.value : null);
  };

  const HandlerKey = (event) => {
    setAddLangForm({ ...AddLangForm, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const lang = event.target.addlangselect.value
    const json = JSON.stringify(AddLangForm)
    const body = {lang, json};
    const sendForm = async () => {
      const resalllang = await api.apipostmysql(`${import.meta.env.VITE_BACKEND_URL}/addlang`, body);
      console.log(resalllang);
    };

    sendForm();

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
    <div className="wrapper">
      <h1>
        <Text tid="language" />
      </h1>
      <button type="button">
        <Text tid="modify" />
      </button>
      <button type="button">
        <Text tid="add" />
      </button>
      <form onSubmit={handleSubmit}>
        <select key="addlangselect"  id="addlangselect" onChange={HandlerLang} required>
          <option key="select" value="">
            <Text tid="selectlanguage" />
          </option>
          {Alllang.filter(
            (el) => !LangActive.find((act) => act.iso_639_1 === el.iso_639_1)
          ).map((key, index) => (
            <option key={key.id} id={key.id} value={key.name}>
              {key.iso_639_1} : {key.name}
            </option>
          ))}
        </select>

        {Object.entries(dictionary).map((key, index) => (
          <div key={key} className="wrapper-form">
            <div className="key">Key : {key[0]}</div>
            {/* Lang courante exemple */}
            <div className="inputs-keys">
              <div className="div-input">
                <label>{userLanguage}</label>
                <input value={key[1]} readOnly />
              </div>
              {/* Lang que l'on veut ajouter */}
              <div className="div-input">
                <label >{AddLangSelect ?? <Text tid="selectlanguage" />}</label>
                <input key={key[0]} id={key[0]} onChange={HandlerKey} required />
              </div>
            </div>
          </div>
        ))}
        <button key="submit" type="submit" value="Submit">
          <Text tid="send" />
        </button>
      </form>
    </div>
  ) : (
    <div>isLoading...</div>
  );
}
export default LangSettings;
