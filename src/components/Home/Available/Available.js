import React from "react";
import { ethers } from "ethers";

const Available = ({ showProducts, b }) => {
  return (
    <>
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
                        {ethers.utils.formatEther(item.Product_Price, 0) *1e18}
                      </p>
                      <br />
                      <h1 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1">
                        Product id
                      </h1>
                      <p class="leading-relaxed mb-3">
                        {" "}
                        {ethers.utils.formatEther(item.product_id, 0) *1e18}
                      </p>
                      <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"></div>
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
