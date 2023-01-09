import React, { useState } from "react";
import "../../../assets/css/container/protected/SearchBar.css";
import Card from "./Card";

// eslint-disable-next-line react/prop-types
function SearchBar({ datas }) {
  const [searchTerm, setSearchTerm] = useState();
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <form>
      <input type="text" value={searchTerm} onChange={handleChange} />
      <div>
        {
          // eslint-disable-next-line react/prop-types
          datas
            // eslint-disable-next-line react/prop-types
            .filter((data) =>
              JSON.parse(data.content).title.includes(searchTerm)
            )
            .map((data) => (
              <Card key={data.id} data={data} />
            ))
        }
      </div>
    </form>
  );
}
export default SearchBar;
