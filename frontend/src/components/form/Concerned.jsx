import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { USERS } from "./usersMock";
import "../../assets/css/form/formConcerned.css";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

// eslint-disable-next-line react/prop-types
function Impacted({ table, name }) {
  // table formatting
  // eslint-disable-next-line react/prop-types
  const suggestions = table.map((user) => {
    return {
      id: user.id.toString(),
      text: `${user.firstname} ${user.lastname}`,
    };
  });

  const [impacted, setImpacted] = useState([]);

  const handleDelete = (i) => {
    setImpacted(impacted.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    // eslint-disable-next-line no-param-reassign
    tag.type = name;
    setImpacted([...impacted, tag]);
  };

  return (
    <div>
      <h3>Les {name}</h3>
      <ReactTags
        tags={impacted}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        inputFieldPosition="top"
        // minQueryLength={3}
        maxLength={91}
        allowDragDrop={false}
        placeholder="Recherche une personne concernée"
        allowDeleteFromEmptyInput={false}
      />
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Expert({ table, name }) {
  // table formatting
  // eslint-disable-next-line react/prop-types
  const suggestions = table.map((user) => {
    return {
      id: user.id.toString(),
      text: `${user.firstname} ${user.lastname}`,
    };
  });

  const [experts, setExpert] = useState([]);

  const handleDelete = (i) => {
    setExpert(experts.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    // eslint-disable-next-line no-param-reassign
    tag.type = name;
    setExpert([...experts, tag]);
  };

  return (
    <div>
      <h3>Les {name}</h3>
      <ReactTags
        tags={experts}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        inputFieldPosition="top"
        // minQueryLength={3}
        maxLength={91}
        allowDragDrop={false}
        placeholder="Recherche une personne concernée"
        allowDeleteFromEmptyInput={false}
      />
    </div>
  );
}

export { Impacted, Expert };
