import { useState, useEffect, useRef } from "react";
import { Chart } from "react-google-charts";
import "../../../assets/css/container/admin/Dashboard.scss";
import api from "../../../services/api";

function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [decisions, setDecisions] = useState(null);
  const TOTAL_SLIDES = 12; // n-1 in Array
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
    if (current >= TOTAL_SLIDES) return;
    setMonth(allmonth[current + 1]);
    setIsLoaded(false);
    setCurrent(current + 1);
  };
  const prev = () => {
    if (current === 0) return;
    setMonth(allmonth[current - 1]);
    setIsLoaded(false);
    setCurrent(current - 1);
  };
  const desired = (e) => {
    setMonth(e.target.ariaLabel);
    setIsLoaded(false);
    setCurrent(Number(e.target.id));
  };

  useEffect(() => {
    const getAllApis = async () => {
      // get the decision
      const callDecisions = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisions`
      );
      setDecisions(callDecisions);
      setIsLoaded(true);
    };
    getAllApis();
    if (isLoaded) {
      ref.current.style.transition = "all 0.2s ease-in-out";
      ref.current.style.transform = `translateX(-${current}00%)`;
    }
  }, [isLoaded]);

  // DATA GRAPHIQUE
  const data = [
    [
      "Month",
      "Créer",
      "Ecuador",
      "Madagascar",
      "Papua New Guinea",
      "Rwanda",
      "Average",
    ],
    /// ici faire un map des decisions date
    ["2004/05", 165, 938, 522, 998, 450, 614.6],
    ["2005/06", 135, 1120, 599, 1268, 288, 682],
    ["2006/07", 157, 1167, 587, 807, 397, 623],
    ["2007/08", 139, 1110, 615, 968, 215, 609.4],
    ["2008/09", 136, 691, 629, 1026, 366, 569.6],
  ];
  const options = {
    title: "Decisions",
    vAxis: { title: "Number" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
  };

  return isLoaded ? (
    <div className="w-full justify-center m-5">
      <h1>Dashboard</h1>
      <p>{month}</p>

      <div className="frame">
        <div className="box-container" ref={ref}>
          <div className="box">
            <Chart
              chartType="ComboChart"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
          </div>
          <div className="box">
            <Chart
              chartType="ComboChart"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
          </div>
          <div className="box">
            <Chart
              chartType="ComboChart"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
          </div>
          <div className="box">
            <Chart
              chartType="ComboChart"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
          </div>
        </div>
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
          <span className="visually-hidden">Previous</span>
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
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="button-2-container">
        {allmonth.map((num, index) => (
          <button
            type="button"
            className={`button-2 ${num === current && "active"}`}
            onClick={desired}
            id={index}
            key={num}
            aria-label={num}
          />
        ))}
      </div>
    </div>
  ) : (
    <div>... Loading</div>
  );
}
export default Dashboard;
