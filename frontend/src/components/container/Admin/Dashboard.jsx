import { Chart } from "react-google-charts";

function Dashboard() {
  return (
    <div className="user-admin-wrapper">
      <h1>Dashboard</h1>
      <Chart
        chartType="ScatterChart"
        data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
        width="100%"
        height="400px"
        legendToggle
      />
    </div>
  );
}
export default Dashboard;
