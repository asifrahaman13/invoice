import React from "react";
import { ethers } from "ethers";
import { NavLink } from "react-router-dom";
import Details from "../../Details/Details";

const ShowInHome = ({ showProducts, homedisplay }) => {
  return (
    <>
      <div class="p-10 w-ful">
        <button
          class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
          onClick={showProducts}
          id="home_display"
        >
          CHECK ALL AVAILBALE PRODUCTS
        </button>
      </div>

    

      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {homedisplay.map((item, idx) => {
              return (
                <>
                  
                    <div class="lg:w-1/4 md:w-1/2 p-4 w-full transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-400 duration-300">
                      <a class="block relative h-48 rounded overflow-hidden">
                      <NavLink to={`${item.product_id}`} component={<Details />}>
                        <img
                          alt="ecommerce"
                          class="object-cover object-center w-full h-full block"
                          src={`https://gateway.pinata.cloud/ipfs/${item.product_id}`}
                        />
                        </NavLink>
                      </a>
                      <div class="mt-4">
                        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                          {item.Product_Name}
                        </h3>
                        <h2 class="text-gray-900 title-font text-lg font-medium">
                          The Catalyzer
                        </h2>
                        <p class="mt-1">$16.00</p>
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

export default ShowInHome;
