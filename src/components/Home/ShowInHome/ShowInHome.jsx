import React, { useEffect } from "react";
import { ethers } from "ethers";
import { NavLink } from "react-router-dom";
import Details from "../../Details/Details";

const ShowInHome = ({ showProducts, homedisplay }) => {
  useEffect(() => {
    document.getElementById("home_display").click();
  }, []);

  return (
    <>
      <div className="p-10 w-ful">
        <button
          className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
          onClick={showProducts}
          id="home_display"
        >
          CHECK ALL AVAILBALE PRODUCTS
        </button>
      </div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {homedisplay.map((item, idx) => {
              return (
                <>
                  <div className="lg:w-1/4 md:w-1/2 p-4 w-full transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-800 duration-300">
                    <div className="block relative h-48 rounded overflow-hidden">
                      <NavLink
                        to={`${item.product_id}`}
                        component={<Details />}
                      >
                        <img
                          alt="ecommerce"
                          className="object-cover object-center w-full h-full block"
                          src={`https://gateway.pinata.cloud/ipfs/${item.product_id}`}
                        />
                      </NavLink>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {item.Product_Name}
                      </h3>
                      <p className="mt-1">
                        Ξ{" "}
                        {parseInt(
                          ethers.utils.formatEther(item.Product_Price, 18) *
                            1e18
                        )}{" "}
                        (ETH)
                      </p>
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
