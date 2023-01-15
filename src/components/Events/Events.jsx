import React, { useEffect, useState } from "react";
import { default as credit } from "../contract/contract.json";
import { ethers } from "ethers";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [buy_events, setBuyevents] = useState([]);
  const [deliver_events, setDeliverEvents] = useState([]);

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
    document.getElementById("events").click();
    document.getElementById("buy_events").click();
    document.getElementById("delivered_events").click();
  }, []);

  const getEvents = async () => {
    let eventFilter = contract.filters.Product_register();
    let event = await contract.queryFilter(eventFilter);
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    };

    setEvents(shuffle(event).slice(0, 6));
  };

  const getDeliverEvents = async () => {
    let eventFilter = contract.filters.LogDelievered();
    let event = await contract.queryFilter(eventFilter);
    console.log(event);
    event.map((item, idx) => {
      console.log(item.blockHash);
    });
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    };

    setDeliverEvents(shuffle(event).slice(0, 6));
  };

  const getBuyEvents = async () => {
    let eventFilter = contract.filters.Product_Buy();
    let event = await contract.queryFilter(eventFilter);
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    };
    setBuyevents(shuffle(event).slice(0, 6));
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-700">
                    SEE THE RECENT PRODUCTS REGISTERED
                  </h1>
                  <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-white">
                    Whatever cardigan tote bag tumblr hexagon brooklyn
                    asymmetrical gentrify, subway tile poke farm-to-table.
                    Franzen you probably haven't heard of them man bun deep
                    jianbing selfies heirloom.
                  </p>
                </div>
              </div>
            </section>

            {events.map((item, idx) => {
              return (
                <>
                  <div className="p-4 lg:w-1/3">
                    <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden relative text-justify">
                      <div className="text-xs font-bold text-pink-500">
                        {idx + 1}.BLOCK NUMBER: {item.blockNumber}
                      </div>
                      <br />
                      <h1 className="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Owner
                      </h1>
                      <p>{item.args.Product_Owner}</p>
                      <br />

                      <h1 className="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Id
                      </h1>
                      <p>{item.args.Product_Id}</p>
                      <br />
                      <h1 className="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Price
                      </h1>
                      <p className="leading-relaxed mb-3">
                        {" "}
                        {ethers.utils.formatEther(item.args.Product_Price, 0) *
                          1e18}
                      </p>
                      <br />
                      <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"></div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-700">
                    SEE THE RECENT BUYERS EVENTS
                  </h1>
                  <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-white">
                    Whatever cardigan tote bag tumblr hexagon brooklyn
                    asymmetrical gentrify, subway tile poke farm-to-table.
                    Franzen you probably haven't heard of them man bun deep
                    jianbing selfies heirloom.
                  </p>
                </div>
              </div>
            </section>
            {buy_events.map((item, idx) => {
              return (
                <>
                  <div className="p-4 lg:w-1/3">
                    <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden relative text-justify">
                      <div className="text-xs font-bold text-pink-500">
                        {idx + 1}.BLOCK NUMBER: {item.blockNumber}
                      </div>
                      <br />
                      <h1 className="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        BLOCK HASH
                      </h1>
                      <p>{item.args.Product_Buyer}</p>
                      <br />
                      <h1 className="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Owner
                      </h1>
                      <p>{item.blockHash}</p>
                      <br />

                      <h1 className="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Id
                      </h1>
                      <p>{item.args.Product_Id}</p>
                      <br />
                      <h1 className="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Price
                      </h1>
                      <p className="leading-relaxed mb-3">
                        {" "}
                        {ethers.utils.formatEther(item.args.Product_Price) *
                          1e18}
                      </p>
                      <br />
                      <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"></div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-700">
                    SEE THE RECENT DELIVERED EVENTS
                  </h1>
                  <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-white">
                    Whatever cardigan tote bag tumblr hexagon brooklyn
                    asymmetrical gentrify, subway tile poke farm-to-table.
                    Franzen you probably haven't heard of them man bun deep
                    jianbing selfies heirloom.
                  </p>
                </div>
              </div>
            </section>
            {deliver_events.map((item, idx) => {
              return (
                <>
                  <div className="p-4 lg:w-1/2">
                    <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden relative text-justify">
                      <div className="text-xs font-bold text-pink-500">
                        {idx + 1}.BLOCK NUMBER: {item.blockNumber}
                      </div>
                      <br />
                      <h1 className="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Block Hash
                      </h1>
                      <p>{item.blockHash}</p>
                      <h1 className="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Id
                      </h1>
                      <p>{item.args.productId}</p>
                      <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"></div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
      <button id="events" onClick={getEvents}></button>
      <button id="buy_events" onClick={getBuyEvents}></button>
      <button id="delivered_events" onClick={getDeliverEvents}></button>
    </>
  );
};

export default Events;
