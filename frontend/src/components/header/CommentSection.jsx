import { useEffect, useState } from "react";
import api from "@services/api";
import "../../assets/css/decisionPage.css";
import Comments from "./Comments";
import Pagination from "./Pagination";

// eslint-disable-next-line react/prop-types
function CommentSection({ id }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [comments, setComments] = useState();
  const [contentComment, setContentComment] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5); // décalage

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      text: contentComment,
      id_user_writer: 9,
      id_decision: id,
    };
    return api
      .apipostmysql(`${import.meta.env.VITE_BACKEND_URL}/comments`, body)
      .then((json) => {
        return json;
      });
  };

  useEffect(() => {
    const getComments = async () => {
      const callComments = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/comments`
      );
      setComments(callComments);
      setTotalPages(Math.ceil(comments.length / limit));
      setIsLoaded(true);
    };

    getComments();
  }, [isLoaded]);

  const handleClick = (num) => {
    setPage(num);
  };

  return isLoaded ? (
    <details>
      <summary>Avis ({comments.length})</summary>
      <form onSubmit={handleSubmit}>
        <textarea
          name="comments"
          id="comments"
          placeholder="I have something to say"
          value={contentComment}
          onChange={(event) => setContentComment(event.target.value)}
          required
        />
        <br />
        <button type="submit">Donner mon avis</button>
      </form>
      <Pagination totalPages={totalPages} handleClick={handleClick} />
      <Comments comments={comments} page={page} limit={limit} />
    </details>
  ) : (
    <div>Loading...</div>
  );
}

export default CommentSection;
