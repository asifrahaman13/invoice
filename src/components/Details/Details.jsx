import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { default as credit } from "../contract/contract.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Details = () => {
  const { slug } = useParams();
  const [price, setPrice] = useState(0);
  const [buyers_pan, setBuyers_pan] = useState("");
  const [buyersName, setBuyersName] = useState("");
  const [homedisplay, setHomedisplay] = useState([]);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = process.env.REACT_APP_CONTRACT;
  const ABI = credit;
  const contract = new ethers.Contract(contractAddress, ABI, signer);

  const main = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  };

  useEffect(() => {
    main();
    document.getElementById("show").click();
  }, []);

  const showProducts = async (e) => {
    e.preventDefault();
    try {
      const p = await contract.ProductsDetails(slug);
      setPrice(ethers.utils.formatEther(p.Product_Price, 0) * 1e18);
      setHomedisplay(p);
    } catch (err) {
      toast.error("Something went wrong.", err);
    }
  };

  const BuyOnchain = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.Buy(slug, buyers_pan, buyersName);
      if (tx.length != 0) {
        toast.success("You brought this product successfully");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      toast.error("Something went wrong.", err);
    }
  };

  return (
    <>
      <h1 className="sm:text-3xl py-10 text-2xl font-medium title-font mb-4 text-pink-600 text-center">
        PRODUCT DETAILS
      </h1>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="h-84 w-85 object-cover object-center rounded"
              src={`https://gateway.pinata.cloud/ipfs/${slug}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <div className="mt-4">
                <h3 className="text-xl text-green-500 tracking-widest title-font mb-1">
                  PRODUCT ID
                </h3>
              </div>
              <p className="leading-relaxed">{homedisplay.product_id}</p>

              <div className="mt-4">
                <h3 className="text-xl text-green-500 tracking-widest title-font mb-1">
                  PRODUCT NAME
                </h3>
              </div>
              <p className="leading-relaxed">{homedisplay.Product_Name}</p>

              <div className="mt-4">
                <h3 className="text-xl text-green-500 tracking-widest title-font mb-1">
                  PRODUCT LISTED BY
                </h3>
              </div>
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {homedisplay.Product_Owner}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                The Catcher in the Rye
              </h1>
              <div className="flex mb-4"></div>

              <div className="mt-4">
                <h3 className="text-xl text-green-500 tracking-widest title-font mb-1">
                  PRODUCT DESCIPTION
                </h3>
              </div>
              <p className="leading-relaxed text-justify">
                {homedisplay.Product_Description}
              </p>

              <div className="mt-4">
                <h3 className="text-xl text-green-500 tracking-widest title-font mb-1">
                  PRODUCT PRICE
                </h3>
              </div>
              <p className="leading-relaxed">Ξ {price} (ETH)</p>
            </div>
          </div>
        </div>
      </section>
      <section className="text-white body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-600">
              Buy any product here
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-white">
              Buy the products
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div>
              <div className="p-2">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-white">
                    Product Id
                  </label>
                  <div
                    id="message"
                    placeholder="Enter your product's id:Please note that it should be unique"
                    name="message"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-white-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out text-yellow-500"
                  >{`Your Product id is:${homedisplay.product_id}`}</div>
                </div>
              </div>
              <div className="p-2">
                <div className="relative">
                  <label for="email" className="leading-7 text-sm text-white">
                    Buyer pan(Should be of 12 digit)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your buyer's pan"
                    id="buyers_pan"
                    name="buyers_pan"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setBuyers_pan(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="p-2">
                <div className="relative">
                  <label for="email" className="leading-7 text-sm text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    id="name"
                    name="name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setBuyersName(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <button
                  className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                  onClick={BuyOnchain}
                >
                  BUY THIS PRODUCT NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <button onClick={showProducts} id="show"></button>
    </>
  );
};

export default Details;
