function Comments({ comments, page, limit }) {
  const startIndex = (page - 1) * limit;
  const selectedComments = comments.slice(startIndex, startIndex + limit);
  return (
    <div>
      {selectedComments.map((comment) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={comment.id} className="comment">
          <div className="commentInfoSection">
            Posté le {comment.date_creation.substring(0, 10)} à{" "}
            {comment.date_creation.substring(11, 13)}h
            {comment.date_creation.substring(14, 16)} par {comment.firstname}{" "}
            {comment.lastname}
          </div>
          <div>{comment.text}</div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
