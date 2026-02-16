"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gfgLogo from "@/public/image.png";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import background from "@/public/trapped-bg.png";
import GalleryCarousel from "@/components/GalleryCarousel";

const whatsappGroupLink="https://chat.whatsapp.com/DaeP2oi13EE9kRT5GeCjf1"
// Navbar links
const navLinks = [
  { name: "Home", href: "#home" },
  {
    name: "Whatsapp",
    href: whatsappGroupLink,
  },
  { name: "Alumni", href: "https://www.gfgkiit.in/alumni" },
];

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden font-sans text-white selection:bg-cyan-500 selection:text-black"
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

      {/* Content Wrapper */}
      <div className="relative z-10 w-full">
        {/* NAVBAR */}
        <nav className="sticky top-0 left-0 right-0 z-50 px-4 py-3">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto bg-black/40 backdrop-blur-xl rounded-full px-6 py-3 flex justify-between items-center border border-white/5 shadow-2xl shadow-blue-900/10"
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
                className="hover:text-cyan-400 transition-colors duration-300"
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
              className="hidden md:block bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg shadow-blue-500/20"
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
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl mt-4 mx-4 p-6 flex flex-col gap-6 shadow-2xl z-50 absolute right-0 left-0"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium text-gray-200 hover:text-cyan-400 border-b border-white/5 pb-2 last:border-0"
              >
                {link.name}
              </Link>
            ))}

            <Link href="https://www.instagram.com/gfg_kiit/" target="_blank" onClick={() => setMenuOpen(false)}>
              <div className="w-full bg-gradient-to-r from-blue-600 to-blue-500 py-3 rounded-xl text-white font-bold text-center shadow-lg shadow-blue-500/20">
                Contact Us
              </div>
            </Link>
          </motion.div>
        )}
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex flex-col items-center min-h-screen relative w-full pt-28 pb-20">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-12">
          {/* HERO IMAGE */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="relative w-full max-w-3xl aspect-[16/9] md:aspect-[21/9] -mb-10 sm:mb-0"
          >
            <Image
              src="/trapped-title.png"
              alt="Trapped 2.0"
              fill
              className="object-contain drop-shadow-[0_0_80px_rgba(56,189,248,0.4)]"
              priority
            />
          </motion.div>

          {/* TEXT BLOCK WITH ANIMATION */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl z-10 flex flex-col items-center gap-8 md:gap-12"
          >
            {/* Description Text */}
            <div className="space-y-6">
              <p className="text-lg md:text-2xl leading-relaxed font-light text-gray-100 max-w-3xl mx-auto drop-shadow-lg">
                Gather your friends for the best escape room event of KIIT. Calling
                all problem solvers, logic leaders, and those who want to have a
                good time. <br className="hidden md:block" />
                <span className="text-cyan-400 font-normal">
                  Brought to you by the Game Development Domain of GFG KIIT.
                </span>
              </p>

              {/* Event Date Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-900/40 border border-blue-500/30 backdrop-blur-md">
                <span className="text-blue-300 font-semibold uppercase tracking-wider text-sm">
                  Event Date
                </span>
                <div className="w-px h-4 bg-blue-500/30"></div>
                <span className="text-white font-medium">21st February (Saturday)</span>
              </div>
            </div>

            {/* Action Buttons Container */}
            <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">
              {/* Register Button (Primary) */}
              <Link href="/registeration" className="w-full max-w-xs md:order-2">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xl font-bold tracking-wide shadow-xl shadow-blue-900/20 border border-white/10 transition-all"
                >
                  Register Now
                </motion.button>
              </Link>

              {/* WhatsApp Button (Secondary) */}
              <motion.div className="relative w-full max-w-xs md:order-1 flex flex-col items-center">
                <motion.a
                  href={whatsappGroupLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md border border-slate-700 text-blue-200 font-semibold text-base transition-colors"
                >
                  <span>Join WhatsApp Group</span>
                </motion.a>
                {/* <p className="mt-2 text-[10px] md:text-xs text-slate-400 max-w-[200px] text-center leading-tight">
                  Join for announcements
                </p> */}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <GalleryCarousel />
      </main>
      </div>  
    </div>
  );
};

export default Home;
