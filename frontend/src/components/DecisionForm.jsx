import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DatePick() {
  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
    // eslint-disable-next-line no-restricted-syntax
    console.log(date);
  };
  return <DatePicker selected={date} onChange={onChange} selectsRange inline />;
}

export default function DecisionForm() {
  return (
    <form>
      <fieldset>
        <legend>Décrire tous les éléments de sa décision</legend>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" required />
        </div>
        <div>
          <label htmlFor="email">Description de la décision</label>
          {
            // WYSIWYG
          }
        </div>
        <div>
          <label htmlFor="email">Utilité de la décision</label>
          {
            // WYSIWYG
          }
        </div>
        <div>
          <label htmlFor="email">Contexte</label>
          {
            // WYSIWYG
          }
        </div>
        <div>
          <label htmlFor="email">Bénéfices</label>
          {
            // WYSIWYG
          }
        </div>
        <div>
          <label htmlFor="email">Inconvénients</label>
          {
            // WYSIWYG
          }
        </div>
      </fieldset>
      {
        // button pass to next
      }
      <button type="button">Passer aux concernés</button>
      <fieldset>
        <legend>Définir les concernés et les experts</legend>
        <button type="button">Définir le calendrier</button>
      </fieldset>
      <fieldset>
        <legend>Définir le calendrier</legend>
        <select name="pets" id="pet-select">
          <option value="">-- Choisir les prochaines dates --</option>
          <option value="opinion">Fin de la prise des avis</option>
          <option value="first-decision">
            Fin de la première prise de décision
          </option>
          <option value="conflict">Fin du conflit sur première décision</option>
          <option value="definitive-decision">Décision définitive</option>
        </select>
        <DatePick />
        <input type="checkbox" />
        <p>Ne pas définir de date pour cette étape</p>

        <div>
          <input type="submit" value="Subscribe!" />
        </div>
      </fieldset>
    </form>
  );
}
