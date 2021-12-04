// import { useState, useCallback } from "react";
// import Header from "../components/Header";
// import { ToastContainer, toast } from "react-toastify";
// import { useWeb3React } from "@web3-react/core";
// import Loader from "react-loader-spinner";
// import { useHistory } from "react-router";
// import marketInterface from "../abi/Market.json";
// import { marketContractAddress } from "../util/Constants";

// const SellTicket = function ({ match }) {
//   const [ticketId] = useState(match.params.ticketId);
//   const [eventId] = useState(match.params.eventId);
//   const [buyerAddress, setBuyerAddress] = useState("");
//   const history = useHistory();
//   const web3 = useWeb3React();
//   const notify = useCallback((message, isError) => {
//     if (!isError) {
//       toast.success(message, {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     } else {
//       toast.error(message, {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   }, []);
//   const sell = async () => {
//     if (web3.library === undefined) {
//       notify(
//         "Looks like everything is quite set up yet, please wait a minute and try again",
//         true
//       );
//     }
//     const marketContract = new web3.library.eth.Contract(
//       marketInterface.abi,
//       marketContractAddress
//     );
//     try {
//       const tx = await marketContract.methods
//         .resellTicket(eventId, ticketId, buyerAddress)
//         .send({
//           from: web3.account,
//         });
//     } catch (error) {}
//   };
//   return (
//     <>
//       <Header />
//       <div className="wrapper">
//         <h1>Sell ticker</h1>
//         <p>{ticketId}</p>
//         <p>{eventId}</p>
//         <div className="form-div">
//           <p>
//             Please enter the addres of the person you are transferring this
//             ticket to
//           </p>
//           <input
//             type="text"
//             placeholder="Buyer Address"
//             value={buyerAddress}
//             onChange={(e) => setBuyerAddress(e.target.value)}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default SellTicket;
