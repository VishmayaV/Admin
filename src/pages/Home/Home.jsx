import "./Home.css";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Widget from "../../components/widget/Widget";

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Home;