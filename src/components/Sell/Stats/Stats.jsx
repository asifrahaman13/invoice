import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { NavLink } from "react-router-dom";
import { default as credit } from "../../contract/contract.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Stats = () => {


  const [stat, setStat] = useState({
    total_products: 0,
    total_buyers: 0,
    total_sellers: 0,
  });


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
    stats();
    document.getElementById("stats").click();
    document.getElementById("stats").click();
  }, []);

  const subscribe = async (e) => {
    console.log("DFD");
    e.preventDefault();
    try {
      const tx = await contract.subscibe();
      if (tx.length != 0) {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const stats = async (e) => {
    e.preventDefault();
    try {
      const tx1 = await contract.TotalSellers();
      const tx2 = await contract.TotalBuyers();
      const tx3 = await contract.TotalProducts();
      setStat({
        total_products: ethers.utils.formatEther(tx1, 0) * 1e18,
        total_buyers: ethers.utils.formatEther(tx2, 0) * 1e18,
        total_sellers: ethers.utils.formatEther(tx3, 0) * 1e18,
      });
      if (tx1.length != 0 && tx2.length != 0 && tx3.length != 0) {
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Somthing went wrong", err);
    }
  };

  return (
    <>
      <button id="stats" onClick={stats}></button>
      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
            <div className="w-full sm:p-4 px-4 mb-6">
              <h1 className="title-font font-medium text-xl mb-2 text-pink-600">
                Welcome to the blockmerse
              </h1>
              <div className="leading-relaxed">
                In this platform you can securely have your products listed and
                anyone can buy your products. You can also track your invoices
                through your pan card ids. .
              </div>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
              <h2 className="title-font font-medium text-3xl text-white">
                {stat.total_products}
              </h2>
              <p className="leading-relaxed">Total sellers</p>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
              <h2 className="title-font font-medium text-3xl text-white">
                {stat.total_buyers}
              </h2>
              <p className="leading-relaxed">Total Buyers</p>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
              <h2 className="title-font font-medium text-3xl text-white">
                {stat.total_sellers}
              </h2>
              <p className="leading-relaxed">Total Products</p>
            </div>
          </div>
          <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
            <img
              className="object-cover object-center w-full h-full"
              src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmxvY2tjaGFpbnxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="stats"
            />
          </div>
          <button
            className="inline-flex items-center bg-pink-600 border-0 py-1 px-3 focus:outline-none hover:bg-pink-600 rounded text-base mt-4 md:mt-0 text-pink-100 mx-1 font-bold"
            onClick={subscribe}
          >
            SUBSCRIBE
          </button>
          <NavLink to="/contact">
          <button className="inline-flex items-center bg-pink-600 border-0 py-1 px-3 focus:outline-none hover:bg-pink-600 rounded text-base mt-4 md:mt-0 text-pink-100 font-bold" >
            CONTACT US
          </button>
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default Stats;
