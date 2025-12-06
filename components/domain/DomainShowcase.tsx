"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Domain } from "./types";
import { DomainMainCard } from "./DomainMainCard";
import { motion } from "framer-motion";

// Mock data structure - this would come from your backend
const MOCK_DOMAINS: Domain[] = [
  {
    id: "001",
    name: "WEB DEV",
    description:
      "You don't code — you command, like a king ruling a digital empire. Your lines of code are royal decrees, and every pixel bends the knee. You forge kingdoms out of CSS, conquer chaos with JavaScript, and crown ideas with UI. Others surf the web… but you sit on the throne and rewrite the internet in your image.",
    type: "Tech",
    image: "/webDev.png",
  },
  {
    id: "002",
    name: "APP DEV",
    description:
      "App Dev is just evolution chains but with frameworks — React → React Native → Existential Crisis.If that made sense to you then do join us. In this domain, we don't just catch Pokémon, we catch exceptions, null pointers, and emotional damage from runtime errors.",
    type: "Tech",
    image: "/app-dev.jpeg",
  },
  {
    id: "009",
    name: "AI/ML",
    description:
      "Step into AI/ML where machines learn faster than you can blink, patterns hide in data like secrets, and every prediction feels like a Pikachu Thunderbolt to your brain. Curious? Good—it's supposed to shock you!",
    type: "Tech",
    image: "/ai-ml.jpeg",
  },
  {
    id: "010",
    name: "SYSTEMS DEV",
    description:
      "Turn your DSA knowledge into wonderful projects. Befriend the command line and Linux OS.  Learn about how to design applications for millions of users.",
    type: "Tech",
    image: "/systems-dev.png",
  },
  {
    id: "011",
    name: "BLOCKCHAIN",
    description:
      "Decentralizing the future with Web3 technologies. Smart contracts, DApps, and the revolution of trust.",
    type: "Tech",
    image: "/blockchain.jpeg",
  },
  {
    id: "012",
    name: "GAME DEV",
    description:
      "Game development is the ultimate power trip. It's the art of turning boring lines of code into living, breathing worlds. You aren't just a coder here, you are the architect of physics, the director of drama, and the master of fun. Why just play the hero when you can build the universe?",
    type: "Tech",
    image: "/game-dev.jpg",
  },
  {
    id: "013",
    name: "CLOUD",
    description:
      "Building legendary infrastructures in the cloud, where resilience, automation, and speed rule the battlefield.",
    type: "Tech",
    image: "/cloud.jpeg",
  },
  {
    id: "014",
    name: "CYBERSECURITY",
    description:
      "Protecting digital assets and securing networks. Ethical hacking, cryptography, and defense against cyber threats.",
    type: "Tech",
    image: "/cyber.png",
  },
  {
    id: "015",
    name: "COMPETITIVE PROGRAMMING",
    description:
      "Solving complex algorithmic challenges with speed and efficiency. Mastering data structures and algorithms.",
    type: "Tech",
    image: "/cp.jpeg",
  },
  {
    id: "003",
    name: "UI/UX",
    description:
      "Designing intuitive and attractive user interfaces and experiences. Bridging the gap between functionality and aesthetics.",
    type: "Non-Tech",
    image: "/ui.jpeg",
  },
  {
    id: "004",
    name: "MARKETING",
    description:
      "We don't just wait for evolution; we actively drive growth, turning basic ideas into legendary brands as we strive to \"catch 'em all\"—every bit of engagement and community reach possible! ",
    type: "Non-Tech",
    image: "/marketing.png",
  },
  {
    id: "005",
    name: "SOCIAL MEDIA",
    description:
      " Social Media—the ultimate curation challenge. It's where strategy meets spontaneity, and your personal brand becomes legendary.",
    type: "Non-Tech",
    image: "/socmed.png",
  },
  {
    id: "006",
    name: "SPONSORSHIP",
    description:
      "Building partnerships and securing support for events and initiatives. Networking with industry leaders.",
    type: "Non-Tech",
    image: "/sponsorship.jpeg",
  },
  {
    id: "007",
    name: "BROADCASTING",
    description:
      "Welcome to the Broadcasting Domain, where we don't just watch the action—we capture em all! From wild events to legendary content, we make sure your memories are always super effective!",
    type: "Non-Tech",
    image: "/broadcasting.png",
  },
  {
    id: "008",
    name: "ADMINISTRATION",
    description:
      "Ensuring smooth operations and management of the chapter resources. The backbone of the organization.",
    type: "Non-Tech",
    image: "/admin.jpeg",
  },
];

