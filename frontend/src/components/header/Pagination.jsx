function Pagination({ totalPages, handleClick }) {
  const keys = [...Array(totalPages).keys()]; // [0, 1, 2, 3...]
  const pages = keys.map((num) => num + 1);
  // eslint-disable-next-line eqeqeq
  return pages == 1 ? null : (
    <div>
      {pages.map((num) => (
        <button type="button" key={num} onClick={() => handleClick(num)}>
          {num}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
