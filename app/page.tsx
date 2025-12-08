"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import DomainShowcase from "@/components/domain/DomainShowcase";
import gfgLogo from "@/public/image.png";
import background from "@/public/background.png";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

// Navbar links
const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  {
    name: "Events",
    href: "https://chat.whatsapp.com/HjmjXRE7AXQKVsfznNDpsd?mode=hqrt3",
  },
  { name: "Team", href: "#team" },
  { name: "Alumni", href: "https://www.gfgkiit.in/alumni" },
];

const Home = () => {
  const [isUserRegistered, setIsUserRegistered] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const value = localStorage.getItem("isRegistrated");
      setIsUserRegistered(value === "true");
    })();
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden font-sans text-white selection:bg-green-500 selection:text-black"
      id="home"
    >
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={background}
          alt="Background"
          fill
          priority
          placeholder="blur"
          className="object-cover brightness-75"
        />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 left-0 right-0 z-50 px-4 py-3">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto bg-black/70 backdrop-blur-lg rounded-full px-6 py-3 flex justify-between items-center border border-white/10 shadow-lg"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 overflow-hidden">
              <Image
                src={gfgLogo}
                alt="GFG Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-green-400 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <Link href="https://www.instagram.com/gfg_kiit/" target="_blank">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg"
            >
              Contact Us
            </motion.button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </motion.div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl mt-2 mx-2 px-4 py-4 flex flex-col gap-4 text-gray-300"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-green-400"
              >
                {link.name}
              </Link>
            ))}

            <Link href="https://www.instagram.com/gfg_kiit/" target="_blank">
              <button className="w-full bg-green-600 py-2 rounded-lg text-white font-semibold">
                Contact Us
              </button>
            </Link>
          </motion.div>
        )}
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex flex-col items-center min-h-screen relative w-full pt-28 pb-20">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          {/* HERO IMAGE */}
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

          {/* Pokémon + TEXT */}
          <div className="relative w-full max-w-4xl mx-auto mb-20 flex justify-center items-center">
            {/* Floating Pokémon Left */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [0, -10, 0] }}
              transition={{
                duration: 1,
                delay: 0.4,
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
              className="hidden sm:block absolute -left-10 md:-left-20 top-1/2 -translate-y-1/2 w-28 md:w-48 h-28 md:h-48"
            >
              <Image
                src="/pikachu.png"
                alt="Pikachu"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Floating Pokémon Right */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [0, -10, 0] }}
              transition={{
                duration: 1,
                delay: 0.4,
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
              className="hidden sm:block absolute -right-10 md:-right-20 top-1/2 -translate-y-1/2 w-28 md:w-48 h-28 md:h-48"
            >
              <Image
                src="/nilapoke.png"
                alt="Squirtle"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* TEXT BLOCK WITH ANIMATION */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-2xl z-10 space-y-8"
            >
              <p className="text-base md:text-xl leading-relaxed font-medium ">
                This is the first trial of our recruitment journey — a
                Pokémon-inspired, hackathon-based recruitment event crafted to
                test how you think, how you build, and how you adapt.
                <br />
                <br />
                <span className="font-bold text-green-900 text-lg">
                  Event Dates:
                </span>
                <br />
                <span className="block mt-1">
                  •{" "}
                  <span className="font-semibold">
                    13th December (Saturday)
                  </span>{" "}
                  — Hackathon
                </span>
                <span className="block">
                  •{" "}
                  <span className="font-semibold">14th December (Sunday)</span>{" "}
                  — Prize Distribution & Final Proceedings
                </span>
              </p>

              {/* Outreach Group Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                className="mt-2 flex flex-col items-center relative"
              >
                {/* Glow Effect */}
                <motion.div
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute w-40 h-40 bg-green-500/20 blur-3xl rounded-full -z-10"
                />

                <motion.a
                  href="https://chat.whatsapp.com/HjmjXRE7AXQKVsfznNDpsd?mode=hqrt3"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-green-700 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg"
                >
                  Join Event WhatsApp Group
                </motion.a>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-3 text-xs text-white/80 max-w-xs text-center leading-relaxed
                  bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10"
                >
                  Stay updated with all announcements, important details, and
                  event discussions.
                </motion.p>
              </motion.div>

              {/* REGISTER BUTTON */}
              <div className="flex justify-center items-center gap-4 flex-col sm:flex-row w-full px-4">
                {/* REGISTER BUTTON */}
                <Link href="/registeration" className="w-full max-w-sm">
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="group relative flex justify-center items-center gap-3
        bg-red-600 hover:bg-red-500 text-white 
        w-full py-3 sm:py-4 
        rounded-full text-lg sm:text-xl font-bold 
        shadow-lg border-4 border-black"
                  >
                    {/* Pokeball */}
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                      }}
                      className="w-6 h-6 sm:w-8 sm:h-8 relative bg-white rounded-full border-2 border-black overflow-hidden"
                    >
                      <div className="absolute top-0 w-full h-1/2 bg-red-600 border-b-2 border-black"></div>
                      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white border-2 border-black rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    </motion.div>
                    Register Now
                  </motion.button>
                </Link>

                {/* CHECK CARD BUTTON */}
                <Link href="/getCard" className="w-full max-w-sm">
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="group relative flex justify-center items-center gap-3
        bg-red-600 hover:bg-red-500 text-white 
        w-full py-3 sm:py-4 
        rounded-full text-lg sm:text-xl font-bold 
        shadow-lg border-4 border-black"
                  >
                    {/* Pokeball */}
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                      }}
                      className="w-6 h-6 sm:w-8 sm:h-8 relative bg-white rounded-full border-2 border-black overflow-hidden"
                    >
                      <div className="absolute top-0 w-full h-1/2 bg-red-600 border-b-2 border-black"></div>
                      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white border-2 border-black rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    </motion.div>
                    Check your Card
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* TEAM / DOMAIN SHOWCASE */}
        <div className="w-full z-10 mt-8 px-4" id="team">
          <DomainShowcase />
        </div>
      </main>
    </div>
  );
};

export default Home;
