"use client";

import React from "react";
import SliderModal from "@/components/SliderModal";
import SubHeader from "@/components/SubHeader";

type Item = {
  id: string;
  imgSrc: string;
};

const items: Item[] = [
  {
    id: "1",
    imgSrc: "/images/room2.jpg",
  },
  {
    id: "2",
    imgSrc: "/images/room.jpg",
  },
  {
    id: "3",
    imgSrc: "/images/room4.jpg",
  },
  {
    id: "5",
    imgSrc: "/images/room4.jpg",
  },
  {
    id: "6",
    imgSrc: "/images/room1.jpg",
  },
  {
    id: "7",
    imgSrc: "/images/hotel2.jpg",
  },
  {
    id: "8",
    imgSrc: "/images/hotel1.jpg",
  },
  {
    id: "9",
    imgSrc: "/images/room2.jpg",
  },
];

const GalleryPage: React.FC = () => {
  return (
    <div className="relative">
      <div className="sticky top-0 z-0">
        <SubHeader
          title="Our Hotel Gallery"
          description="Explore the beauty and elegance of our hotel through our carefully curated image gallery."
          imageSrc="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
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

export default GalleryPage;
