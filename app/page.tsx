"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import DomainShowcase from "@/components/domain/DomainShowcase";
import gfgLogo from "@/public/image.png";
import background from "@/public/background.png";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Events", href: "#events" },
  { name: "Team", href: "#team" },
  { name: "Alumni", href: "https://www.gfgkiit.in/alumni" },
];

const Home = () => {
  const [isUserRegistered, setIsUserRegistered] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const value = localStorage.getItem("isRegistrated");
      setIsUserRegistered(value === "true");
    })();
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans text-white selection:bg-green-500 selection:text-black">
      {/* Background Image */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-no-repeat bg-center brightness-75"
        style={{
          backgroundImage: `url(${background.src})`,
        }}
      ></div>

      {/* Navbar */}
      <nav className="sticky top-0 left-0 right-0 z-50 px-6 py-2">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto bg-linear-to-r from-zinc-900/90 via-black/90 to-black/90 backdrop-blur-md rounded-full px-6 py-3 flex justify-between items-center border border-white/10 shadow-lg overflow-hidden"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 overflow-hidden">
              <Image
                src={gfgLogo}
                width={200}
                height={200}
                alt="GFG Logo"
                className="object-contain"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors duration-300 relative group"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <Link
            href="https://www.instagram.com/gfg_kiit/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full text-xs font-bold transition-colors shadow-[0_0_15px_rgba(22,163,74,0.5)] hover:shadow-[0_0_25px_rgba(22,163,74,0.8)]"
            >
              Contact Us
            </motion.button>
          </Link>
        </motion.div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center min-h-screen relative w-full pt-32 pb-20">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          {/* Hero Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-lg aspect-3/1 mb-12"
          >
            <Image
              src="/lfg.png"
              alt="League For Geeks"
              fill
              className="object-contain drop-shadow-[0_0_25px_rgba(255,255,0,0.3)]"
              priority
            />
          </motion.div>

          {/* Content Wrapper with Pokemon */}
          <div className="relative w-full max-w-4xl mx-auto mb-20 flex justify-center items-center">
            {/* Pikachu - Left */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden sm:block absolute -left-2 sm:-left-4 md:-left-16 top-1/2 -translate-y-1/2 w-20 sm:w-28 md:w-48 lg:w-64 h-20 sm:h-28 md:h-48 lg:h-64 -z-10"
            >
              <Image
                src="/pikachu.png"
                alt="Pikachu"
                fill
                className="object-contain drop-shadow-2xl rotate-12 hover:scale-110 transition-transform duration-300"
              />
            </motion.div>

            {/* Squirtle - Right */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden sm:block absolute -right-2 sm:-right-4 md:-right-16 top-1/2 -translate-y-1/2 w-20 sm:w-28 md:w-48 lg:w-64 h-20 sm:h-28 md:h-48 lg:h-64 -z-10"
            >
              <Image
                src="/nilapoke.png"
                alt="Squirtle"
                fill
                className="object-contain drop-shadow-2xl -rotate-12 hover:scale-110 transition-transform duration-300"
              />
            </motion.div>

            {/* Text Content */}
            <div className="text-center max-w-2xl z-10 space-y-8">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base md:text-xl leading-relaxed font-medium text-white p-8 rounded-2xl "
              >
                This is the first trial of our recruitment journey.A first of
                it&apos;s kind, Pokémon inspired, hackathon based recruitment
                event. crafted to test how you think, how you build, and how you
                adapt. Not just skill, but instinct.
              </motion.p>

              {/* Register Button */}
              <Link href={isUserRegistered ? "user-card" : "/registeration"}>
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
                  className="group relative inline-flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] border-4 border-black mt-8"
                >
                  {/* Pokeball Icon CSS */}
                  <div className="w-8 h-8 relative bg-white rounded-full border-2 border-black overflow-hidden animate-spin">
                    <div className="absolute top-0 left-0 w-full h-[50%] bg-red-600 border-b-2 border-black"></div>
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white border-2 border-black rounded-full -translate-x-1/2 -translate-y-1/2 z-10"></div>
                  </div>
                  {isUserRegistered ? "Check your Card" : "Register Now"}
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        {/* Domain Showcase Section */}
        <div className="w-full z-10 mt-8 px-4" id="team">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <DomainShowcase />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Home;
