import React, { useState } from "react";
import "../../../assets/css/container/protected/SearchBar.css";
import Card from "./Card";

// eslint-disable-next-line react/prop-types
function SearchBar({ datas }) {
  const [searchTerm, setSearchTerm] = useState();
  const [results, setResults] = useState([]);
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    // Appel à une fonction pour effectuer la recherche avec `searchTerm`
    // setResults(searchTerm).then((results) => {
    // setResults(results);
  }
  // const filteredData = this.state.data.filter((data) =>
  // data.content.toLowerCase().includes(this.state.handleChange.toLowerCase())
  // );

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchTerm} onChange={handleChange} />
      <button type="submit">🔎</button>
      <div>
        {
          // eslint-disable-next-line react/prop-types
          datas.map((data) => (
            <Card data={data.id} content={data.content} />
          ))
        }
      </div>
      {
        // filteredData.map(() => {
        // <Card data={data.id} content={data.content} />;
        // })
      }
    </form>
  );
}
export default SearchBar;
