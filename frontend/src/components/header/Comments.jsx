import { Text } from "../../contexts/Language";

function Comments({ comments, page, limit }) {
  const startIndex = (page - 1) * limit;
  const selectedComments = comments.slice(startIndex, startIndex + limit);
  return (
    <div>
      <div className="divide-y divide-gray-200">
        <div className="px-4 py-6 sm:px-6">
          <ul className="space-y-8">
            {selectedComments.map((comment) => (
              <li key={comment.id}>
                <div className="flex space-x-3">
                  {/* <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                      alt=""
                    />
                  </div> */}
                  <div>
                    <div className="text-sm">
                      <a href="/" className="font-medium text-gray-900">
                        {comment.firstname} {comment.lastname}
                      </a>
                    </div>
                    <div className="mt-1 text-sm text-gray-700">
                      <p>{comment.text}</p>
                    </div>
                    <div className="mt-2 text-sm space-x-2">
                      <span className="text-gray-500 font-medium">
                        <Text tid="postedthe" />{" "}
                        {comment.date_creation.substring(0, 10)} à{" "}
                        {comment.date_creation.substring(11, 13)}h
                        {comment.date_creation.substring(14, 16)}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Comments;
