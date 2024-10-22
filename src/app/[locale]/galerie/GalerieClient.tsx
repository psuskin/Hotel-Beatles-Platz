"use client";

import React from "react";
import SliderModal from "@/components/SliderModal";
import SubHeader from "@/components/SubHeader";
import { useTranslations } from "next-intl";

type Item = {
  id: string;
  imgSrc: string;
};

const items: Item[] = [
  {
    id: "1",
    imgSrc: "/images/frontView.jpg",
  },
  {
    id: "2",
    imgSrc: "/images/room.jpg",
  },
  {
    id: "3",
    imgSrc: "/images/room1.jpg",
  },
  {
    id: "5",
    imgSrc: "/images/room2.jpg",
  },
  {
    id: "6",
    imgSrc: "/images/wideView.jpg",
  },
  {
    id: "7",
    imgSrc: "/images/Premium-2.jpg",
  },
  {
    id: "8",
    imgSrc: "/images/room3.jpg",
  },
  {
    id: "9",
    imgSrc: "/images/Premium.jpg",
  },
  {
    id: "10",
    imgSrc: "/images/Classic.jpg",
  },
  {
    id: "11",
    imgSrc: "/images/Classic-2.jpg",
  },
  {
    id: "12",
    imgSrc: "/images/Comfort.jpg",
  },
  {
    id: "13",
    imgSrc: "/images/Comfort-2.jpg",
  },
  {
    id: "14",
    imgSrc: "/images/ComfortPlus.jpg",
  },
  {
    id: "15",
    imgSrc: "/images/ComfortPlus-2.jpg",
  },
  {
    id: "16",
    imgSrc: "/images/wideView.jpg",
  },
  {
    id: "17",
    imgSrc: "/images/ComfortPlus.jpg",
  },
  {
    id: "18",
    imgSrc: "/images/wideView2.jpg",
  },
  {
    id: "19",
    imgSrc: "/images/sofa.jpg",
  },
  {
    id: "20",
    imgSrc: "/images/paper.jpg",
  },
  {
    id: "21",
    imgSrc: "/images/jar.jpg",
  },
  {
    id: "22",
    imgSrc: "/images/cat.jpg",
  },
  {
    id: "23",
    imgSrc: "/images/drinks.jpg",
  },
  // {
  //   id: "24",
  //   imgSrc: "/images/safeBox.jpg",
  // },
  {
    id: "25",
    imgSrc: "/images/vasin3.jpg",
  },
  {
    id: "26",
    imgSrc: "/images/comode.jpg",
  },
  {
    id: "27",
    imgSrc: "/images/unlock.jpg",
  },
  {
    id: "28",
    imgSrc: "/images/vasin2.jpg",
  },
  {
    id: "29",
    imgSrc: "/images/vasin.jpg",
  },
  {
    id: "30",
    imgSrc: "/images/chairs.jpg",
  },
  {
    id: "31",
    imgSrc: "/images/Yeskey.jpg",
  },
];

const GalerieClient = () => {
  const t = useTranslations("gallery");
  return (
    <div className="relative">
      <div className="sticky top-0 z-0">
        <SubHeader
          // title="Our Hotel Gallery"
          title={t("title")}
          description={t("description")}
          imageSrc="/images/hotelCard.jpg"
        />
      </div>
      <div className="relative z-10 bg-black min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {items.map((item, index) => (
              <div key={item.id} className="mb-4 break-inside-avoid">
                <SliderModal
                  item={item}
                  itemArr={items}
                  uniqueId={`id-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalerieClient;
