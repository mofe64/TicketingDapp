import Header from "../components/Header";
import "../css/pages/Home.css";
// eslint-disable-next-line
import { ethers } from "ethers";
import { useContractCall } from "@usedapp/core";
import {
  marketContractAddress,
  marketContractInterface,
} from "../util/Constants";

const Home = function () {
  const owner = useContractCall({
    abi: marketContractInterface,
    address: marketContractAddress,
    method: "owner",
    args: [],
  });
  console.log(owner);
  const allEvents = useContractCall({
    abi: marketContractInterface,
    address: marketContractAddress,
    method: "getAllEvents",
    args: [],
  });
  let latestEvents;
  if (allEvents !== undefined && allEvents.length > 0) {
    latestEvents = [...allEvents[0]];
    latestEvents = latestEvents.reverse().slice(-15);
    // console.log("test", latestEvents);
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
