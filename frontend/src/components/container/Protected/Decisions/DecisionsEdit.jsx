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
import DecisionsPage from "./DecisionsPage";

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
  const [updateData, setUpdateData] = useState(false);
  const [decisionTitle, setDecisionTitle] = useState();
  const [decisionDescription, setDecisionDescription] = useState();
  const [decisionContext, setDecisionContext] = useState();
  const [decisionUtility, setDecisionUtility] = useState();
  const [decisionPros, setDecisionPros] = useState();
  const [decisionCons, setDecisionCons] = useState();
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [usersImpacted, setUsersImpacted] = useState([]);
  const [usersExperts, setUsersExperts] = useState([]);
  const [groupsImpacted, setGroupsImpacted] = useState([]);
  const [groupsExperts, setGroupsExperts] = useState([]);
  const [impacted, setImpacted] = useState([]);
  const [experts, setExperts] = useState([]);
  const [usersAndGroups, setUsersAndGroups] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState();
  const [form, setForm] = useState({
    title: { decisionTitle },
    description: { decisionDescription },
    utility: { decisionUtility },
    context: { decisionContext },
    pros: { decisionPros },
    cons: { decisionCons },
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
      setDecisionTitle(JSON.parse(getDecisions.content).title);
      setDecisionDescription(JSON.parse(getDecisions.content).description);
      setDecisionContext(JSON.parse(getDecisions.content).context);
      setDecisionUtility(JSON.parse(getDecisions.content).utility);
      setDecisionPros(JSON.parse(getDecisions.content).pros);
      setDecisionCons(JSON.parse(getDecisions.content).cons);
      setForm({
        title: { decisionTitle },
        description: { decisionDescription },
        utility: { decisionUtility },
        context: { decisionContext },
        pros: { decisionPros },
        cons: { decisionCons },
        firstDate: new Date(JSON.parse(getDecisions.content).firstDate),
        dateOpinion: new Date(JSON.parse(getDecisions.content).dateOpinion),
        dateFirstDecision: new Date(
          JSON.parse(getDecisions.content).dateFirstDecision
        ),
        dateEndConflict: new Date(
          JSON.parse(getDecisions.content).dateEndConflict
        ),
        dateFinaleDecision: new Date(
          JSON.parse(getDecisions.content).dateFinaleDecision
        ),
      });
      setData(getDecisions);
    };
    getDecisionsData(); // lance la fonction getDecisionsData
  }, [updateData]);

  useEffect(() => {
    getUsers();
    setUsersAndGroups(users);
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

    const body = {
      title: JSON.parse(data.content).title,
      description: JSON.parse(data.content).description,
      utility: JSON.parse(data.content).utility,
      context: JSON.parse(data.content).context,
      pros: JSON.parse(data.content).pros,
      cons: JSON.parse(data.content).cons,
      firstDate: new Date(),
      dateOpinion: new Date(),
      dateFirstDecision: new Date(),
      dateEndConflict: new Date(),
      dateFinaleDecision: new Date(),
    };
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
            defaultValue={decisionTitle}
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
            defaultValue={decisionDescription}
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
            defaultValue={decisionUtility}
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
            defaultValue={decisionContext}
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
            defaultValue={decisionPros}
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
          <button
            type="submit"
            className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-m px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onSubmit={handleSubmitNewData}
          >
            <Text tid="validatemydecision" />
          </button>
        </form>
      </div>
    )
  );
}
export default DecisionsForm;
