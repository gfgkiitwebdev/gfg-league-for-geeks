"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { domToPng } from "modern-screenshot";
import gfgImage from "@/public/image.png"

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
  const [isSharing, setIsSharing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShareToInstagram = async () => {
    if (!cardRef.current) return;

    setIsSharing(true);

    try {
      // Use modern-screenshot which has better CSS support
      const dataUrl = await domToPng(cardRef.current, {
        scale: 2,
        backgroundColor: "#0B1810",
      });

      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Check if Web Share API is available (mobile)
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], "gfg-trainer-card.png", {
          type: "image/png",
        });
        const shareData = {
          files: [file],
          title: "My GFG Trainer Card",
          text: "🎮 Check out my GFG League Trainer Card! Join the crew at @gfg_kiit #GFGLeague #TrainerCard",
        };

        if (navigator.canShare(shareData)) {
          try {
            await navigator.share(shareData);
            setIsSharing(false);
            return;
          } catch (err) {
            console.log("Share cancelled or failed:", err);
          }
        }
      }
      // Fallback: Download the image
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `gfg-trainer-card-${userData?.username || "trainer"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Show a toast/alert with instructions
      alert(
        "📸 Your card has been downloaded!\n\nTo share on Instagram:\n1. Open Instagram\n2. Create a new Story or Post\n3. Select the downloaded image\n4. Tag @gfg_kiit and use #GFGLeague"
      );

      setIsSharing(false);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Please try again.");
      setIsSharing(false);
    }
  };

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
        src={gfgImage}
        alt="GFG Logo"
        width={200}
        height={200}
        className="w-16 sm:w-24 md:w-36 lg:w-44 h-auto object-contain"
      />
    </div>

    <div className="w-full flex flex-col items-center py-6 px-2 sm:px-4">
      {/* Heading */}
      <div className="text-center mb-6">
        <p className="text-white font-bold text-2xl sm:text-3xl drop-shadow-lg">
          🎉 Congrats on your registration!
        </p>
        <p className="text-green-300 text-base sm:text-lg mt-2 font-medium drop-shadow-md">
          See you, Trainer! Your journey begins now! 🚀
        </p>
      </div>

      <div
        ref={cardRef}
        className="relative w-full max-w-[360px] sm:max-w-[380px] aspect-[7/10] rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Background */}
        <Image
          src="/card-bg-2.png"
          alt="Pokemon Card Background"
          fill
          className="object-cover pointer-events-none select-none scale-[1.04] z-0"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col z-10 px-3 pt-3">
          
          {/* Header */}
          <div className="flex items-center justify-center py-3">
            <h1 className="text-[#1a4025] font-bold text-lg sm:text-xl tracking-widest uppercase">
              LEAGUE FOR GEEKS
            </h1>
          </div>

          {/* Info Section */}
          <div className="px-2 flex flex-1 items-center justify-center gap-3">
            
            {/* Left trainer avatar */}
            <div className="w-1/3 flex flex-col items-center">
              <span className="text-[9px] sm:text-[10px] font-bold text-[#1a4025] mb-1 tracking-widest">
                TRAINER
              </span>
              <div className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-green-400 p-1 shadow-sm rounded-full">
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

            {/* Right info */}
            <div className="w-1/2 flex flex-col pl-2 sm:pl-4">
              <div className="text-center mb-4">
                <span className="text-[9px] sm:text-[10px] font-bold text-[#1a4025] tracking-widest">
                  INFO
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-bold text-[#1a4025] text-xs tracking-wider mb-0.5">
                    NAME :
                  </h3>
                  <p className="text-black font-bold text-base sm:text-lg leading-none uppercase truncate">
                    {userData.username}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a4025] text-xs tracking-wider mb-0.5">
                    LEAGUE :
                  </h3>
                  <p className="text-black font-bold text-base sm:text-lg leading-none uppercase truncate">
                    {userData.domain1}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex-1 px-4 flex flex-col justify-center">
            
            {/* QR row */}
            <div className="flex items-center justify-between mb-4 gap-2">
              
              {/* Left logo */}
              <div className="flex flex-col items-center w-20 sm:w-24">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 mb-1">
                  <Image src={gfgImage} alt="GFG Logo" fill className="object-contain" />
                </div>
                <p className="text-[7px] sm:text-[9px] text-white font-bold leading-tight text-center">
                  Student Chapter<br />KIIT<br />@gfg_kiit
                </p>
              </div>

              {/* QR */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <div className="absolute bottom-1 left-1 w-20 h-20 bg-white p-1 shadow-lg">
                  <Image
                    src="/qr.png"
                    alt="QR Code"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right text */}
              <div className="flex flex-col items-center w-20 sm:w-24">
                <p className="text-[7px] sm:text-[10px] text-white font-bold leading-tight text-left">
                  Catch yours - get your<br />
                  own card by<br />
                  registering!!
                </p>
              </div>

            </div>

            {/* Bottom icons */}
            <div className="flex flex-col justify-center items-center">
              <div className="w-full flex items-center justify-between px-4 mt-2">
                <span className="text-white font-bold text-[9px] sm:text-[10px] drop-shadow-md">
                  The best<br />hackathon to be!
                </span>

                <div className="flex gap-1">
                  <Image src="/star.png" alt="star" width={18} height={18} />
                  <Image src="/star.png" alt="star" width={18} height={18} />
                  <Image src="/star.png" alt="star" width={18} height={18} />
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-2">
                <Image src="/nilapoke.png" width={28} height={28} alt="" />
                <Image src="/Bulbasaur.png" width={28} height={28} alt="" />
                <Image src="/odish.png" width={28} height={28} alt="" />
                <Image src="/caterpie.png" width={28} height={28} alt="" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Share Button */}
      <div className="mt-2 w-full max-w-[300px]">
        <button
          onClick={handleShareToInstagram}
          disabled={isSharing}
          className="w-full py-3 bg-[#1a4025] border-2 border-[#c5a059] text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 hover:bg-[#2a5c3f] transition-colors uppercase tracking-wide text-sm disabled:opacity-50"
        >
          {isSharing ? "Generating..." : "Share it on your instagram"}
        </button>
      </div>

    </div>
  </div>
);

};

export default UserCard;
