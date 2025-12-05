"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = localStorage.getItem("id");
        if (!id) {
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/register?id=${id}`);
        const data = await res.json();
        if (data.success) {
          setUserData(data.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-green-500 font-bold text-xl">
        Loading Trainer Data...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500 font-bold text-xl">
        Trainer Data Not Found. Please Register.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#0B1810] to-[#00FF80] p-4 flex flex-col items-center justify-center">
      {/* GFG Logo */}
      <div className="absolute top-4 left-4 md:left-8 z-10">
        <Image
          src="/image.png"
          alt="GFG Logo"
          width={200}
          height={200}
          className="w-20 sm:w-28 md:w-40 lg:w-48 h-auto object-contain"
        />
      </div>

      <div className="w-full flex flex-col items-center py-10 px-4">
        {/* Congratulatory Message - Above the card */}
        <div className="text-center mb-8">
          <p className="text-white font-bold text-2xl md:text-3xl drop-shadow-lg">
            🎉 Congrats on your registration!
          </p>
          <p className="text-green-300 text-lg mt-2 font-medium drop-shadow-md">
            See you, Trainer! Your journey begins now! 🚀
          </p>
        </div>

        <div className="relative w-full max-w-[380px] aspect-[9/15] rounded-[24px] overflow-hidden shadow-2xl">
          {/* CARD BACKGROUND */}
          <Image
            src="/card-bg.png"
            alt="Pokemon Card Background"
            fill
            className="object-cover pointer-events-none select-none z-0 scale-[1.12] translate-y-[8px]"
            priority
          />

          {/* OVERLAY CONTENT */}
          <div className="absolute inset-0 flex flex-col z-10  p-2">
            {/* Header Area */}
            <div className="h-[10%] flex items-center justify-center ">
              <h1 className="text-[#1a4025] font-bold text-xl tracking-widest uppercase drop-shadow-sm">
                STAGE 2 🌿 EVOLVE
              </h1>
            </div>

            {/* Main Info Box Area */}
            <div className="h-[40%] px-8 pt-6 pb-2 flex items-center justify-center">
              {/* Left: Trainer */}
              <div className="w-1/2 flex flex-col items-center">
                <span className="text-[10px] font-bold text-[#1a4025] mb-1 tracking-widest">
                  TRAINER
                </span>
                <div className="w-28 h-28 border-2 border-green-400 p-1 shadow-sm rounded-full">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={userData.avatar || "/default-avatar.png"}
                      alt="avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Info */}
              <div className="w-1/2 flex flex-col pl-4 pt-1">
                <div className="text-center mb-4">
                  <span className="text-[10px] font-bold text-[#1a4025] tracking-widest">
                    INFO
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-bold text-[#1a4025] text-xs tracking-wider mb-0.5">
                      NAME :
                    </h3>
                    <p className="text-black font-bold text-lg leading-none uppercase truncate">
                      {userData.username}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a4025] text-xs tracking-wider mb-0.5">
                      LEAGUE :
                    </h3>
                    <p className="text-black font-bold text-lg leading-none uppercase truncate">
                      {userData.domain1}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Area */}
            <div className="flex-1 px-6 pt-2 pb-4 flex flex-col justify-center">
              {/* QR Row */}
              <div className="flex items-center justify-between mb-2">
                <p className="text-[9px] text-white font-bold w-20 leading-tight text-center drop-shadow-md">
                  Join the Crew & Earn Your Badges!
                </p>

                {/* QR Code Box */}
                {/* Placeholder for QR */}
                {/* <div className="w-20 h-20 bg-gray-300 border-2 border-white/50 shadow-inner mx-2">
                </div> */}

                <p className="text-[9px] text-white font-bold w-20 leading-tight text-center drop-shadow-md">
                  Catch yours - get your own pokemon card by registering!!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Share Button - Outside */}
        <div className="mt-8 w-full max-w-[300px]">
          <button className="w-full py-3 bg-[#1a4025] border-2 border-[#c5a059] text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 hover:bg-[#2a5c3f] transition-colors uppercase tracking-wide text-sm">
            Share it on your instagram
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
