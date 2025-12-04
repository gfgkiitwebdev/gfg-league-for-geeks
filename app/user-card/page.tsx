"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import cardBg from "@/public/card-bg.png";

export interface UserData {
  username: string;
  contact: string;
  email: string;
  whyGfg: string;
  domain1: string;
  domain2: string;
  github?: string;
  linkedin?: string;
  resumeLink?: string;
  year: string;
  deviceId: string;
  avatar: string;
}

const UserCard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = localStorage.getItem("id");
        if (!id) return;

        const res = await fetch("/api/user/get-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        const data = await res.json();
        if (data.success) setUserData(data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUserData();
  }, []);

  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#0B1810] to-[#00FF80] p-4">
      {/* GFG Logo */}
      <div className="absolute top-2 left-4 md:left-8 z-10">
        <Image src="/image.png" alt="GFG Logo" width={200} height={200} className="w-20 sm:w-28 md:w-40 lg:w-48 h-auto" />
      </div>

      <div className="w-full flex flex-col items-center py-10 px-4">
        {/* Congratulatory Message - Above the card */}
        <div className="text-center mb-6">
          <p className="text-white font-bold text-2xl">
            🎉 Congrats on your registration!
          </p>
          <p className="text-green-300 text-lg mt-2">
            See you, Trainer! Your journey begins now! 🚀
          </p>
        </div>

        <div className="relative w-full max-w-[420px]">
        {/* CARD BACKGROUND */}
        <Image
          src={cardBg}
          alt="Pokemon Card"
          className="w-full h-auto object-contain pointer-events-none select-none"
          priority
        />

        {/* OVERLAY CONTENT */}
        <div className="absolute inset-0 px-6 pt-6">
          <div className="text-center">
            <h1 className="text-green-200 font-extrabold text-xl tracking-wide">
              STAGE 2 🌿 EVOLVE
            </h1>
          </div>

          {/* Trainer Info */}
          <div className="flex mt-6 justify-between">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white border-2 border-green-300">
              <Image
                src={userData?.avatar || "/default-avatar.png"}
                alt="avatar"
                width={120}
                height={120}
                className="object-cover"
              />
            </div>

            <div className="text-white text-right">
              <h3 className="font-bold">NAME :</h3>
              <p className="text-green-200">{userData?.username}</p>

              <h3 className="font-bold mt-2">LEAGUE :</h3>
              <p className="text-green-200">{userData?.domain1}</p>
            </div>
          </div>

          {/* Middle messages */}
          <div className="flex justify-between text-xs text-white/90 mt-6">
            <p>Join the Crew & Earn Your Badges!</p>
            <p>Catch yours — get your own Pokémon card!</p>
          </div>

          {/* Stars */}
          <div className="text-center text-white mt-4">⭐⭐⭐</div>

          {/* Share button */}
          <div className="text-center mt-6">
            <button className="px-5 py-2 bg-green-600 rounded-xl text-white font-semibold hover:bg-green-700">
              Share it on your Instagram
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default UserCard;
