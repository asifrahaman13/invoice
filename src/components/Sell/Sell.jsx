import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { default as credit } from "../contract/contract.json";
import Stats from "./Stats/Stats";
import Available from "./Available/Available";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Sell = () => {
  const [name, setName] = useState("");
  const [pan, setPan] = useState("");
  const [productname, setproductname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setPrice] = useState(0);
  const [buyers_pan, setBuyers_pan] = useState("");
  const [buyersName, setBuyersName] = useState("");
  const [product_id, setProduct_id] = useState("");
  const [cancel, setCancel] = useState(0);
  const [file, setFile] = useState();
  const [myipfsHash, setIPFSHASH] = useState("");
  const [b, setB] = useState([]);

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
    document.getElementById("c").click();
  }, []);

  const upload = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();

      formData.append("file", file);

      const API_KEY = " 72ab62449a78181a1cc1";
      const API_SECRET =
        "6d226f2c9ecc9a7696cb978a5c922839aa00c746ac2494f122f53ffea1130e06";

      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

      const response = await axios.post(url, formData, {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
          pinata_api_key: API_KEY,
          pinata_secret_api_key: API_SECRET,
        },
      });
      const res = await response.data.IpfsHash;
      await setIPFSHASH(res);

      if (response != "") {
        toast.success("Your file is uploaded successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong.", err);
    }
  };

  const submitOnChain = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.Submit(
        name,
        pan,
        productname,
        description,
        price,
        myipfsHash
      );
      if (tx.length != 0) {
        toast.success("Yout product is listed successfully.");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      toast.error("Something went wrong.", err);
    }
  };

  const showProducts = async (e) => {
    e.preventDefault();
    try {
      const p = await contract.AvailableProducts();
      const t = [];
      const a = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      };

      setB(a(p.slice(0, 6)));
    } catch (err) {
      toast.error("Something went wrong.", err);
    }
  };

  const CancelProduct = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.cancel(cancel);
    } catch (err) {
      if (cancel == "") {
        toast.error("Please enter a id");
      } else {
        toast.error("Somthing went wrong", err);
      }
    }
  };

  return (
    <>
      <section className="text-white body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-600">
              List Your Products Here
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-white">
              List all the products and enter the details of the products into
              it.{" "}
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div>
              <div className="p-2">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name e.g John Wick"
                    id="name"
                    name="name"
                    className="w-full bg-gray-50 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-black"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="p-2">
                <div className="relative">
                  <label for="email" className="leading-7 text-sm text-white">
                    Sellers pan(should be 12 digit number)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your 12 digit sellers pan"
                    id="pan"
                    name="email"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setPan(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="p-2">
                <div className="relative">
                  <label for="email" className="leading-7 text-sm text-white">
                    Product name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your product name"
                    id="email"
                    name="email"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setproductname(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="message" className="leading-7 text-sm text-white">
                    Product Description
                  </label>
                  <textarea
                    id="message"
                    placeholder="Enter your product's description"
                    name="message"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="p-2">
                <div className="relative">
                  <label for="email" className="leading-7 text-sm text-white">
                    Product Price
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your product's price"
                    name="email"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="p-2">
                <div className="relative">
                  <label for="email" className="leading-7 text-sm text-white">
                    UPLOAD FILE
                  </label>
                  <input
                    type="file"
                    id="file"
                    placeholder="Upload the file"
                    name="file"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>
              <button
                className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                onClick={upload}
              >
                UPLOAD THE FILE
              </button>

              <div className="p-2 w-full">
                <div className="relative">
                  <label for="message" className="leading-7 text-sm text-white">
                    Product ID
                  </label>
                  <div
                    id="message"
                    placeholder="Enter your product's id:Please note that it should be unique"
                    name="message"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-white-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  >{`Your Product id is: ${myipfsHash}`}</div>
                </div>
              </div>
              <div className="p-2 w-full">
                {myipfsHash && (
                  <button
                    className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                    onClick={submitOnChain}
                  >
                    LIST YOUR PRODUCT NOW
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-white body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-600">
              CANCEL PRODUCT
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Cancel prodcuct delivery using product Id
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div>
              <div className="p-2">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-white">
                    Enter Product Id
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the product Id you want to cancel"
                    id="product_id"
                    name="product_id"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setCancel(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <button
                  className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                  onClick={CancelProduct}
                >
                  CANCEL THIS PRODUCT NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Available showProducts={showProducts} b={b} />

      <ToastContainer />
    </>
  );
};

export default Sell;
