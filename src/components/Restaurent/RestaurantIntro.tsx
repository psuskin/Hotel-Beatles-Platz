import Image from "next/image";
import React from "react";

const RestaurantIntro = () => {
  return (
    <section className="py-12 md:py-24 relative mt-14">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[50%] pr-0 lg:pr-8 z-10 relative mb-8 lg:mb-0">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              BEATLES PLATZ RESTAURANT
            </h2>
            <div className="bg-gray-800 bg-opacity-90 p-6 md:p-8 rounded-lg">
              <p className="text-gray-300 mb-4 text-xs md:text-sm">
                With extraordinary rooms, which convince both in the totality
                and in the details and a diverse food and beverage menu, the
                HOTEL AM BEATLES PLATZ Restaurant grew since the opening of the HOTEL AM BEATLES PLATZ Hotel &
                Restaurant in 2004 to one of the hottest nightlife addresses in
                Hamburg and is still the destination of people from all over the
                world.
              </p>
              <p className="text-gray-300 mb-4 text-xs md:text-sm">
                The HOTEL AM BEATLES PLATZ Restaurant with over 200 seats, high ceilings,
                floor-to-ceiling windows and a cozy vaulted ceiling is located
                in the time-honored building of a former iron foundry.
                Unplastered red brick, stained church glass and modern interior
                design by Chicago designer Jordan Mozer give the large hall with
                its curved columns a special atmosphere.
              </p>
              <p className="text-gray-300 mb-4 text-xs md:text-sm">
                Light installations and contemporary art of changing exhibitions
                give the ambience the final touch. Our guests take a seat in the
                great hall, in the secluded casemates or at the sushi counter,
                the impressive skills of the sushi masters in view.
              </p>
              <p className="text-gray-300 text-xs md:text-sm">
                Please note that only card payments are possible.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-4 mt-6">
                {["MENU", "DRINKS MENU", "CHAMPAGNE & WINE LIST"].map(
                  (item, index) => (
                    <button
                      key={index}
                      className="bg-amber-400 text-gray-900 px-3 md:px-6 py-2 text-xs md:text-sm font-semibold transition-colors hover:bg-amber-500"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-64 md:h-96 lg:w-[60%] lg:h-auto lg:absolute lg:right-0 lg:top-0 lg:bottom-0">
            <div className="relative w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="East Restaurant Interior"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantIntro;
