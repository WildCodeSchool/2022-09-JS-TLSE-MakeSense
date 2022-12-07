import React, { useContext, useState } from "react";
import { AuthStatus } from "@components/AuthStatus";
import { Outlet } from "react-router-dom";
import { Text, LanguageContext } from "../contexts/Language";

const selectOptions = ["option1", "option2", "option3"];

export default function Home() {
  const [clickText, setClickText] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const { dictionary } = useContext(LanguageContext);

  const handleClick = () => {
    setClickText(<Text tid="buttonClicked" />);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <AuthStatus />
      <h1>
        <Text tid="exploreHeader" />
      </h1>
      <p>
        <Text tid="welcomeDescription" />
      </p>

      <div>
        <input type="text" placeholder={dictionary.enterText} />
        <button type="button" onClick={handleClick}>
          <Text tid="clickMe" />
        </button>
        <p>{clickText}</p>
      </div>

      <div>
        <select onChange={handleOptionChange} value={selectedOption}>
          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {dictionary[option]}
            </option>
          ))}
        </select>
      </div>

      <a
        href="https://halilcanozcelik.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text tid="aboutMe" />
      </a>
      <Outlet />
    </div>
  );
}
