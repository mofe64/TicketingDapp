import Header from "../components/Header";
import { useCallback, useEffect, useState } from "react";
import marketInterface from "../abi/Market.json";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router";
import { useWeb3React } from "@web3-react/core";
import { marketContractAddress } from "../util/Constants";
import Loader from "react-loader-spinner";
import "../css/pages/Event.css";
import moment from "moment";

const EventOverview = function ({ match }) {
  const history = useHistory();
  const web3 = useWeb3React();
  const [eventId] = useState(match.params.eventId);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);

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
      </div>
    </>
  );
};

export default EventOverview;
