// eslint-disable-next-line import/no-unresolved
import { WithContext as ReactTags } from "react-tag-input";

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
      ...user,
      id: user.id.toString(),
      text: user.firstname
        ? `${user.firstname} ${user.lastname}`
        : `${user.name}`,
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
    <div className=" mb-6">
      <h3 className=" mb-6 text-m">Les {name}</h3>
      <ReactTags
        tags={type}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        inputFieldPosition="top"
        maxLength={91}
        allowDragDrop={false}
        renderSuggestion={false}
        autofocus={false}
        placeholder="Recherche une personne concernée"
        allowDeleteFromEmptyInput={false}
        classNames={{
          tags: "tagsClass",
          tagInput: "tagInputClass",
          tagInputField: "tagInputFieldClass",
          selected: "selectedClass",
          tag: "tagClass",
          remove: "removeClass",
          suggestions: "suggestionsClass",
          activeSuggestion: "activeSuggestionClass",
          editTagInput: "editTagInputClass",
          editTagInputField: "editTagInputField",
          clearAll: "clearAllClass",
        }}
      />
    </div>
  );
}

export default Concerned;
