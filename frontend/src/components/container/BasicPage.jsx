import PropTypes from "prop-types";

function BasicPage({ title }) {
  return (
    <main>
      <div className="wrapper">
        <h1>{title}</h1>
      </div>
    </main>
  );
}
export default BasicPage;

BasicPage.propTypes = {
  title: PropTypes.string.isRequired,
};
