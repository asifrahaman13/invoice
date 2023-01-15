import React from "react";
import { ethers } from "ethers";

const Available = ({ showProducts, b }) => {
  return (
    <>
      <div className="p-10 w-ful">
        <button
          className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
          onClick={showProducts}
          id="c"
        >
          CHECK ALL AVAILBALE PRODUCTS
        </button>
      </div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {b.map((item, idx) => {
              return (
                <>
                  <div className="p-4 lg:w-1/3">
                    <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden relative text-justify">
                      <h2 className="title-font sm:text-2xl text-xl font-medium text-pink-500 mb-3 py-2">
                        {item.Product_Name}
                      </h2>
                      <h1 className="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Owner
                      </h1>
                      <p>{item.Product_Owner}</p>
                      <br />
                      <h1 className="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Description
                      </h1>
                      <p className="leading-relaxed mb-3">
                        {" "}
                        {item.Product_Description}
                        lorem400
                      </p>
                      <br />
                      <h1 className="tracking-widest text-xl title-font font-medium text-gray-400 mb-1 py-2">
                        Product Price
                      </h1>
                      <p className="leading-relaxed mb-3">
                        {ethers.utils.formatEther(item.Product_Price, 0) *1e18}
                      </p>
                      <br />
                      <h1 className="tracking-widest text-xl title-font font-medium text-gray-400 mb-1">
                        Product id
                      </h1>
                      <p className="leading-relaxed mb-3">
                        {" "}
                        {item.product_id}
                      </p>
                      <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"></div>
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

export default Available;
