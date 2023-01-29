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
import { Text } from "../../../../contexts/Language";

function DecisionsEdit() {
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
  const [usersImpacted, setUsersImpacted] = useState([]);
  const [usersExperts, setUsersExperts] = useState([]);
  const [groupsImpacted, setGroupsImpacted] = useState([]);
  const [groupsExperts, setGroupsExperts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  let idCreator = "";
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

  // useEffect to set the original data
  useEffect(() => {
    const getAllData = async () => {
      // get the users
      const callAllUsers = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/users`
      );
      setUsers(callAllUsers);
      // get all groups
      const callAllGroups = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/groups`
      );
      setGroups(callAllGroups);
      // get the original decision
      const getDecisions = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`
      );
      idCreator = getDecisions.id_user_creator;
      setForm({
        title: JSON.parse(getDecisions.decision.content).title,
        description: JSON.parse(getDecisions.decision.content).description,
        utility: JSON.parse(getDecisions.decision.content).context,
        context: JSON.parse(getDecisions.decision.content).utility,
        pros: JSON.parse(getDecisions.decision.content).pros,
        cons: JSON.parse(getDecisions.decision.content).cons,
        firstDate: new Date(
          JSON.parse(getDecisions.decision.content).firstDate
        ),
        dateOpinion: new Date(
          JSON.parse(getDecisions.decision.content).dateOpinion
        ),
        dateFirstDecision: new Date(
          JSON.parse(getDecisions.decision.content).dateFirstDecision
        ),
        dateEndConflict: new Date(
          JSON.parse(getDecisions.decision.content).dateEndConflict
        ),
        dateFinaleDecision: new Date(
          JSON.parse(getDecisions.decision.content).dateFinaleDecision
        ),
      });

      // function de formatage
      function formatConcerned(state) {
        // Formatage du json pour le paquet
        const value = state.map((item) => {
          return {
            ...item,
            id: item.id.toString(),
            text: item.firstname
              ? `${item.firstname} ${item.lastname}`
              : `${item.name}`,
          };
        });
        return value;
      }
      setUsersImpacted(formatConcerned(getDecisions.uimpacted));
      setUsersExperts(formatConcerned(getDecisions.uexpert));
      setGroupsImpacted(formatConcerned(getDecisions.gimpacted));
      setGroupsExperts(formatConcerned(getDecisions.gexpert));
      setIsLoaded(true); // enfin nous avons tout
    };
    getAllData(); // lance la fonction getDecisionsData
  }, [isLoaded]);

  // eslint-disable-next-line consistent-return
  function handleSubmitNewData(e) {
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
      console.warn("il n'y a pas d'erreur");
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
        .apiputmysql(
          `${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`,
          body
        )
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
              <h2>
                <Text tid="theformhasbeensubmittedsuccessfully!" />
              </h2>
              <button
                type="submit"
                onClick={() => {
                  navigate(`/user/decisions`);
                }}
              >
                <Text tid="home" />
              </button>
            </div>
          </>
        )}
        <h1>
          <Text tid="fileadecision" />
        </h1>
        <form onSubmit={handleSubmitNewData}>
          <legend className="hello">
            <Text tid="describealltheelementsofhisdecision" />
          </legend>
          <label htmlFor="title">Titre</label>
          <br />
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={form.title}
            onChange={(event) => {
              setForm({ ...form, [event.target.name]: event.target.value });
            }}
          />
          {errors &&
            errors.map((error) => {
              if (error.path[0] === "title") {
                return (
                  <div key={error.context.key} className="field-error">
                    <Text tid="Thisfieldisrequiredandmustcontainatleast5characters" />
                  </div>
                );
              }
              return null;
            })}
          <label htmlFor="description">
            <Text tid="description" />
          </label>
          <ReactQuill
            theme="snow"
            modules={modules}
            name="description"
            defaultValue={form.description}
            onChange={(event) => {
              setForm({ ...form, description: event });
            }}
          />
          {errors &&
            errors.map((error) => {
              if (error.path[0] === "description") {
                return (
                  <div key={error.context.key} className="field-error">
                    <Text tid="Thisfieldisrequiredandmustcontainatleast5characters" />
                  </div>
                );
              }
              return null;
            })}
          <label htmlFor="utility">
            <Text tid="usefulnessfortheorganization" />
          </label>
          <ReactQuill
            theme="snow"
            modules={modules}
            name="utility"
            defaultValue={form.utility}
            onChange={(event) => {
              setForm({ ...form, utility: event });
            }}
          />
          {errors &&
            errors.map((error) => {
              if (error.path[0] === "utility") {
                return (
                  <div key={error.context.key} className="field-error">
                    <Text tid="Thisfieldisrequiredandmustcontainatleast5characters" />
                  </div>
                );
              }
              return null;
            })}
          <label htmlFor="context">
            <Text tid="contextaroundthedecision" />
          </label>
          <ReactQuill
            theme="snow"
            modules={modules}
            name="context"
            defaultValue={form.context}
            onChange={(event) => {
              setForm({ ...form, context: event });
            }}
          />
          {errors &&
            errors.map((error) => {
              if (error.path[0] === "context") {
                return (
                  <div key={error.context.key} className="field-error">
                    <Text tid="Thisfieldisrequiredandmustcontainatleast5characters" />
                  </div>
                );
              }
              return null;
            })}
          <label htmlFor="pros">
            <Text tid="benefits" />
          </label>
          <ReactQuill
            theme="snow"
            name="pros"
            modules={modules}
            defaultValue={form.pros}
            onChange={(event) => {
              setForm({ ...form, pros: event });
            }}
          />
          {errors &&
            errors.map((error) => {
              if (error.path[0] === "pros") {
                return (
                  <div key={error.context.key} className="field-error">
                    <Text tid="Thisfieldisrequiredandmustcontainatleast5characters" />
                  </div>
                );
              }
              return null;
            })}
          <label htmlFor="cons">
            <Text tid="disadvantages" />
          </label>
          <ReactQuill
            theme="snow"
            name="cons"
            modules={modules}
            defaultValue={form.cons}
            onChange={(event) => {
              setForm({ ...form, cons: event });
            }}
          />
          {errors &&
            errors.map((error) => {
              if (error.path[0] === "cons") {
                return (
                  <div key={error.context.key} className="field-error">
                    <Text tid="Thisfieldisrequiredandmustcontainatleast5characters" />
                  </div>
                );
              }
              return null;
            })}
          <legend>
            <Text tid="designatethepeopleconcerned" />
          </legend>
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
          <fieldset>
            <legend>
              <Text tid="setschedule" />
            </legend>
            <div className="datepicker">
              <p>
                <Text tid="dateoffilingofthedecision" />
              </p>
              <DatePicker
                selected={form.firstDate}
                minDate={form.firstDate}
                maxDate={form.firstDate}
                readOnly
              />
            </div>
            <div className="datepicker">
              <p>
                <Text tid="endoftakingopinions" />
              </p>
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
                      <Text tid="thisdatemustbegreaterthantodaysdate" />
                    </div>
                  );
                }
                return null;
              })}
            <div className="datepicker">
              <p>
                <Text tid="endofthefirstdecision" />
              </p>
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
                      <Text tid="thisdatemustbegreaterthantodaysdate" />
                    </div>
                  );
                }
                return null;
              })}
            <div className="datepicker">
              <p>
                <Text tid="endoftheconflictonthefirstdecision" />
              </p>
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
                      <Text tid="thisdatemustbegreaterthantodaysdate" />
                    </div>
                  );
                }
                return null;
              })}
            <div className="datepicker">
              <p>
                <Text tid="finaldecision" />
              </p>
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
                      <Text tid="thisdatemustbegreaterthantodaysdate" />
                    </div>
                  );
                }
                return null;
              })}
          </fieldset>
          {user.id === idCreator ? (
            <button
              type="submit"
              className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-m px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onSubmit={handleSubmitNewData}
            >
              Valider ma décision
            </button>
          ) : null}
        </form>
      </div>
    )
  );
}
export default DecisionsEdit;