export default function DomainShowcase() {
  const [domains] = useState<Domain[]>(MOCK_DOMAINS);
  const [activeTab, setActiveTab] = useState<"Tech" | "Non-Tech">("Tech");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isXL, setIsXL] = useState(false);

  const filteredDomains = domains.filter((domain) => domain.type === activeTab);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsXL(window.innerWidth >= 1280);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? filteredDomains.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === filteredDomains.length - 1 ? 0 : prev + 1
    );
  };

  const activeDomain = filteredDomains[activeIndex];

  if (!activeDomain) return null;

  const getCardStyle = (index: number) => {
    const length = filteredDomains.length;
    let offset = index - activeIndex;

    // Handle wrapping for shortest path
    if (offset > length / 2) offset -= length;
    if (offset < -length / 2) offset += length;

    const absOffset = Math.abs(offset);
    const isActive = offset === 0;

    // Visibility logic
    // Mobile: Only active is visible (others off-screen)
    // Desktop: +/- 1 visible
    // XL: +/- 2 visible

    // We'll use opacity to hide distant cards to prevent "flying across" artifacts being too visible
    // but we keep them in the DOM for smooth entry

    let zIndex = 50 - absOffset * 10;
    let scale = 1;
    let opacity = 1;
    let blur = 0;
    let x = "0%";

    if (isActive) {
      scale = 1;
      opacity = 1;
      blur = 0;
      x = "0%";
    } else if (absOffset === 1) {
      scale = 0.75;
      opacity = 0.6;
      blur = 1;
      x = offset > 0 ? "18vw" : "-18vw";
      if (isMobile) {
        opacity = 0;
        x = offset > 0 ? "100vw" : "-100vw";
      }
    } else if (absOffset === 2) {
      scale = 0.5;
      opacity = 0.4;
      blur = 2;
      x = offset > 0 ? "32vw" : "-32vw";
      // Hide on smaller screens
      if (!isXL) {
        // XL breakpoint
        opacity = 0;
      }
    } else {
      // Hidden cards
      scale = 0.3;
      opacity = 0;
      x = offset > 0 ? "50vw" : "-50vw";
    }

    return {
      x,
      scale,
      opacity,
      zIndex,
      filter: `blur(${blur}px)`,
    };
  };

  return (
    <div className="w-full h-screen max-h-screen mx-auto p-2 md:p-4 bg-gfg-bg-main md:rounded-[40px] border-0 md:border-8 border-gfg-text-primary shadow-2xl font-sans flex flex-col items-center justify-between relative overflow-hidden box-border">
      {/* Tab Buttons */}
      <div className="flex justify-center gap-4 mb-2 md:mb-4 z-10 flex-shrink-0">
        {["Tech", "Non-Tech"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "Tech" | "Non-Tech")}
            className={`px-6 py-2 md:px-10 md:py-3 rounded-xl text-lg md:text-2xl font-black uppercase tracking-wider transition-all duration-300 border-b-4 active:border-b-0 active:translate-y-1 ${
              activeTab === tab
                ? "bg-gfg-accent-2 text-white border-gfg-button-shadow shadow-lg"
                : "bg-gfg-accent-1 text-white border-gfg-accent-2 hover:bg-gfg-accent-2/80"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Carousel Section */}
      <div className="flex items-center justify-center w-full mb-2 md:mb-4 relative z-10 flex-1 min-h-0">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={filteredDomains.length <= 1}
          className={`absolute left-0 md:left-8 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gfg-accent-2 text-white border-b-4 border-gfg-button-shadow transition-all active:border-b-0 active:translate-y-[-40%] z-[60] shadow-xl ${
            filteredDomains.length <= 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-gfg-text-primary hover:scale-110"
          }`}
        >
          <ChevronLeft size={32} />
        </button>

        {/* Cards Container */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {filteredDomains.map((domain, index) => {
            const style = getCardStyle(index);
            return (
              <motion.div
                key={domain.id}
                initial={false}
                animate={style}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
                style={{
                  height: "100%",
                  aspectRatio: "3/4",
                  pointerEvents: index === activeIndex ? "auto" : "none",
                }}
              >
                <div className="w-full h-full">
                  <DomainMainCard domain={domain} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={filteredDomains.length <= 1}
          className={`absolute right-0 md:right-8 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gfg-accent-2 text-white border-b-4 border-gfg-button-shadow transition-all active:border-b-0 active:translate-y-[-40%] z-[60] shadow-xl ${
            filteredDomains.length <= 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-gfg-text-primary hover:scale-110"
          }`}
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Info Section */}
      <div className="w-full max-w-5xl bg-gfg-bg-secondary p-4 md:p-6 rounded-[30px] border-4 md:border-8 border-gfg-accent-2 relative z-10 flex flex-col md:flex-row gap-4 md:gap-8 items-start justify-between shrink-0">
        <div className="flex-1 text-left">
          <h2
            className="text-2xl md:text-4xl font-black text-gfg-accent-1 mb-2 md:mb-4 uppercase tracking-tighter drop-shadow-[4px_4px_0px_rgba(44,94,67,1)]"
            style={{ WebkitTextStroke: "2px #2C5E43" }}
          >
            {activeDomain.name}
          </h2>
          <p
            className="text-sm md:text-base text-gfg-text-primary font-medium leading-relaxed mb-4 md:mb-6"
          >
            {activeDomain.description}
          </p>
          {/* <div className="mb-2">
                        <h3 className="text-xl md:text-2xl font-black text-gfg-text-primary/40 uppercase">TYPE</h3>
                    </div>
                    <div className="inline-block bg-gfg-accent-1 px-8 md:px-12 py-2 md:py-3 rounded-xl border-b-4 border-gfg-accent-2/50">
                        <span className="text-white font-black text-base md:text-lg uppercase tracking-widest">{activeDomain.type}</span>
                    </div> */}
        </div>
        {/* 
                <div className="w-full md:w-auto flex items-end justify-end self-end mt-4 md:mt-0">
                     <button className="w-full md:w-auto bg-gfg-accent-2 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black text-lg md:text-xl uppercase tracking-wider border-b-8 border-gfg-button-shadow hover:translate-y-1 hover:border-b-4 active:border-b-0 active:translate-y-2 transition-all shadow-xl">
                      I CHOOSE YOU!
                    </button>
                </div> */}
      </div>
    </div>
  );
}
