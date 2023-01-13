import React,{useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { ethers } from "ethers";
import { default as credit } from "../contract/contract.json";

const Navbar = () => {

  const [sender,setSender]=useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const contractAddress = process.env.REACT_APP_CONTRACT;

  const ABI = credit;

  const contract = new ethers.Contract(contractAddress, ABI, signer);

  const main = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setSender(accounts)
  };

  useEffect(() => {
    main();
  }, []);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl text-white">Block-verse</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        <NavLink to="/" className="mr-5 px-1  text-white text-xl">
            Home
          </NavLink>
          <NavLink to="/sell" className="mr-5 px-1  text-white text-xl">
            Sell & Buy
          </NavLink>
          <NavLink to="/buy" className="mr-5 px-1 text-white text-xl">
            Orders
          </NavLink>
          <NavLink to="/events" className="mr-5 px-1 text-white text-xl">
            Events
          </NavLink>
          <NavLink to="/about" className="mr-5 px-1 text-white text-xl">
            About
          </NavLink>
          <NavLink to="/contact" className="mr-5 px-1 text-white text-xl">
            Contact
          </NavLink>
        </nav>
        <button className="inline-flex items-center bg-pink-600 border-0 py-1 px-3 focus:outline-none hover:bg-pink-600 rounded text-base mt-4 md:mt-0 text-pink-100">
          {sender}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
