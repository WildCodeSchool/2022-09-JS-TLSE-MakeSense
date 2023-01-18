import "../../assets/css/container/protected/Decision.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "@services/Loader";
import Spinner from "@components/Spinner";
import { Suspense } from "react";

function Decisions() {
  const navigate = useNavigate();
  const URLParam = useLocation().search;
  const comp = new URLSearchParams(URLParam).get("comp")
    ? new URLSearchParams(URLParam).get("comp")
    : "All";

  return (
    <div>
      <div className="titre">
        <h1>Décisions</h1>
        <button
          type="button"
          key="key"
          id="8"
          onClick={() => {
            navigate(`/user/decisions?comp=Form`);
          }}
        >
          Form
        </button>
      </div>
      <div className="searchBar">
        <Suspense fallback={<Spinner />}>
          <Loader
            foldername="components/container/Protected/Decisions"
            filename={`Decisions${comp}`}
          />
        </Suspense>
      </div>
    </div>
  );
}
export default Decisions;
