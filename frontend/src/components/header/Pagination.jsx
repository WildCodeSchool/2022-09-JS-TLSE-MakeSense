// eslint-disable-next-line react/prop-types
function Pagination({ totalPages, handleClick }) {
  const keys = [...Array(totalPages).keys()]; // [0, 1, 2, 3...]
  const pages = keys.map((num) => num + 1);
  return (
    <div>
      {pages > 1
        ? pages.map((num) => (
            // eslint-disable-next-line react/button-has-type
            <button key={num} onClick={() => handleClick(num)}>
              {num}
            </button>
          ))
        : null}
    </div>
  );
}

export default Pagination;
