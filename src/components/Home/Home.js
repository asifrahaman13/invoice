import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { default as credit } from "../contract/contract.json";
import Stats from "./Stats/Stats";
import Available from "./Available/Available";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [name, setName] = useState("");
  const [pan, setPan] = useState("");
  const [productname, setproductname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setPrice] = useState(0);
  const [id, setId] = useState(0);

  const [buyers_pan, setBuyers_pan] = useState("");
  const [buyersName, setBuyersName] = useState("");
  const [product_id, setProduct_id] = useState("");
  const [cancel, setCancel] = useState(0);

  const [b, setB] = useState([]);

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
    document.getElementById("c").click();
    document.getElementById("stats").click();
  }, []);

  const submitOnChain = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.Submit(
        name,
        pan,
        productname,
        description,
        price,
        id
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

  const BuyOnchain = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.Buy(product_id, buyers_pan, buyersName);
      if (tx.length != 0) {
        toast.success("You brought this product successfully");
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

  const stats = async (e) => {
    e.preventDefault();
    try{
      const tx1 = await contract.TotalSellers();
      const tx2 = await contract.TotalBuyers();
      const tx3 = await contract.TotalProducts();
      setStat({
        total_products: ethers.utils.formatEther(tx1, 0) * 1e18,
        total_buyers: ethers.utils.formatEther(tx2, 0) * 1e18,
        total_sellers: ethers.utils.formatEther(tx3, 0) * 1e18,
      });
      if(tx1.length!=0 && tx2.length!=0 && tx3.length!=0){
        
      }
      else{
        toast.error("Something went wrong")
      }
    }
    catch(err){
      toast.error("Somthing went wrong",err)
    }
    
  };

  const CancelProduct = async (e) => {
    e.preventDefault();
    try{
      const tx = await contract.cancel(cancel);
    }
    catch(err){
      if(cancel==""){
        toast.error("Please enter a id")
      }
      else{
          toast.error("Somthing went wrong",err);
      }
    }
    
  };

  return (
    <>
      <Stats
        total_products={stat.total_products}
        total_buyers={stat.total_buyers}
        total_sellers={stat.total_sellers}
        stats={stats}
      />
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-600">
              List Your Products Here
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              List all the products and enter the details of the products into
              it.{" "}
            </p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div>
              <div class="p-2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name e.g John Wick"
                    id="name"
                    name="name"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="p-2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-600">
                    Sellers pan
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your 10 digit sellers pan"
                    id="pan"
                    name="email"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setPan(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="p-2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-600">
                    Product name
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your product name"
                    id="email"
                    name="email"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setproductname(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600">
                    Product Description
                  </label>
                  <textarea
                    id="message"
                    placeholder="Enter your product's description"
                    name="message"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
              <div class="p-2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-600">
                    Product Price
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your product's price"
                    name="email"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600">
                    Product ID
                  </label>
                  <textarea
                    id="message"
                    placeholder="Enter your product's id:Please note that it should be unique"
                    name="message"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                  onClick={submitOnChain}
                >
                  LIST YOUR PRODUCT NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-600">
              Buy any product here
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Buy the products
            </p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div>
              <div class="p-2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">
                    Product Id
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the id of the product you want to purchase"
                    id="product_id"
                    name="product_id"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setProduct_id(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="p-2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-600">
                    Buyer pan
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your buyer's pan"
                    id="buyers_pan"
                    name="buyers_pan"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setBuyers_pan(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="p-2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    id="name"
                    name="name"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setBuyersName(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <button
                  class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                  onClick={BuyOnchain}
                >
                  BUY THIS PRODUCT NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-600">
              CANCEL PRODUCT
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Cancel prodcuct delivery using product Id
            </p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div>
              <div class="p-2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">
                    Enter Product Id
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the product Id you want to cancel"
                    id="product_id"
                    name="product_id"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => {
                      setCancel(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <button
                  class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
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
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <h1 class="text-3xl font-medium title-font text-pink-600 mb-12 text-center">
            Testimonials
          </h1>
          <div class="flex flex-wrap -m-4">
            <div class="p-4 md:w-1/2 w-full">
              <div class="h-full bg-pink-100 p-8 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="block w-5 h-5 text-pink-400 mb-4"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p class="leading-relaxed mb-6">
                  Block-merce is the perfect place for the people who wants to
                  sell their products online. This is the best marketplace for
                  the sellers and the buyers to interact online.
                </p>
                <a class="inline-flex items-center">
                  <img
                    alt="testimonial"
                    src="https://dummyimage.com/106x106"
                    class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                  />
                  <span class="flex-grow flex flex-col pl-4">
                    <span class="title-font font-medium text-pink-900">
                      Holden Caulfield
                    </span>
                    <span class="text-pink-500 text-sm">UI DEVELOPER</span>
                  </span>
                </a>
              </div>
            </div>
            <div class="p-4 md:w-1/2 w-full">
              <div class="h-full bg-pink-100 p-8 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="block w-5 h-5 text-pink-400 mb-4"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p class="leading-relaxed mb-6">
                  The platform is the best marketplace to list product
                </p>
                <a class="inline-flex items-center">
                  <img
                    alt="testimonial"
                    src="https://dummyimage.com/107x107"
                    class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                  />
                  <span class="flex-grow flex flex-col pl-4">
                    <span class="title-font font-medium text-pink-900">
                      Alper Kamu
                    </span>
                    <span class="text-pink-500 text-sm">DESIGNER</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />

    </>
  );
};

export default Home;
