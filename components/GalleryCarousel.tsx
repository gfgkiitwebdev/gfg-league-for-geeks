"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const images = [
  "/gallery/gallery1.JPG",
  "/gallery/gallery2.JPG",
  "/gallery/gallery3.jpg",
  "/gallery/gallery4.jpg",
  "/gallery/gallery5.jpg",
  "/gallery/gallery6.JPG",
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const GalleryCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have images.length images, but we paginate them absolutely (ie 1, 2, 3...)
  // and then wrap that within 0-(images.length-1) to find our image ID in the array below.
  const imageIndex = Math.abs(page % images.length);

  const paginate = useCallback((newDirection: number) => {
    setPage((prev) => [prev[0] + newDirection, newDirection]);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate]); 

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center gap-10 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
          Some snaps from Trapped 1.0
        </h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
      </motion.div>

      <div className="relative w-full max-w-5xl aspect-video md:aspect-[21/9] flex justify-center items-center">
        {/* Card Container */}
        <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.3)] border border-white/10 bg-slate-900/40 backdrop-blur-sm group">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            >
              <Image
                src={images[imageIndex]}
                alt={`Gallery image ${imageIndex + 1}`}
                fill
                className="object-cover"
                draggable={false}
                priority
              />
              {/* Gradient Scrim for controls visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
             <button
              onClick={() => paginate(-1)}
              className="pointer-events-auto p-2 md:p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/5 transition-all hover:scale-110 hover:border-cyan-400/30 group-hover:opacity-100 opacity-0 focus:opacity-100 duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 text-white/80 hover:text-cyan-400 transition-colors" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="pointer-events-auto p-2 md:p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/5 transition-all hover:scale-110 hover:border-cyan-400/30 group-hover:opacity-100 opacity-0 focus:opacity-100 duration-300"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8 text-white/80 hover:text-cyan-400 transition-colors" />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 pointer-events-none">
            {images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 shadow-sm backdrop-blur-sm",
                  index === imageIndex
                    ? "w-8 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                    : "w-2 bg-white/30"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryCarousel;
