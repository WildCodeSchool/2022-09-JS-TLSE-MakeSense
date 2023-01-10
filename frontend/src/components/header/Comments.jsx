// eslint-disable-next-line react/prop-types
function Comments({ comments, page, limit }) {
  // console.log(limit)
  const startIndex = (page - 1) * limit;
  // eslint-disable-next-line react/prop-types
  const selectedComments = comments.slice(startIndex, startIndex + limit);
  return (
    // eslint-disable-next-line react/prop-types
    <div>
      {selectedComments.map((comment) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={comment.id} className="comment">
          <div className="commentInfoSection">
            Posté le {comment.date_creation.substring(0, 10)} à{" "}
            {comment.date_creation.substring(11, 13)}h
            {comment.date_creation.substring(14, 16)} par{" "}
            {comment.id_user_writer}
          </div>
          <div>{comment.text}</div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
