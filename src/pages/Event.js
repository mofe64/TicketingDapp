import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import marketInterface from "../abi/Market.json";
import { marketContractAddress } from "../util/Constants";
import Loader from "react-loader-spinner";
import "../css/pages/Event.css";
import moment from "moment";
import { useHistory } from "react-router";
const Event = function ({ match }) {
  const history = useHistory();
  const web3 = useWeb3React();
  const [eventId] = useState(match.params.eventId);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const notify = useCallback(
    (message, isError) => {
      if (!isError) {
        toast.success(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => history.push("/"),
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
          onClose: setTxLoading(false),
        });
      }
    },
    [history]
  );

  const loadEvent = useCallback(async () => {
    if (web3.library === undefined) return;
    const marketContract = new web3.library.eth.Contract(
      marketInterface.abi,
      marketContractAddress
    );
    setLoading(true);
    try {
      const retrievedEvent = await marketContract.methods
        .eventsList(eventId)
        .call();
      console.log(retrievedEvent);
      setEvent(retrievedEvent);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notify(error.message, true);
    }
  }, [web3.library, eventId, notify]);
  useEffect(() => {
    loadEvent();
  }, [loadEvent]);
  const buyTicket = async () => {
    if (web3.library === undefined) {
      notify(
        "Looks like everything is quite set up yet, please wait a minute and try again",
        true
      );
    }
    const marketContract = new web3.library.eth.Contract(
      marketInterface.abi,
      marketContractAddress
    );
    if (buyerName === "") {
      notify("Ticket name cannot not be empty", true);
      return;
    }
    setTxLoading(true);
    try {
      const ticketPriceInEther = web3.library.utils.fromWei(
        event["price"].toString(),
        "ether"
      );
      console.log(ticketPriceInEther);
      const tx = await marketContract.methods
        .purchaseEventTicket(eventId, buyerName)
        .send({
          from: web3.account,
          //   value: event["price"].toString(),
          value: web3.library.utils.toWei(
            ticketPriceInEther.toString(),
            "ether"
          ),
          gasPrice: "20000000000",
        });
      //   console.log(tx);
      //   console.log(tx["events"]["EventTicketPurchased"]["returnValues"]);
      const ticketId =
        tx["events"]["EventTicketPurchased"]["returnValues"]["ticketId"];
      const ticketAddress =
        tx["events"]["EventTicketPurchased"]["returnValues"]["ticketAddress"];
      notify(
        `Ticket purchased: Event Ticket Address ${ticketAddress} Event Ticket Id: ${ticketId}`,
        false
      );
      setTxLoading(false);
    } catch (error) {
      console.log(error);
      notify(error.message, true);
      setTxLoading(false);
    }
  };
  if (loading) {
    return (
      <>
        <Header />
        <div className="wrapper">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "70vh",
            }}
          >
            <Loader type="Audio" color="gold" height={150} width={150} />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="wrapper">
        {event && (
          <div className="event">
            <ToastContainer draggable pauseOnHover />
            <h1>Event Name : {event["name"]}</h1>
            <p>Event Symbol : {event["symbol"]}</p>
            <p>Event Organizer : {event["organizer"]}</p>
            <p>Sold Out : {event["soldOut"].toString()}</p>
            <p>
              Price :{" "}
              {web3.library.utils.fromWei(event["price"].toString(), "ether")}{" "}
              Ether
            </p>
            <p>
              Event Date :{" "}
              {moment.unix(event["date"]).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
          </div>
        )}
        <br />
        <div className="form-div">
          <p>
            Please enter a name you want to appear on the ticket and click buy
            to purchase a ticket
          </p>
          <input
            type="text"
            placeholder="Ticket Name"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
          />
        </div>
        <button className="dtl-btn-buy" onClick={buyTicket}>
          {txLoading && (
            <Loader type="TailSpin" color="#FFF" height={30} width={30} />
          )}
          {!txLoading && "Buy Ticket"}
        </button>
      </div>
    </>
  );
};

export default Event;
