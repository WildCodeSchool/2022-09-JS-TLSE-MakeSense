import { useState, useRef, useEffect } from "react";
import Concerned from "@components/form/Concerned";
// imports WYSIWYG
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import to get datas on submit
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
// imports CSS
import "../../assets/css/header/AppBar.css";
import "../../assets/css/form/form.css";
// imports DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
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

  // const schema = Joi.object({
  //   title: Joi.string().min(5).max(250).message("Title is required").required(),
  //   description: Joi.string()
  //     .min(1)
  //     .message("Description is required")
  //     .required(),
  //   context: Joi.string().min(1).message("Context is required").required(),
  //   utility: Joi.string().min(1).message("Utility is required").required(),
  //   pros: Joi.string().min(1).message("Pros are required").required(),
  //   cons: Joi.string().min(1).message("Cons are required").required(),
  //   impacted: Joi.array().min(0).message("not working"),
  //   experts: Joi.array().min(0).message("not working"),
  //   firstDate: Joi.string().min(10).message("Date is required").required(),
  //   dateOpinion: Joi.string().min(10).message("Date is required").required(),
  //   dateFirstDecision: Joi.string()
  //     .min(10)
  //     .message("Date is required")
  //     .required(),
  //   dateEndConflict: Joi.string()
  //     .min(10)
  //     .message("Date is required")
  //     .required(),
  //   dateFinaleDecision: Joi.string()
  //     .min(10)
  //     .message("Date is required")
  //     .required(),
  // });

  const [users, setUsers] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [impacted, setImpacted] = useState([]);
  const [experts, setExpert] = useState([]);
  const [firstDate, setFirstDate] = useState(new Date());
  const [dateOpinion, setDateOpinion] = useState(new Date());
  const [dateFirstDecision, setDateFirstDecision] = useState(new Date());
  const [dateEndConflict, setDateEndConflict] = useState(new Date());
  const [dateFinaleDecision, setDateFinaleDecision] = useState(new Date());

  const { handleSubmit, setValue, getFieldState } = useForm({
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
    // resolver: joiResolver(schema),
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

  // useEffect(() => {
  //   setValue("impacted", impacted);
  //   setValue("experts", experts);
  // }, [impacted, experts]);

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
          <legend className="hello">
            Décrire tous les éléments de sa décision
          </legend>
          <label htmlFor="title">Titre</label>
          <br />
          <input
            type="text"
            name="title"
            id="title"
            // eslint-disable-next-line react/jsx-props-no-spreading
            onChange={(editorState) => {
              setValue("title", editorState);
            }}
          />
          {/* <p>{errors.title?.message}</p> */}
          <label htmlFor="description">Description de la décision</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            value=""
            onChange={(editorState) => {
              console.warn(editorState);
              setValue("description", editorState);
              const test = getFieldState("description");
              console.warn(test);
            }}
          />
          {/* <p>{errors.description?.message}</p> */}
          <label htmlFor="utility">Utilité pour l'organisation</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            value=""
            onChange={(editorState) => {
              setValue("utility", editorState);
            }}
          />
          {/* <p>{errors.utility?.message}</p> */}
          <label htmlFor="context">Contexte autour de la décision</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            value=""
            onChange={(editorState) => {
              setValue("context", editorState);
            }}
          />
          {/* <p>{errors.context?.message}</p> */}
          <label htmlFor="pros">Bénéfices</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            value=""
            onChange={(editorState) => {
              setValue("pros", editorState);
            }}
          />
          {/* <p>{errors.pros?.message}</p> */}
          <label htmlFor="cons">Inconvénients</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            value=""
            onChange={(editorState, e) => {
              setValue("cons", editorState);
            }}
          />
          {/* <p>{errors.cons?.message}</p> */}

          <legend>Définir les concernés et les experts</legend>
          <Concerned
            table={users}
            name="concernés"
            type={impacted}
            updateType={setImpacted}
          />
          {/* <p>{errors.impacted?.message}</p> */}

          <Concerned
            table={users}
            name="experts"
            type={experts}
            updateType={setExpert}
          />
          {/* <p>{errors.experts?.message}</p> */}
          <fieldset>
            <legend>Définir le calendrier</legend>
            <div className="datepicker">
              <p>Date de dépôt de la décision</p>
              <DatePicker
                selected={firstDate}
                minDate={firstDate}
                maxDate={firstDate}
                onChange={(d) => {
                  setFirstDate(d);
                  setValue("firstDate", format(d, "dd-MM-yyyy"));
                }}
              />
              {/* <p>{errors.firstDate?.message}</p> */}
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
              {/* <p>{errors.dateOpinion?.message}</p> */}
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
              {/* <p>{dateFirstDecision.firstDate?.message}</p> */}
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
              {/* <p>{errors.dateEndConflict?.message}</p> */}
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
              {/* <p>{errors.dateFinaleDecision?.message}</p> */}
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
