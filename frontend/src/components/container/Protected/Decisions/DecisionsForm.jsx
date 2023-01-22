import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../../../services/api";
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

  const navigate = useNavigate();

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

  const getUsers = async () => {
    const callAllUsers = await api.apigetmysql(
      `${import.meta.env.VITE_BACKEND_URL}/users`
    );
    const usersWithType = callAllUsers.map((u) => {
      return {
        ...u,
        form: "user",
      };
    });
    setUsers(usersWithType);
    const callAllGroups = await api.apigetmysql(
      `${import.meta.env.VITE_BACKEND_URL}/groups`
    );
    const groupsWithType = callAllGroups.map((u) => {
      return {
        ...u,
        form: "group",
      };
    });
    setGroups(groupsWithType);
    setIsLoaded(true);
  };

  useEffect(() => {
    getUsers();
    setUsersAndGroups(users);
  }, [isLoaded]);

  // eslint-disable-next-line consistent-return
  function handleSubmit(e) {
    e.preventDefault();

    // handle impacted and experts
    if (impacted.length > 0) {
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
      experts.forEach((expert) => {
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
        <div className="space-y-6">
          <form
            onSubmit={handleSubmit}
            className="sm:rounded-lg mt-8 max-w-7xl mx-auto space-y-6"
          >
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mt-8 max-w-7xl mx-auto">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1 border-r border-r-gray-300">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Description
                  </h3>
                  <p className="mt-1 text-xl text-gray-500">
                    Décrire ici toutes les informations concernant la
                    description.
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="">
                    <div className="">
                      <div className="my-10">
                        <label
                          htmlFor="company-website"
                          className="block text-xl font-medium text-gray-700"
                        >
                          Titre
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="title"
                            id="title"
                            value={form.title}
                            onChange={(event) => {
                              setForm({
                                ...form,
                                [event.target.name]: event.target.value,
                              });
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                        {errors &&
                          errors.map((error) => {
                            if (error.path[0] === "title") {
                              return (
                                <div
                                  key={error.context.key}
                                  className="text-rose-500"
                                >
                                  Ce champs est requis et doit contenir au moins
                                  5 caractères.
                                </div>
                              );
                            }
                            return null;
                          })}
                      </div>
                      <div className="my-10">
                        <label htmlFor="description">
                          Description de la décision
                        </label>
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          name="description"
                          value={form.description}
                          onChange={(event) => {
                            setForm({ ...form, description: event });
                          }}
                        />
                        {errors &&
                          errors.map((error) => {
                            if (error.path[0] === "description") {
                              return (
                                <div
                                  key={error.context.key}
                                  className="text-rose-500	"
                                >
                                  Ce champs est requis et doit contenir au moins
                                  5 caractères.
                                </div>
                              );
                            }
                            return null;
                          })}
                      </div>
                      <div className="my-10">
                        <label htmlFor="utility">
                          Utilité pour l'organisation
                        </label>
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          name="utility"
                          value={form.utility}
                          onChange={(event) => {
                            setForm({ ...form, utility: event });
                          }}
                        />
                        {errors &&
                          errors.map((error) => {
                            if (error.path[0] === "utility") {
                              return (
                                <div
                                  key={error.context.key}
                                  className="text-rose-500	"
                                >
                                  Ce champs est requis et doit contenir au moins
                                  5 caractères.
                                </div>
                              );
                            }
                            return null;
                          })}
                      </div>
                      <div className="my-10">
                        <label htmlFor="context">
                          Contexte autour de la décision
                        </label>
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          name="context"
                          value={form.context}
                          onChange={(event) => {
                            setForm({ ...form, context: event });
                          }}
                        />
                        {errors &&
                          errors.map((error) => {
                            if (error.path[0] === "context") {
                              return (
                                <div
                                  key={error.context.key}
                                  className="text-rose-500	"
                                >
                                  Ce champs est requis et doit contenir au moins
                                  5 caractères.
                                </div>
                              );
                            }
                            return null;
                          })}
                      </div>
                      <div className="my-10">
                        <label htmlFor="pros">Bénéfices</label>
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          value={form.pros}
                          onChange={(event) => {
                            setForm({ ...form, pros: event });
                          }}
                        />
                        {errors &&
                          errors.map((error) => {
                            if (error.path[0] === "pros") {
                              return (
                                <div
                                  key={error.context.key}
                                  className="text-rose-500	"
                                >
                                  Ce champs est requis et doit contenir au moins
                                  5 caractères.
                                </div>
                              );
                            }
                            return null;
                          })}
                      </div>
                      <div className="my-10">
                        <label htmlFor="cons">Inconvénients</label>
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          value={form.cons}
                          onChange={(event) => {
                            setForm({ ...form, cons: event });
                          }}
                        />
                        {errors &&
                          errors.map((error) => {
                            if (error.path[0] === "cons") {
                              return (
                                <div
                                  key={error.context.key}
                                  className="text-rose-500	"
                                >
                                  Ce champs est requis et doit contenir au moins
                                  5 caractères.
                                </div>
                              );
                            }
                            return null;
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1 border-r border-r-gray-300">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Personnes concernées
                  </h3>
                  <p className="mt-1 text-xl text-gray-500">
                    Désigner les personnes concernées (impactées ou expertes)
                    par la décision
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="">
                    <div className="">
                      <Concerned
                        table={usersAndGroups}
                        name="impactés"
                        type={impacted}
                        updateType={(event) => setImpacted(event)}
                      />

                      <Concerned
                        table={usersAndGroups}
                        name="experts"
                        type={experts}
                        updateType={(event) => setExperts(event)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1 border-r border-r-gray-300">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Calendrier
                  </h3>
                  <p className="mt-1 text-xl text-gray-500">
                    Définir le calendrier de la prise de décision
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
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
                          <div
                            key={error.context.key}
                            className="text-rose-500	"
                          >
                            Cette date doit être supérieure à la date
                            d'aujourd'hui.
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
                          <div
                            key={error.context.key}
                            className="text-rose-500	"
                          >
                            Cette date doit être supérieure à la date
                            d'aujourd'hui..
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
                          <div
                            key={error.context.key}
                            className="text-rose-500	"
                          >
                            Cette date doit être supérieure à la date
                            d'aujourd'hui.
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
                            Cette date doit être supérieure à la date
                            d'aujourd'hui.
                          </div>
                        );
                      }
                      return null;
                    })}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-xl font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
export default DecisionsForm;
