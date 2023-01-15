import { useState, useRef, useEffect } from "react";
import Concerned from "@components/form/Concerned";
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
import api from "@services/api";

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
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      context: "",
      utility: "",
      pros: "",
      cons: "",
      impacted: [],
      experts: [],
      firstDate: "",
      dateOpinion: "",
      dateFirstDecision: "",
      dateEndConflict: "",
      dateFinaleDecision: "",
    },
  });

  const [users, setUsers] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [impacted, setImpacted] = useState([]);
  const [experts, setExpert] = useState([]);
  const [firstDate, setFirstDate] = useState(new Date());
  const [dateOpinion, setDateOpinion] = useState(new Date());
  const [dateFirstDecision, setDateFirstDecision] = useState(new Date());
  const [dateEndConflict, setDateEndConflict] = useState(new Date());
  const [dateFinaleDecision, setDateFinaleDecision] = useState(new Date());

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

  function onSubmit(data) {
    setValue("impacted", impacted);
    setValue("experts", experts);
    console.warn(data);
    // const body = {
    //   content: JSON.stringify(data),
    //   status: 1,
    //   id_user_creator: 9,
    // };
    // return api
    //   .apipostmysql(`${import.meta.env.VITE_BACKEND_URL}/decisions`, body)
    //   .then((json) => {
    //     return json;
    //   });
  }

  return (
    isLoaded && (
      <div>
        <h1>Déposer une décision</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend className="hello">
              Décrire tous les éléments de sa décision
            </legend>
            <div>
              <label htmlFor="title">Titre</label>
              <br />
              <input
                type="text"
                name="title"
                id="title"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register("title")}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description de la décision</label>
              <ReactQuill
                theme="snow"
                modules={modules}
                value={undefined}
                onChange={(editorState) => {
                  setValue("description", editorState);
                }}
              />
            </div>
            <div>
              <label htmlFor="utility">Utilité pour l'organisation</label>
              <ReactQuill
                theme="snow"
                modules={modules}
                value={undefined}
                onChange={(editorState) => {
                  setValue("utility", editorState);
                }}
              />
            </div>
            <div>
              <label htmlFor="context">Contexte autour de la décision</label>
              <ReactQuill
                theme="snow"
                modules={modules}
                value={undefined}
                onChange={(editorState) => {
                  setValue("context", editorState);
                }}
              />
            </div>
            <div>
              <label htmlFor="pros">Bénéfices</label>
              <ReactQuill
                theme="snow"
                modules={modules}
                value={undefined}
                onChange={(editorState) => {
                  setValue("pros", editorState);
                }}
              />
            </div>
            <div>
              <label htmlFor="cons">Inconvénients</label>
              <ReactQuill
                theme="snow"
                modules={modules}
                value={undefined}
                onChange={(editorState) => {
                  setValue("cons", editorState);
                }}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Définir les concernés et les experts</legend>
            <Concerned
              table={users}
              name="concernés"
              type={impacted}
              updateType={setImpacted}
            />
            <Concerned
              table={users}
              name="experts"
              type={experts}
              updateType={setExpert}
            />
          </fieldset>

          <fieldset>
            <legend>Définir le calendrier</legend>
            <div className="datepicker">
              <p>Date de dépôt de la décision</p>
              <DatePicker
                selected={firstDate}
                minDate={firstDate}
                onChange={(d) => {
                  setFirstDate(d);
                  setValue("firstDate", format(d, "dd-MM-yyyy"));
                }}
              />
            </div>
            <div className="datepicker">
              <p>Fin de la prise des avis</p>
              <DatePicker
                selected={dateOpinion}
                minDate={firstDate}
                onChange={(d) => {
                  setDateOpinion(d);
                  setValue("dateOpinion", format(d, "dd-MM-yyyy"));
                }}
              />
            </div>
            <div className="datepicker">
              <p>Fin de la première décision</p>
              <DatePicker
                selected={dateFirstDecision}
                minDate={dateOpinion}
                onChange={(d) => {
                  setDateFirstDecision(d);
                  setValue("dateFirstDecision", format(d, "dd-MM-yyyy"));
                }}
              />
            </div>
            <div className="datepicker">
              <p>Fin du conflit sur la première décision</p>
              <DatePicker
                selected={dateEndConflict}
                minDate={dateFirstDecision}
                onChange={(d) => {
                  setDateEndConflict(d);
                  setValue("dateEndConflict", format(d, "dd-MM-yyyy"));
                }}
              />
            </div>
            <div className="datepicker">
              <p>Décision définitive</p>
              <DatePicker
                selected={dateFinaleDecision}
                minDate={dateEndConflict}
                onChange={(d) => {
                  setDateFinaleDecision(d);
                  setValue("dateFinaleDecision", format(d, "dd-MM-yyyy"));
                }}
              />
            </div>
          </fieldset>

          <input
            type="submit"
            className="buttonForm"
            value="Poster ma décision ! Youpiiiii"
          />
        </form>
      </div>
    )
  );
}
export default DecisionForm;
