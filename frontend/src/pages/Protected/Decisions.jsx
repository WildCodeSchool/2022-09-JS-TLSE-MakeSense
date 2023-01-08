import "../../assets/css/container/protected/Decision.css";
import { useEffect, useState } from "react";
import api from "@services/api";
import SearchBar from "../../components/container/Protected/SearchBar";

function Decisions() {
  const [datas, setDatas] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getDatas = async () => {
      const decisions = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisions`
      );
      setDatas(decisions);
      setIsLoaded(true);
    };
    getDatas(); // lance la fonction getDatas
  }, [isLoaded]);

  return (
    isLoaded && (
      <div>
        <div className="searchBar">
          <SearchBar datas={datas} />
        </div>
      </div>
    )
  );
}
export default Decisions;
