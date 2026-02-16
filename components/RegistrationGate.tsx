"use client";

import { useState } from "react";
import Registration_form from "@/components/Registration_form";
import Link from "next/link";
import { motion } from "framer-motion";

const whatsappGroupLink = "https://chat.whatsapp.com/DaeP2oi13EE9kRT5GeCjf1";

const ThankYou = () => {
  return (
    <div className="w-full flex items-center justify-center px-4 ">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl text-white bg-black/40 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl shadow-blue-900/20 flex flex-col items-center text-center"
      >
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]">
          🎉 Registration Successful!
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-white/80 text-base sm:text-lg max-w-xl leading-relaxed">
          You have successfully registered for{" "}
          <span className="font-semibold text-cyan-400">Trapped 2.0</span>. Get
          ready for the ultimate escape room experience.
        </p>

        {/* Info Box (matching theme) */}
        <div className="mt-8 w-full max-w-xl bg-slate-900/60 backdrop-blur-md border border-cyan-400/20 rounded-2xl px-5 py-4 shadow-lg">
          <p className="text-cyan-200 text-sm sm:text-base font-medium leading-relaxed">
            ⚠️ Ensure you have joined the WhatsApp group for the latest event
            updates, announcements, and important instructions.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4 w-full max-w-md">
          {/* WhatsApp Button (Primary like Register) */}
          <Link
            href={whatsappGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(56,189,248,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-lg font-bold tracking-wide shadow-xl shadow-blue-900/30 border border-white/10 transition-all"
            >
              💬 Join WhatsApp Group
            </motion.button>
          </Link>

          {/* Back Home Button (secondary style like navbar theme) */}
          <Link href="/" className="w-full">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md border border-slate-700 text-blue-200 font-semibold transition-colors"
            >
              ← Back to Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const RegistrationGate = () => {
  const [isRegistered] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("isRegistrated") === "true";
  });

  if (isRegistered) {
    return <ThankYou />;
  }

  return <Registration_form />;
};

export default RegistrationGate;
