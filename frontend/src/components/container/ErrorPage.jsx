import PropTypes from "prop-types";
// eslint-disable-next-line import/no-unresolved, import/extensions
import { Text } from "../../../../contexts/Language";

function ErrorPage({ title }) {
  return (
    <main>
      <div className="wrapper">
        <h1>{title}</h1>
      </div>
      <div>
        <p>
          <Text tid="therewasanerrorloadingthecomponent!" />
        </p>
      </div>
    </main>
  );
}
export default ErrorPage;

ErrorPage.propTypes = {
  title: PropTypes.string.isRequired,
};
