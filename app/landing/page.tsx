'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const landingPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-white selection:bg-green-500 selection:text-black">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/background.jpg" 
          alt="Pokemon World Background" 
          fill 
          className="object-cover brightness-75"
          priority
        />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto bg-linear-to-r from-gray-200/90 via-black/80 to-black/90 backdrop-blur-md rounded-full px-6 py-3 flex justify-between items-center border border-white/10 shadow-lg overflow-hidden"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 overflow-hidden">
              <Image src="/image.png" width={200} height={200} alt="GFG Logo" className="object-contain" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            {['Home', 'About', 'Events', 'Team', 'Alumni'].map((item, index) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="hover:text-green-400 transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors shadow-[0_0_15px_rgba(22,163,74,0.5)] hover:shadow-[0_0_25px_rgba(22,163,74,0.8)]"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen relative max-w-7xl mx-auto px-4 pt-20">
        
        {/* Hero Logo */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-2xl aspect-3/1 mb-8"
        >
          <Image 
            src="/lfg.png" 
            alt="League For Geeks" 
            fill 
            className="object-contain drop-shadow-[0_0_25px_rgba(255,255,0,0.3)]"
            priority
          />
        </motion.div>

        {/* Pokemon Images */}
        {/* Pikachu - Left */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute left-4 bottom-0 md:left-2 md:bottom-10 w-48 h-48 md:w-80 md:h-80"
        >
          <Image 
            src="/pikachu.png" 
            alt="Pikachu" 
            fill 
            className="object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-300"
          />
        </motion.div>

        {/* Squirtle - Right */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute right-4 bottom-0 md:right-2 md:bottom-10 w-48 h-48 md:w-80 md:h-80"
        >
          <Image 
            src="/nilaPoke.png" 
            alt="Squirtle" 
            fill 
            className="object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-300"
          />
        </motion.div>

        {/* Text Content */}
        <div className="text-center  max-w-3xl z-10 space-y-8">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-2xl leading-relaxed font-medium text-white drop-shadow-md bg-black/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
          >
            This is the first trial of our recruitment journey. A Pokémon inspired hackathon crafted to test how you think, how you build, and how you adapt. Not just skill, but instinct.
          </motion.p>

          {/* Register Button */}
          <Link href="/">
            <motion.button 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
              className="group relative inline-flex items-center gap-6 bg-red-600 hover:bg-red-500 text-white px-10 py-5 rounded-full text-2xl font-bold shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] border-4 border-black mt-8"
            >
              {/* Pokeball Icon CSS */}
              <div className="w-12 h-12 relative bg-white rounded-full border-4 border-black overflow-hidden animate-spin">
                <div className="absolute top-0 left-0 w-full h-[50%] bg-red-600 border-b-4 border-black"></div>
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white border-2 border-black rounded-full -translate-x-1/2 -translate-y-1/2 z-10"></div>
              </div>
              Register Now
            </motion.button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default landingPage