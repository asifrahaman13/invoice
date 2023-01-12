import React, { useEffect, useState } from "react";
import { default as credit } from "../contract/contract.json";
import { ethers } from "ethers";

const Buy = () => {
  const [data, setData] = useState([]);
  const [pan, setPan] = useState("");
  const [productid, setProductid] = useState("");
  const [trackdetails, setTrackdetails] = useState("");
  const [agent, setAgent] = useState("");
  const [paid, setPaid] = useState("");
  const [delivered, setDelivered] = useState("");
  const [sellerspan,setSellerspan] = useState("");
  const [sellersdata,setSellersData] = useState([]);
  const [trackData, setTrackdata] = useState({
    status: "",
    owner: "",
    timelock: "",
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
  }, []);

  const display = async (e) => {
    e.preventDefault();
    const tx = await contract.DetailsFromPan(pan);
    setData(tx);
    console.log(tx);
  };

  const track = async (e) => {
    e.preventDefault();

    const setStatusCode=(n)=>{
        if(n==1){
          return "Available";
        }
        else if(n==2){
          return "Ordered";
        }
        else if(n==4){
          return "Item delivered";
        }
    }




    const tx = await contract.track_Status(productid);
    console.log(tx);
    setTrackdetails(tx);
    setTrackdata({
      status: setStatusCode(tx.Status),
      owner: tx.Buyer_Owner,
      timelock: ethers.utils.formatEther(trackdetails.Time_Lock, 0)*1000000000000000000,
    });
  };

  const addDeliveryAgent = async () => {
    const tx = await contract.AddDeleveryAgent(agent);
  };

  const pricePaid = async () => {
    const tx = await contract.AmountPaid(paid);
  };

  const itemDelivered = async () => {
    const tx = await contract.delivered(delivered);
  };

  const sellersData = async (e) => {
    e.preventDefault();
    const tx = await contract.SellersDetails(sellerspan);
    setSellersData(tx);
    console.log(tx);
  };

  return (
    <>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-600">
              ADD DELIVERY AGENT(AUTHORITY)
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Add delivery agent for the product delivey
            </p>
          </div>
          <div>
            <div>
              <div>
                <div class="relative">
                  <input
                    name="agent"
                    onChange={(e) => {
                      setAgent(e.target.value);
                    }}
                    type="text"
                    placeholder="Enter delivery agent(only authorised people)"
                    id="name"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <button
                  onClick={addDeliveryAgent}
                  class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                >
                  ADD AGENT
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
              DELIVERY AGENT
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whether Amount is paid by the user(enter the product id)
            </p>
          </div>
          <div>
            <div>
              <div>
                <div class="relative">
                  <input
                    name="paid"
                    onChange={(e) => {
                      setPaid(e.target.value);
                    }}
                    type="text"
                    placeholder="Enter the id of the product which is paid"
                    id="paid"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <button
                  onClick={pricePaid}
                  class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                >
                  AMOUUNT PAID
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
              DELIVERY AGENT
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whether item is delivered(enter product id)
            </p>
          </div>
          <div>
            <div>
              <div>
                <div class="relative">
                  <input
                    name="agent"
                    onChange={(e) => {
                      setDelivered(e.target.value);
                    }}
                    type="text"
                    placeholder="Enter the id of the product delivered"
                    id="delivered"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <button
                  onClick={itemDelivered}
                  class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                >
                  DELIVERED
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-600">
              See all the previous invoice from the pan
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              All the informations displayed here are protected and we do not
              have any rights over it. Your personal information over the
              blockchain is secured and we do not intervene in the process.
              Please do not however disclose your pan number with anyone else.
            </p>
          </div>
          <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-600">
              TRACK BUYERS INVOICE THROUGH YOUR PAN
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify.
            </p>
          </div>
          <div>
            <div>
              <div>
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">
                    Enter your buyers pan
                  </label>
                  <input
                    name="pan"
                    onChange={(e) => {
                      setPan(e.target.value);
                    }}
                    type="text"
                    placeholder="Track your invoice through buyer's pan"
                    id="name"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <button
                  onClick={display}
                  class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pnk-600 rounded text-lg"
                >
                  CHECK INVOICES
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {data.map((item, idx) => {
              return (

                <>
                  <div class="p-4 lg:w-1/3">
                    
                    <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden relative text-justify">
                    <div className="text-xs font-bold text-pink-500">INVOICE NO: {idx+1}</div>
                    <br />
                     <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product name
                        </h1>
                      <p>{item.name}</p>
                      <br />


                      <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Time stamp
                      </h1>
                      <p> {item.invoiceDate.toString()}</p>
                      <br />
                      <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Price
                      </h1>
                      <p class="leading-relaxed mb-3">
                        {" "}
                        {item.invoiceAmount.toString()}
                      </p>
                      <br />
                      <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Description
                      </h1>
                      <p class="leading-relaxed mb-3">
                      {item.ProductDescription.toString()}
                      </p>
                      <br />
                      <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1">
                       Sellers Transaction Id
                      </h1>
                      <p class="leading-relaxed mb-3">
                        {" "}
                        {item.transactionFrom.toString()}
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



      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-600">
              TRACK SELLERS INVOICE THROUGH YOUR PAN
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify.
            </p>
          </div>
          <div>
            <div>
              <div>
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">
                    Enter your sellers pan
                  </label>
                  <input
                    name="pan"
                    onChange={(e) => {
                      setSellerspan(e.target.value);
                    }}
                    type="text"
                    placeholder="Track your invoices through sellers pan"
                    id="name"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <button
                  onClick={sellersData}
                  class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pnk-600 rounded text-lg"
                >
                  CHECK INVOICES
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* {data.map((item, i) => {
            return (
              <>
                <div class="flex flex-wrap">
                  <div class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                    <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                      {item.name}
                    </h2>
                    <p class="leading-relaxed text-base mb-4">
                      {item.invoiceAmount.toString()}
                    </p>
                    <p class="leading-relaxed text-base mb-4">
                      {item.invoiceDate.toString()}
                    </p>
                    <p class="leading-relaxed text-base mb-4">
                      {item.invoiceAmount.toString()}
                    </p>
                    <p class="leading-relaxed text-base mb-4">
                      {item.ProductDescription.toString()}
                    </p>
                    <a class="text-indigo-500 inline-flex items-center">
                      Learn More
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>

                <button class="flex mx-auto mt-16 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">
                  SEE ON ETHERSCAN
                </button>
              </>
            );
          })} */}






      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {sellersdata.map((item, idx) => {
              return (

                <>
                  <div class="p-4 lg:w-1/3">
                    
                    <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden relative text-justify">
                    <div className="text-xs font-bold text-pink-500">INVOICE NO: {idx+1}</div>
                    <br />
                     <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product name
                        </h1>
                      <p>{item.name}</p>
                      <br />


                      <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Time stamp
                      </h1>
                      <p> {ethers.utils.formatEther(item.invoiceDate,0)*1000000000000000000}</p>
                      <br />
                      <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Price
                      </h1>
                      <p class="leading-relaxed mb-3">
                        {" "}
                        {ethers.utils.formatEther(item.invoiceAmount,0)*1000000000000000000}
                      </p>
                      <br />
                      <br />
                      <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1">
                       Sellers Transaction Id
                      </h1>
                     
                    
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


        </div>
      </section>

      

      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-600">
              TRACK YOUR PRODUCT
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify.
            </p>
          </div>
          <div>
            <div>
              <div>
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    name="pan"
                    onChange={(e) => {
                      setProductid(e.target.value);
                    }}
                    type="text"
                    placeholder="Track your product with product id(only available if you purchased)"
                    id="name"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <button
                  onClick={track}
                  class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                >
                  Track your order
                </button>

                <section class="text-gray-600 body-font overflow-hidden">
                  <div class="container px-5 py-24 mx-auto">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap">
                      <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h1 class="text-pink-600 text-3xl title-font font-medium mb-4">
                          Track your product{" "}
                        </h1>
                        <div class="flex mb-4"></div>
                        <p class="leading-relaxed mb-4">
                          You can track all the details of your shipment here in
                          the block.
                        </p>
                        <div class="flex border-t border-gray-200 py-2">
                          <span class="text-gray-500">
                            status of your product
                          </span>
                          <span class="ml-auto text-gray-900">
                            {trackData.status}
                          </span>
                        </div>
                        <div class="flex border-t border-gray-200 py-2">
                          <span class="text-gray-500">address to track</span>
                          <span class="ml-auto text-gray-900">
                            {" "}
                            {trackData.owner}
                          </span>
                        </div>
                        <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                          <span class="text-gray-500">Time lock</span>
                          <span class="ml-auto text-gray-900">
                            {trackData.timelock}
                          </span>
                        </div>
                        <div class="flex">
                          <button class="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                            VIEW ON ETHERSCAN
                          </button>
                          <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                            <svg
                              fill="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              class="w-5 h-5"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <img
                        alt="ecommerce"
                        class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                        src="https://img.freepik.com/free-vector/characters-people-holding-blockchain-network_53876-26824.jpg?w=2000"
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Buy;
