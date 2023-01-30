import React, {
  useMemo,
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { LoadFolder } from "./functions/FolderApi";

// create the folder context
export const FolderContext = createContext({});

export function FolderProvider({ children }) {
  const [isLoaded2, setIsLoaded2] = useState(false);
  // Folder Const //
  const folderPages = "../frontend/src/pages";
  const [pages, setPages] = useState({});
  const folderComponents = "../frontend/src/components";
  const [components, setComponents] = useState({});

  useEffect(() => {
    LoadFolder(folderPages, folderComponents).then(
      ([returnpages, returncomponents]) => {
        setPages(returnpages);
        setComponents(returncomponents);
        setIsLoaded2(true);
      }
    );
  }, []);

  const provider = useMemo(
    () => ({
      pages,
      components,
    }),
    [pages, components]
  );

  return (
    <FolderContext.Provider value={provider}>
      {isLoaded2 && children}
    </FolderContext.Provider>
  );
}

FolderProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
