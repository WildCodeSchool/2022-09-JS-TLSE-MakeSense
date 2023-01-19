import { useState, useMemo, useEffect } from "react";
import Joi from "joi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../../assets/css/header/AppBar.css";
import "../../../../assets/css/form/form.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "@services/api";
import Concerned from "./form/Concerned";
import { useAuth } from "../../../../contexts/useAuth";

function DecisionsForm() {
  // set options WYSIWYG
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  // get user logged in from Context
  const { user } = useAuth();

  // form verifications in frontend before post decision
  const decisionSchema = Joi.object({
    title: Joi.string().min(5).max(250).message("Title is required").required(),
    description: Joi.string().min(5).required(),
    context: Joi.string().min(5).required(),
    utility: Joi.string().min(5).required(),
    pros: Joi.string().min(5).required(),
    cons: Joi.string().min(5).required(),
    impacted: Joi.array().min(0),
    experts: Joi.array().min(0),
    firstDate: Joi.date().required(),
    dateOpinion: Joi.date().required(),
    dateFirstDecision: Joi.date().required(),
    dateEndConflict: Joi.date().required(),
    dateFinaleDecision: Joi.date().required(),
  });

  // states for form
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [usersAndGroups, setUsersAndGroups] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    utility: "",
    context: "",
    pros: "",
    cons: "",
    impacted: [],
    experts: [],
    firstDate: new Date(),
    dateOpinion: new Date(),
    dateFirstDecision: new Date(),
    dateEndConflict: new Date(),
    dateFinaleDecision: new Date(),
  });

  const getUsers = async () => {
    const callAllUsers = await api.apigetmysql(
      `${import.meta.env.VITE_BACKEND_URL}/users`
    );
    setUsers(callAllUsers);
    const callAllGroups = await api.apigetmysql(
      `${import.meta.env.VITE_BACKEND_URL}/groups`
    );
    setGroups(callAllGroups);
    setIsLoaded(true);
  };

  useEffect(() => {
    getUsers();
    setUsersAndGroups(users.concat(groups));
  }, [isLoaded]);

  function handleSubmit(e) {
    e.preventDefault();
    const options = {
      abortEarly: false,
    };
    const result = decisionSchema.validate(form, options);
    if (result.error) {
      console.warn("il y a une erreur");
      return <div />;
    }
    const body = {
      content: JSON.stringify(result.value),
      status: 1,
      id_user_creator: user.id,
    };
    return api
      .apipostmysql(`${import.meta.env.VITE_BACKEND_URL}/decisions`, body)
      .then((json) => {
        return json;
      });
  }

  return (
    isLoaded && (
      <div>
        <h1>Déposer une décision</h1>
        <form onSubmit={handleSubmit}>
          <legend className="hello">
            Décrire tous les éléments de sa décision
          </legend>
          <label htmlFor="title">Titre</label>
          <br />
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={(event) => {
              setForm({ ...form, [event.target.name]: event.target.value });
            }}
          />
          <label htmlFor="description">Description de la décision</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            name="description"
            value={form.description}
            onChange={(event) => {
              setForm({ ...form, description: event });
            }}
          />
          <label htmlFor="utility">Utilité pour l'organisation</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            name="utility"
            value={form.utility}
            onChange={(event) => {
              setForm({ ...form, utility: event });
            }}
          />
          <label htmlFor="context">Contexte autour de la décision</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            name="context"
            value={form.context}
            onChange={(event) => {
              setForm({ ...form, context: event });
            }}
          />
          <label htmlFor="pros">Bénéfices</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            value={form.pros}
            onChange={(event) => {
              setForm({ ...form, pros: event });
            }}
          />
          <label htmlFor="cons">Inconvénients</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            value={form.cons}
            onChange={(event) => {
              setForm({ ...form, cons: event });
            }}
          />

          <legend>Définir les concernés et les experts</legend>
          <Concerned
            table={usersAndGroups}
            name="concernés"
            type={form.impacted}
            updateType={(event) => setForm({ ...form, impacted: event })}
          />

          <Concerned
            table={usersAndGroups}
            name="experts"
            type={form.experts}
            updateType={(event) => setForm({ ...form, experts: event })}
          />
          <fieldset>
            <legend>Définir le calendrier</legend>
            <div className="datepicker">
              <p>Date de dépôt de la décision</p>
              <DatePicker
                selected={form.firstDate}
                minDate={form.firstDate}
                maxDate={form.firstDate}
                onChange={(d) => {
                  setForm({ ...form, firstDate: d });
                }}
              />
            </div>
            <div className="datepicker">
              <p>Fin de la prise des avis</p>
              <DatePicker
                selected={form.dateOpinion}
                minDate={form.firstDate}
                onChange={(d) => {
                  setForm({ ...form, dateOpinion: d });
                }}
              />
            </div>
            <div className="datepicker">
              <p>Fin de la première décision</p>
              <DatePicker
                selected={form.dateFirstDecision}
                minDate={form.dateOpinion}
                onChange={(d) => {
                  setForm({ ...form, dateFirstDecision: d });
                }}
              />
            </div>
            <div className="datepicker">
              <p>Fin du conflit sur la première décision</p>
              <DatePicker
                selected={form.dateEndConflict}
                minDate={form.dateFirstDecision}
                onChange={(d) => {
                  setForm({ ...form, dateEndConflict: d });
                }}
              />
            </div>
            <div className="datepicker">
              <p>Décision définitive</p>
              <DatePicker
                selected={form.dateFinaleDecision}
                minDate={form.dateEndConflict}
                onChange={(d) => {
                  setForm({ ...form, dateFinaleDecision: d });
                }}
              />
            </div>
          </fieldset>
          <button type="submit" className="buttonForm">
            Poster ma décision
          </button>
        </form>
      </div>
    )
  );
}
export default DecisionsForm;
