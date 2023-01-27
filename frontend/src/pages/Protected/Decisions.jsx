import { useLocation, useNavigate } from "react-router-dom";
import Loader from "@services/Loader";
import { Suspense } from "react";
import Spinner from "../../components/Spinner";

function Decisions() {
  const navigate = useNavigate();
  const URLParam = useLocation().search;
  const comp = new URLSearchParams(URLParam).get("comp") ?? "All";

  return (
    <div>
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
