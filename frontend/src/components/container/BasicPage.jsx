import PropTypes from "prop-types";

function BasicPage({ title }) {
  return (
    <div className="wrapper">
      <h1>{title}</h1>
    </div>
  );
}
export default BasicPage;

BasicPage.propTypes = {
  title: PropTypes.string.isRequired,
};
