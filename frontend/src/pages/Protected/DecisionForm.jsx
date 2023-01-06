import { useState } from "react";
import Concerned from "@components/form/Concerned";
import { USERS } from "@components/form/usersMock";
// imports WYSIWYG
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import to get datas on submit
import { useForm } from "react-hook-form";
// imports CSS
import "../../assets/css/header/AppBar.css";
import "../../assets/css/form/form.css";
// imports DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

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

function DecisionForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [impacted, setImpacted] = useState([]);
  const [experts, setExpert] = useState([]);

  const onSubmit = (data, e) => {
    setValue("impacted", impacted);
    setValue("experts", experts);
    console.warn(data);
  };

  // eslint-disable-next-line react/prop-types, react/no-unstable-nested-components
  function Field({ name, content }) {
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

  // eslint-disable-next-line react/prop-types, react/no-unstable-nested-components
  function Calendar({ id }) {
    const [date, setDate] = useState(new Date());

    const handleChange = (d) => {
      setDate(d);
      setValue(id, format(d, "dd-MM-yyyy"));
    };

    return (
      <div>
        <DatePicker selected={date} onChange={handleChange} id={id} />
      </div>
    );
  }

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
          <Concerned
            table={USERS}
            name="concernés"
            type={impacted}
            updateType={setImpacted}
          />
          <Concerned
            table={USERS}
            name="experts"
            type={experts}
            updateType={setExpert}
          />
        </fieldset>
        <button type="button">Définir le calendrier</button>
        <fieldset>
          <legend>Définir le calendrier</legend>
          <div className="datepicker">
            <p>Fin de la prise des avis</p>
            <Calendar id="opinion" />
          </div>
          <div className="datepicker">
            <p>Fin de la première décision</p>
            <Calendar id="firstDecision" />
          </div>
          <div className="datepicker">
            <p>Fin du conflit sur la première décision</p>
            <Calendar id="endConflict" />
          </div>
          <div className="datepicker">
            <p>Décision définitive</p>
            <Calendar id="finaleDecision" />
          </div>
        </fieldset>
        <input type="submit" value="Poster ma décision ! Youpiiiii" />
      </form>
    </div>
  );
}
export default DecisionForm;
