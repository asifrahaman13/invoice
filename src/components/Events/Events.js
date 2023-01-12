import React, { useEffect, useState } from "react";
import { default as credit } from "./hackathon.json";
import { ethers } from "ethers";

const Events = () => {
  const [events, setEvents] = useState([]);

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
    document.getElementById("events").click();
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

    setEvents(shuffle(event).slice(0,6));  
  };

  return (
    <>
      <button id="events" onClick={getEvents}></button>
      
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {events.map((item, idx) => {
              return (

                <>
                  <div class="p-4 lg:w-1/3">
                    <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden relative text-justify">
                    <div className="text-xs font-bold text-pink-500">{idx+1}.BLOCK NUMBER:  {item.blockNumber}</div>
                    <br />
                     <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Owner
                        </h1>
                      <p>{item.args.Product_Owner}</p>
                      <br />


                      <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Id
                      </h1>
                      <p>{ethers.utils.formatEther(item.args.Product_Id) *
                          1000000000000000000}</p>
                      <br />
                      <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Price
                      </h1>
                      <p class="leading-relaxed mb-3">
                        {" "}
                        {ethers.utils.formatEther(item.args.Product_Price) *
                          1000000000000000000}
                      </p>
                      <br />
                      
                    
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
    </>
  );
};

export default Events;
