import React, { useState } from "react";
import "../../../assets/css/container/protected/SearchBar.css";
import Card from "./Card";

// eslint-disable-next-line react/prop-types
function SearchBar({ datas }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  return (
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
              <Card key={data.id} data={data} />
            ))
        }
      </div>
    </div>
  );
}
export default SearchBar;
