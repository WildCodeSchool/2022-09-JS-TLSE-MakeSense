
import PropTypes from "prop-types";

function ErrorPage({ title }) {
  return (
    <main>
      <div className="wrapper">
        <h1>{title}</h1>
      </div>
      <div>
        <p>
            Il y a eu une erreur lors du chargement du composant !
        </p>
        </div>
    </main>
  );
}
export default ErrorPage;

ErrorPage.propTypes = {
  title: PropTypes.string.isRequired,
};
