import React, { useEffect, useState } from "react";
import Skills from "../skills/Skills";
import { ethers } from "ethers";

import { default as credit } from "./hack.json";

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
  const [cancel,setCancel]=useState(0);

  const [b, setB] = useState([]);

  const [stat, setStat] = useState({
    total_products: 0,
    total_buyers: 0,
    total_dellers: 0,
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
    document.getElementById("c").click();
    document.getElementById("stats").click();
  }, []);

  const submitOnChain = async (e) => {
    e.preventDefault();
    const txi = await contract.Submit(
      name,
      pan,
      productname,
      description,
      price,
      id
    );
  };

  const BuyOnchain = async (e) => {
    e.preventDefault();
    const txi = await contract.Buy(product_id, buyers_pan, buyersName);
  };

  const showProducts = async (e) => {
    e.preventDefault();
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
  };

  const stats = async (e) => {
    e.preventDefault();
    const tx1 = await contract.TotalSellers();
    const tx2 = await contract.TotalBuyers();
    const tx3 = await contract.TotalProducts();

    const ty1 = ethers.utils.formatEther(tx1, 0) * 1000000000000000000;
    // console.log(ethers.utils.formatEther(tx1, 0) * 1000000000000000000);
    const ty2 = ethers.utils.formatEther(tx2, 0) * 1000000000000000000;
    // console.log(ethers.utils.formatEther(tx2, 0) * 1000000000000000000);
    const ty3 = ethers.utils.formatEther(tx3, 0) * 1000000000000000000;
    // console.log(ethers.utils.formatEther(tx3, 0) * 1000000000000000000);

    setStat({
      total_products: ty1,
      total_buyers: ty2,
      total_dellers: ty3,
    });
  };

  const CancelProduct=async(e)=>{
      e.preventDefault();
      const tx=await contract.cancel(cancel);
      console.log(cancel)
  }

  return (
    <>
  
      <button id="stats" onClick={stats}></button>

      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-wrap">
          <div class="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
            <div class="w-full sm:p-4 px-4 mb-6">
              <h1 class="title-font font-medium text-xl mb-2 text-pink-600">
                Welcome to the blockmerse
              </h1>
              <div class="leading-relaxed">
                In this platform you can securely have your products listed and
                anyone can buy your products. You can also track your invoices
                through your pan card ids. .
              </div>
            </div>
            <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
              <h2 class="title-font font-medium text-3xl text-pink-600">
                {stat.total_products}
              </h2>
              <p class="leading-relaxed">Total sellers</p>
            </div>
            <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
              <h2 class="title-font font-medium text-3xl text-pink-600">
                {stat.total_buyers}
              </h2>
              <p class="leading-relaxed">Total Buyers</p>
            </div>
            <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
              <h2 class="title-font font-medium text-3xl text-pink-600">
                {stat.total_products}
              </h2>
              <p class="leading-relaxed">Total Products</p>
            </div>
          </div>
          <div class="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
            <img
              class="object-cover object-center w-full h-full"
              src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmxvY2tjaGFpbnxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="stats"
            />
          </div>
          <button className="inline-flex items-center bg-pink-600 border-0 py-1 px-3 focus:outline-none hover:bg-pink-600 rounded text-base mt-4 md:mt-0 text-pink-100 mx-1 font-bold">
          SUBSCRIBE
        </button>
        <button className="inline-flex items-center bg-pink-600 border-0 py-1 px-3 focus:outline-none hover:bg-pink-600 rounded text-base mt-4 md:mt-0 text-pink-100 font-bold">
          CONTACT US
        </button>
        </div>
      </section>

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

      <div class="p-10 w-ful">
        <button
          class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
          onClick={showProducts}
          id="c"
        >
          CHECK ALL AVAILBALE PRODUCTS
        </button>
      </div>

      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {b.map((item, idx) => {
              return (
                <>
                  <div class="p-4 lg:w-1/3">
                    <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden relative text-justify">
                  
                      <h2 class="title-font sm:text-2xl text-xl font-medium text-pink-500 mb-3 py-2">
                        {item.Product_Name}
                      </h2>
                      <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Owner
                      </h1>
                      <p>{item.Product_Owner}</p>
                      <br />
                      <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Description
                      </h1>
                      <p class="leading-relaxed mb-3">
                        {" "}
                        {item.Product_Description}
                        lorem400
                      </p>
                      <br />
                      <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Price
                      </h1>
                      <p class="leading-relaxed mb-3">
                        {ethers.utils.formatEther(item.Product_Price, 0)*1000000000000000000}
                      </p>
                      <br />
                      <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1">
                        Product id
                      </h1>
                      <p class="leading-relaxed mb-3">
                        {" "}
                        {ethers.utils.formatEther(item.product_id, 10) *
                          1000000000000000000}
                      </p>
                    
                      <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                      
                        
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>

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
                  Block-merce is the perfect place for the people who wants to sell their products online. This is the best marketplace for the sellers and the buyers to interact online.
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
    </>
  );
};

export default Home;
