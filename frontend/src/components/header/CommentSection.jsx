import { useState } from "react";
import api from "@services/api";

// eslint-disable-next-line react/prop-types
function CommentSection({ id }) {
  const [comment, setComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      text: comment,
      id_user_writer: 9,
      id_decision: id,
    };
    return api
      .apipostmysql(`${import.meta.env.VITE_BACKEND_URL}/comments`, body)
      .then((json) => {
        return json;
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="comments"
        id="comments"
        placeholder="I have something to say"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        required
      />
      <button type="submit">Donner mon avis</button>
    </form>
  );
}

export default CommentSection;
