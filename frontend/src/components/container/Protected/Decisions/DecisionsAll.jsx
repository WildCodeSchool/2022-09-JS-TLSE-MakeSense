import React, { useState, useEffect } from "react";
import api from "@services/api";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

// eslint-disable-next-line react/prop-types
function DecisionsAll() {
  const navigate = useNavigate();
  const [datas, setDatas] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getDatas = async () => {
      const decisions = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisions`
      );
      setDatas(decisions);
      setIsLoaded(true);
    };
    getDatas(); // lance la fonction getDatas
  }, [isLoaded]);

  const [searchTerm, setSearchTerm] = useState("");
  function handleChange(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  return (
    isLoaded && (
      <div>
        <div className="searchBar">
          <input
            key="searchbar"
            id="searchbar"
            name="searchbar"
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search..."
          />
        </div>
        <div>
          {
            // eslint-disable-next-line react/prop-types
            datas
              // eslint-disable-next-line react/prop-types
              .filter((data) =>
                JSON.parse(data.content)
                  .title.normalize("NFD")
                  .replace(/\p{Diacritic}/gu, "")
                  .toLocaleLowerCase()
                  .includes(
                    searchTerm
                      .normalize("NFD")
                      .replace(/\p{Diacritic}/gu, "")
                      .toLocaleLowerCase()
                  )
              )
              .map((data) => (
                <button
                  type="button"
                  key={data.id}
                  id={data.id}
                  onClick={() => {
                    navigate(`/user/decisions?comp=Page&id=${data.id}`);
                  }}
                >
                  <Card key={data.id} data={data} />
                </button>
              ))
          }
        </div>
      </div>
    )
  );
}
export default DecisionsAll;
