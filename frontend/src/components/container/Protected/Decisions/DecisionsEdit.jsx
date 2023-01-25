import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Joi from "joi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "@services/api";
import Concerned from "./form/Concerned";
import { useAuth } from "../../../../contexts/useAuth";

function DecisionsForm() {
  const navigate = useNavigate();
  const URLParam = useLocation().search;
  const id = new URLSearchParams(URLParam).get("id")
    ? new URLSearchParams(URLParam).get("id")
    : navigate("/user/decisions");

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
    firstDate: Joi.date().required(),
    dateOpinion: Joi.date().greater(new Date()).required(),
    dateFirstDecision: Joi.date().greater(new Date()).required(),
    dateEndConflict: Joi.date().greater(new Date()).required(),
    dateFinaleDecision: Joi.date().greater(new Date()).required(),
  });

  // states for form
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [impacted, setImpacted] = useState([]);
  const [experts, setExperts] = useState([]);
  const [usersAndGroups, setUsersAndGroups] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    utility: "",
    context: "",
    pros: "",
    cons: "",
    firstDate: new Date(),
    dateOpinion: new Date(),
    dateFirstDecision: new Date(),
    dateEndConflict: new Date(),
    dateFinaleDecision: new Date(),
  });

  // state to get the original data and to update it
  const [decisionsData, setDecisionsData] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const [decisionDescription, setDecisionDescription] = useState();
  const [decisionContext, setDecisionContext] = useState();
  const [decisionUtility, setDecisionUtility] = useState();
  const [decisionPros, setDecisionPros] = useState();
  const [decisionCons, setDecisionCons] = useState();

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

  // useEffect to set the original data
  useEffect(() => {
    const getDecisionsData = async () => {
      // get the original decision
      const getDecisions = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`
      );
      setDecisionsData(getDecisions);
      setDecisionDescription(getDecisions.content.description);
      setDecisionContext(getDecisions.content.context);
      setDecisionUtility(getDecisions.content.utility);
      setDecisionPros(getDecisions.content.pros);
      setDecisionCons(getDecisions.content.cons);
    };
    getDecisionsData(); // lance la fonction getDecisionsData
  }, [updateData]);

  useEffect(() => {
    getUsers();
    setUsersAndGroups(users);
  }, [isLoaded]);

  // eslint-disable-next-line consistent-return
  function handleSubmit(e) {
    e.preventDefault();

    // handle impacted and experts
    if (impacted.length > 0) {
      console.warn("il y a des impactés");
      impacted.forEach((impac) => {
        const body = {
          id_user_impact: impac.id,
        };
        return api
          .apipostmysql(`${import.meta.env.VITE_BACKEND_URL}/impacted`, body)
          .then((json) => {
            return json;
          });
      });
    }
    if (experts.length > 0) {
      console.warn("il y a des experts");
      experts.forEach((expert) => {
        console.warn(expert);
        const body = {
          id_user_expert: expert.id,
        };
        return api
          .apipostmysql(`${import.meta.env.VITE_BACKEND_URL}/experts`, body)
          .then((json) => {
            return json;
          });
      });
    }

    // handle errors
    setErrors("");
    const options = {
      abortEarly: false,
    };
    const result = decisionSchema.validate(form, options);
    if (result.error) {
      setErrors(result.error.details);
    } else {
      console.warn("il n'y a pas d'erreur");
      const body = {
        content: JSON.stringify(result.value),
        status: 1,
        id_user_creator: user.id,
      };
      setIsSubmit(true);
      return api
        .apipostmysql(`${import.meta.env.VITE_BACKEND_URL}/decisions`, body)
        .then((json) => {
          return json;
        });
    }
  }

  return (
    isLoaded && (
      <div>
        {isSubmit && (
          <>
            <button
              type="button"
              aria-label="form submit"
              className="modal-overlay"
              onClick={() => setIsSubmit(!isSubmit)}
            />
            <div className="modal">
              <h2>Le formulaire a été soumis avec succès !</h2>
              <button
                type="submit"
                onClick={() => {
                  navigate(`/user/decisions`);
                }}
              >
                Revenir à la page d'accueil
              </button>
            </div>
          </>
        )}
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
          {errors &&
            errors.map((error) => {
              if (error.path[0] === "title") {
                return (
                  <div key={error.context.key} className="field-error">
                    Ce champs est requis et doit contenir au moins 5 caractères.
                  </div>
                );
              }
              return null;
            })}
          <label htmlFor="description">Description de la décision</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            name="description"
            value={decisionDescription}
            onChange={(event) => {
              setForm({ ...form, description: event });
            }}
          />
          {errors &&
            errors.map((error) => {
              if (error.path[0] === "description") {
                return (
                  <div key={error.context.key} className="field-error">
                    Ce champs est requis et doit contenir au moins 5 caractères.
                  </div>
                );
              }
              return null;
            })}
          <label htmlFor="utility">Utilité pour l'organisation</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            name="utility"
            value={decisionUtility}
            onChange={(event) => {
              setForm({ ...form, utility: event });
            }}
          />
          {errors &&
            errors.map((error) => {
              if (error.path[0] === "utility") {
                return (
                  <div key={error.context.key} className="field-error">
                    Ce champs est requis et doit contenir au moins 5 caractères.
                  </div>
                );
              }
              return null;
            })}
          <label htmlFor="context">Contexte autour de la décision</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            name="context"
            value={decisionContext}
            onChange={(event) => {
              setForm({ ...form, context: event });
            }}
          />
          {errors &&
            errors.map((error) => {
              if (error.path[0] === "context") {
                return (
                  <div key={error.context.key} className="field-error">
                    Ce champs est requis et doit contenir au moins 5 caractères.
                  </div>
                );
              }
              return null;
            })}
          <label htmlFor="pros">Bénéfices</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            value={decisionPros}
            onChange={(event) => {
              setForm({ ...form, pros: event });
            }}
          />
          {errors &&
            errors.map((error) => {
              if (error.path[0] === "pros") {
                return (
                  <div key={error.context.key} className="field-error">
                    Ce champs est requis et doit contenir au moins 5 caractères.
                  </div>
                );
              }
              return null;
            })}
          <label htmlFor="cons">Inconvénients</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            defaultValue={decisionCons}
            onChange={(event) => {
              setForm({ ...form, cons: event });
            }}
          />
          {errors &&
            errors.map((error) => {
              if (error.path[0] === "cons") {
                return (
                  <div key={error.context.key} className="field-error">
                    Ce champs est requis et doit contenir au moins 5 caractères.
                  </div>
                );
              }
              return null;
            })}
          <legend>Définir les concernés et les experts</legend>
          <Concerned
            table={usersAndGroups}
            name="concernés"
            type={impacted}
            updateType={(event) => setImpacted(event)}
          />

          <Concerned
            table={usersAndGroups}
            name="experts"
            type={experts}
            updateType={(event) => setExperts(event)}
          />
          <fieldset>
            <legend>Définir le calendrier</legend>
            <div className="datepicker">
              <p>Date de dépôt de la décision</p>
              <DatePicker
                selected={form.firstDate}
                minDate={form.firstDate}
                maxDate={form.firstDate}
                readOnly
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
            {errors &&
              errors.map((error) => {
                if (error.path[0] === "dateOpinion") {
                  return (
                    <div key={error.context.key} className="field-error">
                      Cette date doit être supérieure à la date d'aujourd'hui.
                    </div>
                  );
                }
                return null;
              })}
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
            {errors &&
              errors.map((error) => {
                if (error.path[0] === "dateFirstDecision") {
                  return (
                    <div key={error.context.key} className="field-error">
                      Cette date doit être supérieure à la date d'aujourd'hui..
                    </div>
                  );
                }
                return null;
              })}
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
            {errors &&
              errors.map((error) => {
                if (error.path[0] === "dateEndConflict") {
                  return (
                    <div key={error.context.key} className="field-error">
                      Cette date doit être supérieure à la date d'aujourd'hui.
                    </div>
                  );
                }
                return null;
              })}
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
            {errors &&
              errors.map((error) => {
                if (error.path[0] === "dateFinaleDecision") {
                  return (
                    <div key={error.context.key} className="field-error">
                      Cette date doit être supérieure à la date d'aujourd'hui.
                    </div>
                  );
                }
                return null;
              })}
          </fieldset>
          <button
            type="submit"
            className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-m px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Valider les modifications
          </button>
        </form>
      </div>
    )
  );
}
export default DecisionsForm;
