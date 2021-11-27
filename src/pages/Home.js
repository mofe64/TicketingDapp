import Header from "../components/Header";
import "../css/pages/Home.css";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import marketInterface from "../abi/Market.json";
import { marketContractAddress } from "../util/Constants";
import { useHistory } from "react-router";

const Home = function () {
  const history = useHistory();
  const web3 = useWeb3React();
  const [latestEvents, setLatestEvents] = useState([]);
  const owner = "xxx";
  if (web3.library !== undefined) {
    console.log(web3.library.utils.fromWei("2000000000", "ether"));
    console.log(web3.chainId);
  }
  const loadData = useCallback(async () => {
    if (web3.library === undefined) return;
    const marketContract = new web3.library.eth.Contract(
      marketInterface.abi,
      marketContractAddress
    );
    let allEvents = await marketContract.methods.getAllEvents().call();
    let arrangedEvents = [...allEvents];
    arrangedEvents = arrangedEvents.reverse().splice(-15);
    setLatestEvents(arrangedEvents);
  }, [web3.library]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="events">
          <h1>Lastest Events</h1>
          {latestEvents !== undefined && latestEvents.length > 0 && (
            <div className="events-all">
              {latestEvents.map((event, index) => {
                console.log(event);
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
                      <button
                        className="btn-details"
                        onClick={() => {
                          history.push(`/${event["id"]}`);
                        }}
                      >
                        More Details
                      </button>
                      <button className="btn-buy">Buy Now</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {latestEvents === undefined ||
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
