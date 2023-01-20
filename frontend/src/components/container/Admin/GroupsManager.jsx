import { useState, useContext, useEffect, useRef } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import { Text, LanguageContext } from "../../../contexts/Language";
import api from "../../../services/api";

function UsersManager() {
  const [IsLoaded, SetIsLoaded] = useState(false);
  const [AllUsers, setAllUsers] = useState();

  useEffect(() => {
    const getAllapi = async () => {
      const allusers = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/groups`
      );
      setAllUsers(allusers);
      SetIsLoaded(true);
    };
    getAllapi();
  }, [IsLoaded]);

  const [searchTerm, setSearchTerm] = useState("");
  function handleChange(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  return IsLoaded ? (
    <div className="user-admin-wrapper">
      <h1>Groups Management</h1>
      <div className="SearchBarUsers">
        <input
          key="searchbarusers"
          id="searchbarusers"
          name="searchbarusers"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
        />
      </div>
      {AllUsers.filter((data) =>
        data.name
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .toLocaleLowerCase()
          .includes(
            searchTerm
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "")
              .toLocaleLowerCase()
          )
      ).map((data) => (
        <div key={data.id} className="rowUser">
          <div>
            <Text tid="name" /> : {data.name}
          </div>
          <HiPencilSquare />
        </div>
      ))}
    </div>
  ) : (
    <div>isLoading...</div>
  );
}
export default UsersManager;
