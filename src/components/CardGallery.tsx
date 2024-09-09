// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CardGalleryProps {
  images: string[];
}

function Gallery({ items, setIndex, setOpen, index }) {
  return (
    <div className="rounded-md w-fit mx-auto md:gap-2 gap-1 flex pb-10 pt-6">
      {items.slice(0, 11).map((item, i) => (
        <motion.div
          key={item.id}
          whileTap={{ scale: 0.95 }}
          className={`rounded-2xl ${
            index === i
              ? "w-[200px] md:w-[250px]"
              : "xl:w-[50px] md:w-[30px] sm:w-[20px] w-[14px]"
          } h-[200px] flex-shrink-0 overflow-hidden transition-[width] ease-in-out duration-300`}
          onMouseEnter={() => setIndex(i)}
          onMouseLeave={() => setIndex(i)}
          onClick={() => {
            setIndex(i);
            setOpen(true);
          }}
        >
          <Image
            src={item.url}
            alt={item.title}
            width={250}
            height={200}
            className="rounded-2xl h-full w-full object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function CardGallery({ images }: CardGalleryProps) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const galleryItems = images.map((url, id) => ({
    id: id.toString(),
    url,
    title: `Room View ${id + 1}`,
    description: `Detailed view of the room ${id + 1}`,
  }));

  return (
    <div className="relative">
      <Gallery
        items={galleryItems}
        index={index}
        setIndex={setIndex}
        setOpen={setOpen}
      />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="overlay"
            className="dark:bg-black/40 bg-white/10 backdrop-blur-lg fixed inset-0 z-50 grid place-content-center"
            onClick={() => setOpen(false)}
          >
            <div className="w-[90vw] max-w-[400px] mx-auto">
              <motion.div
                layoutId={galleryItems[index].id}
                className="w-full aspect-square rounded-2xl cursor-pointer overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={galleryItems[index].url}
                  width={400}
                  height={400}
                  alt="single-image"
                  className="rounded-2xl h-full w-full object-cover"
                />
              </motion.div>
              <article className="dark:bg-base-dark bg-white rounded-md p-2 mt-2 border">
                <motion.h1
                  initial={{ scaleY: 0.2 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0.2 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="text-xl font-semibold text-black"
                >
                  {galleryItems[index].title}
                </motion.h1>
                <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="text-sm leading-[100%] py-2 text-black"
                >
                  {galleryItems[index].description}
                </motion.p>
              </article>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
