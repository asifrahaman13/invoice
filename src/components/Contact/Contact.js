import React, { useState, useEffect } from "react";
import { default as credit } from "../contract/contract.json";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [concern, setConcern] = useState({
    name: "",
    product_id: 0,
    concerns: "",
  });

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const contractAddress = "0x1b7330d658d6208aa3ad6296ec86ec542dbf2633";

  const ABI = credit;

  const contract = new ethers.Contract(contractAddress, ABI, signer);

  const main = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  };

  useEffect(() => {
    main();
  }, []);

  const sendConcern = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.sendConcern(
        concern.name,
        concern.product_id,
        concern.concerns
      );
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const onChange = (e) => {
    setConcern({ ...concern, [e.target.name]: e.target.value });
  };

  return (
    <>
      <center>
        <section class="h-screen">
          <div class="container px-6 py-12 h-full">
            <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
              <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  class="w-full"
                  alt="Phone image"
                />
              </div>
              <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
                <form>
                  <div class="mb-6">
                    <label for="name" class="leading-7 text-sm text-white">
                      Enter your name
                    </label>
                    <input
                      type="text"
                      name="Enter your name"
                      class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-gray-500 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                      placeholder="Enter your name"
                      onChange={onChange}
                    />
                  </div>

                  <div class="mb-6">
                  <label for="message" class="leading-7 text-sm text-white">
                    Enter the product Id
                  </label>
                    <input
                      type="password"
                      class="form-control block w-full px-4 py-2 text-xl font-normal bg-gray-500 text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
                      placeholder="Product Id"
                      name="product_id"
                      onChange={onChange}
                    />
                  </div>

                  <div class="p-2 w-full">
                    <div class="relative">
                      <label for="message" class="leading-7 text-sm text-white">
                    Enter your concern
                  </label>
                      <textarea
                        id="concerns"
                        placeholder="Enter your concern"
                        name="concerns"
                        class="w-full bg-gray-500 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        onChange={onChange}
                      ></textarea>
                    </div>
                  </div>

                  <button
                    onClick={sendConcern}
                    type="submit"
                    class="inline-block px-7 py-3 bg-pink-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-pink-700 hover:shadow-lg focus:bg-pink-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    SEND CONCERN
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </center>
      <ToastContainer/>
    </>
  );
};

export default Contact;
