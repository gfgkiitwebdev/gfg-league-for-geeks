"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Image from "next/image";

import bgTexture from "@/public/background.png"; 
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  const handleSearch = async () => {
    if (!email.endsWith("@kiit.ac.in")) {
      toast.error("Please enter a valid KIIT email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/find-by-email?email=${email}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error("No registration found!");
        setLoading(false);
        return;
      }


      localStorage.setItem("id", data.data._id);
      localStorage.setItem("isRegistrated", "true");
      toast.success("User Found Successfully");
      
      router.push("/user-card");
    } catch(err) {
        console.log(err);
        
      toast.error("Something went wrong.");
    }

    setLoading(false);
  };

  useEffect(()=>{
    if(localStorage.getItem("id")){
        router.push("/user-card")
    }
  },[])

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden
      bg-linear-to-b from-[#0B1810] to-[#00FF80]"
    >
      {/* OPTIONAL Pokemon background texture */}
      <Image
        src={bgTexture}
        fill
        alt="background"
        className="object-cover opacity-20 pointer-events-none"
      />

      {/* Floating glowing orbs */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-green-500/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-400/20 blur-3xl rounded-full animate-pulse"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-black/40 backdrop-blur-xl 
        border border-white/10 p-6 rounded-2xl shadow-2xl text-center"
      >
        <h2 className="text-2xl font-extrabold text-white drop-shadow-md mb-3">
          Find Your Trainer Card
        </h2>

        <p className="text-white/70 text-sm mb-5 leading-relaxed">
          Enter your KIIT email to retrieve your Pokémon Trainer Identity 
        </p>
          {/* <p className="text-white/70 text-2xl mb-5 leading-relaxed font-black">
          This is One Time so Enter your Correct email 
        </p> */}

        {/* Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="yourrollno@kiit.ac.in"
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
          text-white placeholder:text-white/40 focus:border-green-400 
          outline-none transition-all"
        />

        {/* Button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full mt-4 py-3 bg-green-600 hover:bg-green-500 
          text-white font-semibold rounded-lg disabled:opacity-50 
          shadow-lg transition-all"
        >
          {loading ? "Searching..." : "Find My Card"}
        </button>
      </motion.div>
    </div>
  );
}
