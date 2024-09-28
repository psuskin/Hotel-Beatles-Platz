import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RoomGalleryProps {
  roomName: string;
  trigger: React.ReactNode;
}

const roomGalleryImages: { [key: string]: string[] } = {
  CLASSIC: [
    "/images/Classic.jpg",
    "/images/Classic-2.jpg",
    "/images/room1.jpg",
  ],
  COMFORT: [
    "/images/Comfort.jpg",
    "/images/Comfort-2.jpg",
    "/images/room3.jpg",
  ],
  "COMFORT PLUS": [
    "/images/ComfortPlus.jpg",
    "/images/ComfortPlus-2.jpg",
    "/images/room2.jpg",
  ],
  PREMIUM: ["/images/Premium.jpg", "/images/Premium-2.jpg", "/images/room.jpg"],
};

export default function RoomGallery({ roomName, trigger }: RoomGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const images = roomGalleryImages[roomName];


  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowRight") nextImage();
      if (event.key === "ArrowLeft") prevImage();
    },
    [nextImage, prevImage]
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="p-0 bg-black/90 border-none w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] max-w-[1200px] h-[70vh] sm:h-[80vh] md:h-[90vh] max-h-[800px]"
        onKeyDown={handleKeyDown}
      >
        <DialogTitle className="sr-only">{`${roomName} Image Gallery`}</DialogTitle>
        <DialogDescription className="sr-only">
          Gallery of images for the {roomName} room
        </DialogDescription>
        <div className="relative flex flex-col items-center justify-center h-full w-full">
          <div className="relative w-full h-[calc(100%-50px)] sm:h-[calc(100%-60px)]">
            <AnimatePresence initial={false} custom={currentIndex}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentIndex]}
                  alt={`${roomName} image ${currentIndex + 1}`}
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-lg"
                  priority
                  onError={() =>
                    console.error(
                      `Failed to load image: ${images[currentIndex]}`
                    )
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex items-center justify-center space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevImage}
              className="bg-black/50 text-white hover:bg-black/70 h-8 w-8 sm:h-10 sm:w-10"
            >
              <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
              <span className="sr-only">Previous image</span>
            </Button>
            <div className="text-white bg-black/50 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
              {currentIndex + 1} / {images.length}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextImage}
              className="bg-black/50 text-white hover:bg-black/70 h-8 w-8 sm:h-10 sm:w-10"
            >
              <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
