import { useState } from "react";
import Header from "../components/Header";
import "../css/pages/ListEvent.css";
import { useHistory } from "react-router";
import { useWeb3React } from "@web3-react/core";
import { ToastContainer, toast } from "react-toastify";
import Loader from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import marketInterface from "../abi/Market.json";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { marketContractAddress } from "../util/Constants";

const ListEvent = function () {
  const web3 = useWeb3React();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [eventName, setEventName] = useState("");
  const [eventSymbol, setEventSymbol] = useState("");
  const [capacity, setCapcity] = useState(1);
  const [canResell, setCanResell] = useState(true);
  const [resellCut, setResellCut] = useState(0);
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState();
  const handleChecked = () => {
    setCanResell(!canResell);
  };

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
        onClose: setLoading(false),
      });
    }
  };
  const list = async () => {
    if (web3.library === undefined) {
      notify(
        "Looks like everything is quite set up yet, please wait a minute and try again",
        true
      );
    }
    setLoading(true);
    const marketContract = new web3.library.eth.Contract(
      marketInterface.abi,
      marketContractAddress
    );
    try {
      const eventDateInUnixTimeStamp = date.unix();
      const tx = await marketContract.methods
        .listEvent(
          eventName,
          eventSymbol,
          capacity,
          canResell,
          resellCut,
          web3.library.utils.toWei(price.toString(), "ether"),
          eventDateInUnixTimeStamp.toString()
        )
        .send({
          from: web3.account,
          value: web3.library.utils.toWei("0.00025", "ether"),
          // value: web3.library.utils.toWei(price.toString(), "ether"),
          gasPrice: "20000000000",
        });
      console.log(tx);
      setLoading(false);
      notify("Event Listed successfully", false);
    } catch (error) {
      setLoading(false);
      notify(error.message, true);
    }
  };
  return (
    <>
      <Header />
      <div className="wrapper">
        <h1 className="form-header">
          Just fill in the following details and we'd set you up{" "}
        </h1>
        <ToastContainer draggable pauseOnHover />
        <div className="createform">
          <div className="form-div">
            <p>Enter the name of the event</p>
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="form-div">
            <p>Enter a symbol you'd like to associate with the event</p>
            <input
              type="text"
              placeholder="Event Symbol"
              value={eventSymbol}
              onChange={(e) => setEventSymbol(e.target.value)}
            />
          </div>
          <div className="form-div">
            <p>Enter the date of the event</p>
            <Datetime
              initialValue={Date.now()}
              value={date}
              onChange={(e) => {
                setDate(e);
              }}
            />
          </div>
          <div className="form-div">
            <p>Enter the number of ticket nft's you'd like to mint the event</p>
            <input
              type="number"
              placeholder="Event Capaity"
              min={1}
              value={capacity}
              onChange={(e) => setCapcity(e.target.value)}
            />
          </div>
          <div className="checkbox-div">
            <p>Are guests allowed to resell these tickets ?</p>
            <input
              type="checkbox"
              placeholder="Event Capaity"
              min={1}
              value={canResell}
              onChange={handleChecked}
            />
          </div>
          <div className="form-div">
            <p>
              Enter the percentage cut you want to take from each ticket resell
            </p>
            <input
              type="number"
              placeholder="Resell Cut"
              min={0}
              value={resellCut}
              disabled={canResell}
              onChange={(e) => setResellCut(e.target.value)}
            />
          </div>
          <div className="form-div">
            <p>Enter the price per ticket in Ether</p>
            <input
              type="number"
              placeholder="Price in Ether"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="btn-ctn">
          <button className="list-btn" onClick={list}>
            {loading && (
              <Loader type="TailSpin" color="#FFF" height={30} width={30} />
            )}
            {!loading && "List Event"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ListEvent;
