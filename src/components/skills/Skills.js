import React from "react";

const Skills = () => {
  var images = ["./images/discord.png", "./images/facebook.png"];

  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {images.map((item, idx) => {
              return (
                <>
                  <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <a class="block relative h-48 rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        class="object-cover object-center w-full h-full block"
                        src={item}
                      />
                    </a>
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

export default Skills;
