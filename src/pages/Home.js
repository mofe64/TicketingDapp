import Header from "../components/Header";
import "../css/pages/Home.css";
import { useWeb3React } from "@web3-react/core";

const Home = function () {
  const web3 = useWeb3React();
  const latestEvents = [];
  const allEvents = [];
  const owner = "xxx";
  if (web3.library !== undefined) {
    console.log(web3.library.utils.fromWei("2000000000", "ether"));
  }
  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="events">
          <h1>Lastest Events</h1>
          {latestEvents !== undefined && latestEvents.length > 0 && (
            <div className="events-all">
              {latestEvents.map((event, index) => {
                // console.log(event);
                return (
                  <div className="event-tile" key={index}>
                    <p>
                      Event name : <span>{event["name"]}</span>
                    </p>
                    <p>
                      Token Symbol : <span> {event["symbol"]}</span>{" "}
                    </p>
                    <p>
                      Price :<span> {event["price"].toString()} </span>
                    </p>
                    <div className="event-tile-btns">
                      <button className="btn-details">More Details</button>
                      <button className="btn-buy">Buy Now</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {allEvents === undefined ||
            (latestEvents.length === 0 && (
              <p>No events have been listed yet</p>
            ))}
        </div>
        <div className="tickets">
          <h1>Your Tickets</h1>
        </div>
        <div className="event">
          <h1>Your Events</h1>
          <p>{owner}</p>
        </div>
      </div>
    </>
  );
};

export default Home;
