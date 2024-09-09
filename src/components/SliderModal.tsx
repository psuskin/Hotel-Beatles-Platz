import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type Item = {
  id: string;
  imgSrc: string;
};

type SliderModalProps = {
  item: Item;
  uniqueId: string;
  itemArr: Item[];
};

const SliderModal: React.FC<SliderModalProps> = ({
  item,
  uniqueId,
  itemArr,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState(item);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.div
        onClick={() => {
          setIsOpen(true);
          setNewItem(item);
        }}
        layoutId={uniqueId}
        className="overflow-hidden mb-3"
      >
        <Image
          width={400}
          height={400}
          src={item.imgSrc}
          className="bg-white text-black rounded-md w-full cursor-zoom-in"
          alt="img"
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 top-0 left-0 right-0 bottom-0 flex flex-col items-center w-full h-screen justify-center bg-dark backdrop-blur-lg cursor-zoom-out"
            onClick={closeModal}
          >
            <motion.div
              layoutId={uniqueId}
              className="rounded-md w-fit h-[80%] flex gap-2 items-center mx-auto cursor-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {newItem && (
                <AnimatePresence>
                  {itemArr.map((tab: Item) => (
                    <React.Fragment key={tab.id}>
                      <AnimatePresence mode="popLayout">
                        {tab.id === newItem.id && (
                          <motion.figure
                            key={tab.id}
                            className="dark:bg-gray-900/40 bg-gray-100/10 border rounded-md p-4"
                          >
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2, delay: 0.2 }}
                            >
                              <Image
                                src={newItem.imgSrc}
                                width={1000}
                                height={1000}
                                alt="preview_img"
                                className="object-contain h-[70vh] mx-auto rounded-md"
                              />
                            </motion.div>
                          </motion.figure>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </AnimatePresence>
              )}

              <div className="flex flex-col mt-2 justify-center dark:bg-gray-900/40 bg-gray-100/10 border rounded-md">
                {itemArr.map((itemData) => (
                  <motion.div
                    key={itemData.id}
                    className="relative p-2"
                    onClick={() => setNewItem(itemData)}
                  >
                    <Image
                      src={itemData.imgSrc}
                      width={400}
                      height={400}
                      alt="img"
                      className="w-28 h-16 object-cover cursor-pointer relative z-[2] rounded-md"
                    />
                    {itemData.id === newItem.id && (
                      <motion.div
                        layoutId="slider"
                        transition={{
                          layout: {
                            duration: 0.2,
                            ease: "easeOut",
                          },
                        }}
                        className="absolute top-0 left-0 h-full w-full dark:bg-gray-100 bg-gray-800 rounded-md"
                      ></motion.div>
                    )}
                    {itemData.id === newItem.id && (
                      <motion.div
                        layoutId="slider2"
                        transition={{
                          layout: {
                            duration: 0.4,
                            ease: "easeInOut",
                            delay: 0.1,
                          },
                        }}
                        className="absolute top-0 left-0 h-full w-full dark:bg-gray-100 bg-gray-800 rounded-md"
                      ></motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SliderModal;
