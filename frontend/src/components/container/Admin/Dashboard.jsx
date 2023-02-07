import { useState, useEffect, useRef } from "react";
import { Chart } from "react-google-charts";
import "../../../assets/css/container/admin/Dashboard.scss";
import Spinner from "@components/Spinner";
import { Text } from "../../../contexts/Language";
import api from "../../../services/api";

function Dashboard() {
  const [datagraph, setDatagraph] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [decisions, setDecisions] = useState(null);
  const TOTAL_SLIDES = 11; // n-1 in Array
  const [year, setYear] = useState(new Date().getFullYear());
  const [current, setCurrent] = useState(0);
  const allmonth = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];
  const [month, setMonth] = useState("Janvier");
  const ref = useRef(null);

  const next = () => {
    if (current >= TOTAL_SLIDES) {
      setYear(year + 1);
      setCurrent(0);
      setMonth(allmonth[0]);
      setIsLoaded(false);
    } else {
      setMonth(allmonth[current + 1]);
      setIsLoaded(false);
      setCurrent(current + 1);
    }
  };
  const prev = () => {
    if (current === 0) {
      setYear(year - 1);
      setCurrent(11);
      setMonth(allmonth[11]);
      setIsLoaded(false);
    } else {
      setMonth(allmonth[current - 1]);
      setIsLoaded(false);
      setCurrent(current - 1);
    }
  };
  const desired = (e) => {
    setMonth(e.target.ariaLabel);
    setIsLoaded(false);
    setCurrent(Number(e.target.id));
  };

  function loaddatagraph(decall) {
    // DATA GRAPHIQUE
    let arraydatagraph = [];
    const status1 = decall
      .filter((row) =>
        row.date_created.startsWith(
          `${year}-${current + 1 < 10 ? `0${current + 1}` : current + 1}`
        )
      )
      .filter((status) => status.status === 1).length;
    const status2 = decall
      .filter((row) =>
        row.date_created.startsWith(
          `${year}-${current + 1 < 10 ? `0${current + 1}` : current + 1}`
        )
      )
      .filter((status) => status.status === 2).length;
    const status3 = decall
      .filter((row) =>
        row.date_created.startsWith(
          `${year}-${current + 1 < 10 ? `0${current + 1}` : current + 1}`
        )
      )
      .filter((status) => status.status === 3).length;
    const status4 = decall
      .filter((row) =>
        row.date_created.startsWith(
          `${year}-${current + 1 < 10 ? `0${current + 1}` : current + 1}`
        )
      )
      .filter((status) => status.status === 4).length;
    const status5 = decall
      .filter((row) =>
        row.date_created.startsWith(
          `${year}-${current + 1 < 10 ? `0${current + 1}` : current + 1}`
        )
      )
      .filter((status) => status.status === 5).length;
    const status6 = decall
      .filter((row) =>
        row.date_created.startsWith(
          `${year}-${current + 1 < 10 ? `0${current + 1}` : current + 1}`
        )
      )
      .filter((status) => status.status === 6).length;

    arraydatagraph = [
      ["Decisions", "Status"],
      ["En attente d'avis", status1],
      ["En attente première décision", status2],
      ["En conflit", status3],
      ["Décision définitive prise", status4],
      ["Décision archivées", status5],
      ["Décision non aboutie", status6],
    ];
    setDatagraph(arraydatagraph);
  }

  useEffect(() => {
    const getAllApis = async () => {
      // get the decision
      const callDecisions = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisions`
      );
      setDecisions(callDecisions);
      loaddatagraph(callDecisions);
      setIsLoaded(true);
    };
    if (isLoaded) {
      ref.current.style.transition = "all 0.2s ease-in-out";
      ref.current.style.transform = `translateX(-${current}00%)`;
    }
    getAllApis();
  }, [isLoaded]);

  // Options Graphique
  const options = {
    title: `${month} Activities`,
  };

  return isLoaded ? (
    <div className="w-1/2 bg-white rounded shadow p-5 justify-center m-5">
      <div className="font-bold text-xl text-calypso pl-5 py-5">
        <Text tid="statistics" />
      </div>
      <div className="frame">
        <div className="box-container" ref={ref}>
          {allmonth.map((item) => (
            <div key={item} className="box">
              <Chart
                chartType="PieChart"
                width="100%"
                data={datagraph}
                options={options}
              />
            </div>
          ))}
        </div>
        <div className="button-2-container">
          {allmonth.map((num, index) => (
            <button
              type="button"
              className={`button-1 ${num === current && "active"}`}
              onClick={desired}
              id={index}
              key={num}
              aria-label={num}
            />
          ))}
        </div>
        <div className="flex justify-between">
          <button
            className="carousel-control-prev relative top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
            onClick={prev}
          >
            <span
              className="carousel-control-prev-icon inline-block bg-no-repeat"
              aria-hidden="true"
            />
            <span className="text-calypso bg-white opacity-1 hover:bg-calypsoLight hover:text-white font-medium rounded-lg border border-calypso text-sm px-5 py-2.5 text-center mx-2">
              <Text tid="previous" />
            </span>
          </button>
          <button
            className="carousel-control-next relative top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
            onClick={next}
          >
            <span
              className="carousel-control-next-icon inline-block bg-no-repeat"
              aria-hidden="true"
            />
            <span className="visually-hidden text-calypso bg-white opacity-1 hover:bg-calypsoLight hover:text-white font-medium rounded-lg border border-calypso text-sm px-5 py-2.5 text-center mx-2">
              <Text tid="next" />
            </span>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
}
export default Dashboard;
