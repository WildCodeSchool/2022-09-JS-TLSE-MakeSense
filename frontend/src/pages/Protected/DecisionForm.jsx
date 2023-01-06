import { useEffect, useState, useRef } from "react";
// import WYSIWYG
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import pour récupérer les données
import { useForm } from "react-hook-form";
// import CSS
import "../../assets/css/header/AppBar.css";
import "../../assets/css/form/form.css";
import { Impacted, Expert } from "@components/form/Concerned";
import { USERS } from "@components/form/usersMock";
import DatePick from "@components/form/DatePicker";

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

function DecisionForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.warn(data);
  };

  // eslint-disable-next-line react/prop-types, react/no-unstable-nested-components
  function Field({ name, content }) {
    // console.warn(divTest);

    const onEditorStateChange = (editorState) => {
      setValue(content, editorState);
    };

    // outil de Léon : tinyMCE (il faut s'inscrire)
    return (
      <div>
        <label htmlFor="email">{name}</label>
        <ReactQuill
          theme="snow"
          modules={modules}
          value={undefined}
          onChange={onEditorStateChange}
        />
      </div>
    );
  }

  const divTest = useRef(null);

  return (
    <div>
      <h1>Déposer une décision</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Décrire tous les éléments de sa décision</legend>
          <div>
            <label htmlFor="title">Titre</label>
            <br />
            <input
              type="text"
              name="title"
              id="title"
              required
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("title")}
            />
          </div>
          <Field name="Description de la décision" content="description" />
          <Field name="Utilité pour l'organisation" content="utility" />
          <Field name="Contexte autour de la décision" content="context" />
          <Field name="Bénéfices" content="pros" />
          <Field name="Inconvénients" content="cons" />
        </fieldset>
        {
          // button pass to next
        }
        <button type="button">Passer aux concernés</button>
        <fieldset>
          <legend>Définir les concernés et les experts</legend>
          <Impacted table={USERS} name="concernés" />
          <Expert table={USERS} name="experts" />
        </fieldset>
        <button type="button">Définir le calendrier</button>
        <fieldset>
          <legend>Définir le calendrier</legend>
          <div className="datepicker" ref={divTest}>
            <p>Fin de la prise des avis</p>
            <DatePick id="opinion" />
          </div>
          <div className="datepicker">
            <p>Fin de la première décision</p>
            <DatePick id="firstDecision" />
          </div>
          <div className="datepicker">
            <p>Fin du conflit sur la première décision</p>
            <DatePick id="endConflict" />
          </div>
          <div className="datepicker">
            <p>Décision définitive</p>
            <DatePick id="finaleDecision" />
          </div>
        </fieldset>
        <input type="submit" value="Poster ma décision ! Youpiiiii" />
      </form>
    </div>
  );
}
export default DecisionForm;
