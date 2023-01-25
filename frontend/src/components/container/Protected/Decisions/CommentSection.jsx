import { useEffect, useState } from "react";
import api from "@services/api";
import Comments from "./Comments";
import Pagination from "./Pagination";
import { useAuth } from "../../../../contexts/useAuth";

function CommentSection({ id, comments, setComments }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [contentComment, setContentComment] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5); // décalage
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      text: contentComment,
      id_user_writer: user.id,
      id_decision: id,
    };
    setContentComment("");
    return api
      .apipostmysql(`${import.meta.env.VITE_BACKEND_URL}/comments`, body)
      .then((json) => {
        return json;
      });
  };

  useEffect(() => {
    const getComments = async () => {
      const callComments = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/comments/${id}`
      );
      setComments(callComments);
      // eslint-disable-next-line no-unused-expressions
      comments && setTotalPages(Math.ceil(comments.length / limit));

      setIsLoaded(true);
    };
    getComments();
  }, [isLoaded, contentComment]);

  const handleClick = (num) => {
    setPage(num);
  };

  return (
    isLoaded && (
      <section aria-labelledby="notes-title">
        <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden p-10">
          <div className="">
            <h2 id="notes-title" className="text-lg font-medium text-gray-900">
              Avis ({comments.length})
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="m-10">
              <textarea
                name="comments"
                id="comments"
                rows={3}
                placeholder="Ajouter un commentaire"
                value={contentComment}
                onChange={(event) => setContentComment(event.target.value)}
                required
                className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-10"
            >
              Donner mon avis
            </button>
          </form>
          {comments.length > 0 && (
            <>
              <div className="flex flex-row justify-center">
                <Pagination totalPages={totalPages} handleClick={handleClick} />
              </div>
              <Comments comments={comments} page={page} limit={limit} />
            </>
          )}
        </div>
      </section>
    )
  );
}

export default CommentSection;
