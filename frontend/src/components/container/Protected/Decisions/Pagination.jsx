function Pagination({ totalPages, handleClick }) {
  const keys = [...Array(totalPages).keys()]; // [0, 1, 2, 3...]
  const pages = keys.map((num) => num + 1);
  // eslint-disable-next-line eqeqeq
  return pages == 1 ? null : (
    <nav>
      <ul className="inline-flex items-center -space-x-px">
        {pages.map((num) => (
          <li>
            <button
              type="button"
              key={num}
              onClick={() => handleClick(num)}
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {" "}
              {num}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
