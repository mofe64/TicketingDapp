import Header from "../components/Header";
import "../css/pages/Home.css";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import marketInterface from "../abi/Market.json";
import { marketContractAddress } from "../util/Constants";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supportedChains = [4, 1337];
const Home = function () {
  const history = useHistory();
  const web3 = useWeb3React();
  const [latestEvents, setLatestEvents] = useState([]);
  const [purchasedTickets, setPurchasedTickets] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [inUnsupportedChain, setInUnsupportedChain] = useState(false);
  // const [chains] = useState(["Rinkeby"]);
  if (web3.library !== undefined) {
    console.log(web3.library.utils.fromWei("2000000000", "ether"));
    console.log(web3.chainId);
  }
  const notify = (message, isError) => {
    if (!isError) {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: setInUnsupportedChain(true),
      });
    }
  };

  const loadData = useCallback(async () => {
    if (web3.library === undefined) return;
    const marketContract = new web3.library.eth.Contract(
      marketInterface.abi,
      marketContractAddress
    );
    if (!supportedChains.includes(web3.chainId)) {
      notify(
        "Sorry this project is only currently supported on the rinkeby chain",
        true
      );
      return;
    }
    let allEvents = await marketContract.methods.getAllEvents().call();
    let arrangedEvents = [...allEvents];
    arrangedEvents = arrangedEvents.reverse().splice(-15);
    setLatestEvents(arrangedEvents);
  }, [web3.library, web3.chainId]);

  const loadTickets = useCallback(async () => {
    if (web3.library === undefined) return;
    const marketContract = new web3.library.eth.Contract(
      marketInterface.abi,
      marketContractAddress
    );
    let options = {
      filter: {
        purchaserAddress: web3.account,
      },
      fromBlock: 0,
      toBlock: "latest",
    };
    const eventLogs = await marketContract.getPastEvents(
      "EventTicketPurchased",
      options
    );
    let ticketsArr = [];
    eventLogs.forEach((eventLog) => {
      let singleTicketDetails = {
        eventName: "",
        eventId: "",
        purchaserAddress: "",
        ticketAddress: "",
        ticketId: 0,
      };
      const rawValues = eventLog["returnValues"];
      singleTicketDetails.eventName = rawValues["eventName"];
      singleTicketDetails.eventId = rawValues["eventId"];
      singleTicketDetails.purchaserAddress = rawValues["purchaserAddress"];
      singleTicketDetails.ticketAddress = rawValues["ticketAddress"];
      singleTicketDetails.ticketId = rawValues["ticketId"];
      ticketsArr.push(singleTicketDetails);
    });
    console.log(ticketsArr);
    setPurchasedTickets(ticketsArr);
  }, [web3.library]);
  const loadUserEvents = useCallback(async () => {
    if (web3.library === undefined) return;
    const marketContract = new web3.library.eth.Contract(
      marketInterface.abi,
      marketContractAddress
    );
    let organizer = web3.account;
    let userEvents = await marketContract.methods
      .getUsersEvents(organizer)
      .call();
    let latestUserEvents = [...userEvents];
    latestUserEvents = latestUserEvents.reverse().splice(-5);
    setUserEvents(latestUserEvents);
  }, [web3.library, web3.account]);
  useEffect(() => {
    loadData();
    loadTickets();
    loadUserEvents();
  }, [loadData, loadTickets, loadUserEvents]);
  if (inUnsupportedChain) {
    return (
      <>
        <Header />
        <div className="wrapper">
          <ToastContainer />
          <p>Kindly Switch to any of the supported chains below to proceed</p>
          <p>Rinkeby</p>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="wrapper">
        <ToastContainer />
        <div className="events">
          <h1>Lastest Events</h1>
          <p>All the lastest events </p>
          {web3.library !== undefined &&
            latestEvents !== undefined &&
            latestEvents.length > 0 && (
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
                        Price :
                        <span>
                          {" "}
                          {web3.library.utils.fromWei(
                            event["price"].toString(),
                            "ether"
                          )}{" "}
                          Ether
                        </span>
                      </p>
                      <div className="event-tile-btns">
                        <button
                          className="btn-buy"
                          onClick={() => {
                            history.push(`/${event["id"]}`);
                          }}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          {web3.library === undefined && <p>Connect your Account to proceed</p>}
          {latestEvents === undefined ||
            (latestEvents.length === 0 && (
              <p>No events have been listed yet</p>
            ))}
        </div>
        <div className="tickets">
          <h1>Your Tickets</h1>
          <p>All the tickets you currently own</p>
          <div className="tickets">
            {web3.library !== undefined && purchasedTickets.length > 0 && (
              <div className="tickets-all">
                {purchasedTickets.map((ticket, index) => (
                  <div className="tile" key={index}>
                    <p>
                      Event Name : <span>{ticket["eventName"]}</span>
                    </p>
                    <p>
                      Ticket Address : <span>{ticket["ticketAddress"]}</span>
                    </p>
                    <p>
                      Ticket id : <span>{ticket["ticketId"]}</span>
                    </p>
                    <div className="tile-btns">
                      {/* <button
                        onClick={() => {
                          history.push(
                            `/sell/${ticket["ticketId"]}/${ticket["eventId"]}`
                          );
                        }}
                      >
                        Sell Ticket
                      </button> */}
                    </div>
                  </div>
                ))}
                {web3.library === undefined && (
                  <p>Connect your Account to proceed</p>
                )}
                {purchasedTickets.length === 0 && (
                  <p>You have not purchased any tickets Yet</p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="event">
          <h1>Your Events</h1>
          <p>A list of all the events you've listed</p>
          {web3.library !== undefined && userEvents.length > 0 && (
            <div className="userevents-all">
              {userEvents.map((event, index) => (
                <div className="tile" key={index}>
                  <p>
                    Event name : <span>{event["name"]}</span>
                  </p>
                  <p>
                    Token Symbol : <span> {event["symbol"]}</span>{" "}
                  </p>
                  <p>
                    Price :
                    <span>
                      {" "}
                      {web3.library.utils.fromWei(
                        event["price"].toString(),
                        "ether"
                      )}{" "}
                      Ether
                    </span>
                  </p>
                  <p>
                    Sold out : <span> {event["soldOut"].toString()}</span>{" "}
                  </p>
                  <div className="event-tile-btns">
                    <button
                      className="btn-buy"
                      onClick={() => {
                        history.push(`/overview/${event["id"]}`);
                      }}
                    >
                      View Stats
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {web3.library === undefined && <p>Connect your account to proceed</p>}
          {userEvents.length === 0 && <p>You have not listed any events yet</p>}
        </div>
      </div>
    </>
  );
};

export default Home;
