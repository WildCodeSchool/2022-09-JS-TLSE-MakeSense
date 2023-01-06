import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

// eslint-disable-next-line react/prop-types
export default function DatePick({ id }) {
  const [date, setDate] = useState(new Date());
  // setAddLangForm({ ...AddLangForm, [event.target.id]: event.target.value });
  // const [calendar, setCalendar] = useState({ date1: "date" });
  // setCal({ ...cal, [refInput.current.input.id]: d });

  const refInput = useRef(null);
  const handleChange = (d) => {
    setDate(d);
  };

  return (
    <div>
      <DatePicker
        selected={date}
        onChange={handleChange}
        id={id}
        ref={refInput}
      />
    </div>
  );
}
