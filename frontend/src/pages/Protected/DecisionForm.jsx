import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/header/AppBar.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";

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

function DatePick() {
  const [date, setDate] = useState(new Date());
  const onChange = (thedate) => {
    setDate(thedate);
    // eslint-disable-next-line no-restricted-syntax
    console.log(thedate);
  };
  return (
    <ReactDatePicker selected={date} onChange={onChange} selectsRange inline />
  );
}

function Field(props) {
  return (
    <div>
      <label htmlFor="email">{props.name}</label>
      <ReactQuill theme="snow" value={props.value} modules={modules} />
    </div>
  );
}

function DecisionForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  // // =>>>>>> https://www.react-hook-form.com/
  // // https://codesandbox.io/s/cdjru?file=/src/App.js:325-427l

  // useEffect(() => {
  //   register("", { required: true, minLength: 11 });
  // }, [register]);

  return (
    <div>
      <h1>Déposer une décision</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Décrire tous les éléments de sa décision</legend>
          <div>
            <label htmlFor="title">Titre</label>
            <br />
            <input type="text" name="title" id="title" required />
          </div>
          <Field name="Description de la décision" value="description" />
          <Field name="Utilité pour l'organisation" value="utility" />
          <Field name="Contexte autour de la décision" value="context" />
          <Field name="Bénéfices" value="pros" />
          <Field name="Inconvénients" value="cons" />
        </fieldset>
        {
          // button pass to next
        }
        <button type="button">Passer aux concernés</button>
        <fieldset>
          <legend>Définir les concernés et les experts</legend>
        </fieldset>
        <button type="button">Définir le calendrier</button>
        <fieldset>
          <legend>Définir le calendrier</legend>
          <select name="pets" id="pet-select">
            <option value="">-- Choisir les prochaines dates --</option>
            <option value="opinion">Fin de la prise des avis</option>
            <option value="first-decision">
              Fin de la première prise de décision
            </option>
            <option value="conflict">
              Fin du conflit sur première décision
            </option>
            <option value="definitive-decision">Décision définitive</option>
          </select>
          <DatePick />
          <input type="checkbox" />
          <p>Ne pas définir de date pour cette étape</p>
          <div>
            <input type="submit" value="Poster ma décision ! Youpiiiii" />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
export default DecisionForm;
