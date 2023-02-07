import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../../../services/api";
import Concerned from "./form/Concerned";
import { useAuth } from "../../../../contexts/useAuth";
import { Text } from "../../../../contexts/Language";

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
  const [usersImpacted, setUsersImpacted] = useState([]);
  const [usersExperts, setUsersExperts] = useState([]);
  const [groupsImpacted, setGroupsImpacted] = useState([]);
  const [groupsExperts, setGroupsExperts] = useState([]);
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
    dateOpinion: new Date().setDate(new Date().getDate() + 1),
    dateFirstDecision: new Date().setDate(new Date().getDate() + 1),
    dateEndConflict: new Date().setDate(new Date().getDate() + 1),
    dateFinaleDecision: new Date().setDate(new Date().getDate() + 1),
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
  }, [isLoaded]);

  // eslint-disable-next-line consistent-return
  async function handleSubmit(e) {
    e.preventDefault();
    // handle errors
    setErrors("");
    const options = {
      abortEarly: false,
    };
    const result = decisionSchema.validate(form, options);
    if (result.error) {
      setErrors(result.error.details);
    } else {
      const body = {
        content: JSON.stringify(result.value),
        status: 1,
        id_user_creator: user.id,
        users_impact: usersImpacted,
        users_expert: usersExperts,
        groups_impact: groupsImpacted,
        groups_expert: groupsExperts,
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
          <div
            id="popup-modal"
            tabIndex="-1"
            className="fixed top-0 left-0 right-0 z-50 p-4 h-full overflow-x-hidden overflow-y-auto flex flex-col justify-center items-center backdrop-blur"
          >
            <div className="w-full max-w-md md:h-auto">
              <div className="relative bg-white rounded-lg shadow">
                <div className="p-6 text-center">
                  <h3 className="mb-5 text-lg font-normal text-gray-500">
                    <Text tid="theformhasbeensubmittedsuccessfully!" />
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => {
                      navigate(`/user/decisions`);
                    }}
                  >
                    <Text tid="backtodecisions" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="space-y-6">
          <form
            onSubmit={handleSubmit}
            className="sm:rounded-lg mt-8 max-w-7xl mx-auto space-y-6"
          >
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mt-8 mx-auto">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1 border-r border-r-gray-300">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    <Text tid="description" />
                  </h3>
                  <p className="mt-1 text-mb text-gray-500">
                    <Text tid="describeherealltheinformationconcerningthedescription" />
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="my-10">
                    <label
                      htmlFor="company-website"
                      className="block text-mb font-medium text-gray-700"
                    >
                      <Text tid="title" />
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:outline-2 focus:outline-cyan-800 w-full p-2.5"
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
                              <Text tid="Thisfieldisrequiredandmustcontainatleast5characters" />
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>
                  <div className="my-10">
                    <label
                      htmlFor="company-website"
                      className="block text-mb font-medium text-gray-700 mb-3"
                    >
                      <Text tid="description" />
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
                              <Text tid="Thisfieldisrequiredandmustcontainatleast5characters" />
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>
                  <div className="my-10">
                    <label
                      htmlFor="company-website"
                      className="block text-mb font-medium text-gray-700 mb-3"
                    >
                      <Text tid="usefulnessfortheorganization" />
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
                              <Text tid="Thisfieldisrequiredandmustcontainatleast5characters" />
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>
                  <div className="my-10">
                    <label
                      htmlFor="company-website"
                      className="block text-mb font-medium text-gray-700 mb-3"
                    >
                      {" "}
                      <Text tid="contextaroundthedecision" />
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
                              <Text tid="Thisfieldisrequiredandmustcontainatleast5characters" />
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>
                  <div className="my-10">
                    <label
                      htmlFor="company-website"
                      className="block text-mb font-medium text-gray-700 mb-3"
                    >
                      {" "}
                      <Text tid="benefits" />
                    </label>
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
                              <Text tid="Thisfieldisrequiredandmustcontainatleast5characters" />
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>
                  <div className="my-10">
                    <label
                      htmlFor="company-website"
                      className="block text-mb font-medium text-gray-700 mb-3"
                    >
                      {" "}
                      <Text tid="disadvantages" />
                    </label>
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
                              <Text tid="Thisfieldisrequiredandmustcontainatleast5characters" />
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1 border-r border-r-gray-300">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    <Text tid="peopleconcerned" />
                  </h3>
                  <p className="mt-1 text-mb text-gray-500">
                    <Text tid="designatethepeopleconcerned" />
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="mr-4">
                    <Concerned
                      table={users}
                      name="personnes impactées"
                      type={usersImpacted}
                      updateType={(event) => setUsersImpacted(event)}
                    />

                    <Concerned
                      table={users}
                      name="personnes expertes"
                      type={usersExperts}
                      updateType={(event) => setUsersExperts(event)}
                    />
                  </div>
                  <div className="mr-4">
                    <Concerned
                      table={groups}
                      name="groupes impactés"
                      type={groupsImpacted}
                      updateType={(event) => setGroupsImpacted(event)}
                    />

                    <Concerned
                      table={groups}
                      name="groupes experts"
                      type={groupsExperts}
                      updateType={(event) => setGroupsExperts(event)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1 border-r border-r-gray-300">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    <Text tid="calendar" />
                  </h3>
                  <p className="mt-1 text-mb text-gray-500">
                    <Text tid="setdecision-makingtimeline" />
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="my-5">
                    <p className="mb-5">
                      <Text tid="dateoffilingofthedecision" />
                    </p>
                    <DatePicker
                      selected={form.firstDate}
                      minDate={form.firstDate}
                      maxDate={form.firstDate}
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-400 text-l w-1/3 rounded-lg p-2.5 focus:outline-none"
                    />
                  </div>
                  <div className="my-5">
                    <p className="mb-5">
                      <Text tid="deadlinetogivefeedback" />
                    </p>
                    <DatePicker
                      selected={form.dateOpinion}
                      minDate={form.firstDate}
                      onChange={(d) => {
                        setForm({ ...form, dateOpinion: d });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-l w-1/3 rounded-lg p-2.5 focus:outline-2 focus:outline-cyan-800"
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
                            <Text tid="thisdatemustbegreaterthanthedateoftoday" />
                          </div>
                        );
                      }
                      return null;
                    })}
                  <div className="my-5">
                    <p className="mb-5">
                      <Text tid="dateofirstdecision" />
                    </p>
                    <DatePicker
                      selected={form.dateFirstDecision}
                      minDate={form.dateOpinion}
                      onChange={(d) => {
                        setForm({ ...form, dateFirstDecision: d });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-l w-1/3 rounded-lg p-2.5 focus:outline-2 focus:outline-cyan-800"
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
                            <Text tid="thisdatemustbegreaterthanthedateoftoday" />
                          </div>
                        );
                      }
                      return null;
                    })}
                  <div className="my-5">
                    <p className="mb-5">
                      <Text tid="deadlinetoenterdispute" />
                    </p>
                    <DatePicker
                      selected={form.dateEndConflict}
                      minDate={form.dateFirstDecision}
                      onChange={(d) => {
                        setForm({ ...form, dateEndConflict: d });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-l w-1/3 rounded-lg p-2.5 focus:outline-2 focus:outline-cyan-800"
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
                            <Text tid="thisdatemustbegreaterthanthedateoftoday" />
                          </div>
                        );
                      }
                      return null;
                    })}
                  <div className="my-5">
                    <p className="mb-5">
                      <Text tid="Date of final decision" />
                    </p>
                    <DatePicker
                      selected={form.dateFinaleDecision}
                      minDate={form.dateEndConflict}
                      onChange={(d) => {
                        setForm({ ...form, dateFinaleDecision: d });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-l w-1/3 rounded-lg p-2.5 focus:outline-2 focus:outline-cyan-800"
                    />
                  </div>
                  {errors &&
                    errors.map((error) => {
                      if (error.path[0] === "dateFinaleDecision") {
                        return (
                          <div key={error.context.key} className="field-error">
                            <Text tid="thisdatemustbegreaterthanthedateoftoday" />
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
                className="text-calypso hover:text-gray-600 border border-calypso font-medium rounded-lg text-m px-5 py-2.5 m-5 text-center"
                onClick={() => {
                  navigate(`/user`);
                }}
              >
                <Text tid="cancel" />
              </button>
              <button
                type="submit"
                className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-m px-5 py-2.5 m-5 text-center"
              >
                <Text tid="save" />
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
export default DecisionsForm;
