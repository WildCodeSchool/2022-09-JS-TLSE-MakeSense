function Pagination({ totalPages, handleClick, page }) {
  const keys = [...Array(totalPages).keys()]; // [0, 1, 2, 3...]
  const pages = keys.map((num) => num + 1);

  // eslint-disable-next-line eqeqeq
  return pages == 1 ? null : (
    <nav>
      <ul className="inline-flex items-center -space-x-px">
        {pages.map((num) => (
          <li key={num}>
            <button
              type="button"
              key={num}
              onClick={() => handleClick(num)}
              className={
                page === num
                  ? "px-3 py-2 leading-tight text-calypso bg-slate-200 border rounded m-1 border-calypso hover:bg-gray-100 hover:text-gray-700"
                  : "px-3 py-2 leading-tight text-yellow-300 bg-slate-200 border rounded m-1 border-yellow-300 hover:bg-gray-100 hover:text-gray-700"
              }
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
