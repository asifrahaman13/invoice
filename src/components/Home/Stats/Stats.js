import React from "react";

const Stats = ({ total_products, total_buyers, total_sellers, stats }) => {
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
                {total_products}
              </h2>
              <p class="leading-relaxed">Total sellers</p>
            </div>
            <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
              <h2 class="title-font font-medium text-3xl text-pink-600">
                {total_buyers}
              </h2>
              <p class="leading-relaxed">Total Buyers</p>
            </div>
            <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
              <h2 class="title-font font-medium text-3xl text-pink-600">
                {total_sellers}
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
    </>
  );
};

export default Stats;
