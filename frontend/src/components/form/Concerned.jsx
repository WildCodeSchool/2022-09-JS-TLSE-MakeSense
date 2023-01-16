import { WithContext as ReactTags } from "react-tag-input";
import "../../assets/css/form/formConcerned.css";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

// eslint-disable-next-line react/prop-types
function Concerned({ table, name, type, updateType }) {
  // table formatting
  // eslint-disable-next-line react/prop-types
  const suggestions = table.map((user) => {
    return {
      id: user.id.toString(),
      text: `${user.firstname} ${user.lastname}`,
    };
  });

  const handleDelete = (i) => {
    // eslint-disable-next-line react/prop-types
    updateType(type.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    // eslint-disable-next-line no-param-reassign
    tag.type = name;
    updateType([...type, tag]);
  };

  return (
    <div>
      <h3>Les {name}</h3>
      <ReactTags
        tags={type}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        inputFieldPosition="top"
        maxLength={91}
        allowDragDrop={false}
        placeholder="Recherche une personne concernée"
        allowDeleteFromEmptyInput={false}
      />
    </div>
  );
}

export default Concerned;
