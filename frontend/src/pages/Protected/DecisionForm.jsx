import { useState, useMemo, useEffect } from "react";
import Concerned from "@components/form/Concerned";
// imports WYSIWYG
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// imports CSS
import "../../assets/css/header/AppBar.css";
import "../../assets/css/form/form.css";
// imports DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "@services/api";

function DecisionForm() {
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

  const [users, setUsers] = useState();
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
    setIsLoaded(true);
  };

  useEffect(() => {
    getUsers();
  }, [isLoaded]);

  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      content: JSON.stringify(form),
      status: 1,
      id_user_creator: 9,
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
            table={users}
            name="concernés"
            type={form.impacted}
            updateType={(event) => setForm({ ...form, impacted: event })}
          />

          <Concerned
            table={users}
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
export default DecisionForm;
