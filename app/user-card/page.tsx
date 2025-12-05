"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { domToPng } from "modern-screenshot";

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
        backgroundColor: '#0B1810',
      });

      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Check if Web Share API is available (mobile)
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], 'gfg-trainer-card.png', { type: 'image/png' });
        const shareData = {
          files: [file],
          title: 'My GFG Trainer Card',
          text: '🎮 Check out my GFG League Trainer Card! Join the crew at @gfg_kiit #GFGLeague #TrainerCard',
        };
        
        if (navigator.canShare(shareData)) {
          try {
            await navigator.share(shareData);
            setIsSharing(false);
            return;
          } catch (err) {
            console.log('Share cancelled or failed:', err);
          }
        }
      }

      // Fallback: Download the image
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `gfg-trainer-card-${userData?.username || 'trainer'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Show a toast/alert with instructions
      alert('📸 Your card has been downloaded!\n\nTo share on Instagram:\n1. Open Instagram\n2. Create a new Story or Post\n3. Select the downloaded image\n4. Tag @gfg_kiit and use #GFGLeague');
      
      setIsSharing(false);
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
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

        <div ref={cardRef} className="relative w-full max-w-[380px] aspect-[9/15] rounded-[24px] overflow-hidden shadow-2xl">
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
                LEAGUE FOR GEEKS
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
            <div className="flex-1 px-4 pt-2 pb-4 flex flex-col justify-center">
              {/* QR Row */}
              <div className="flex items-center justify-between mb-2">
                {/* Left Side - GFG Logo + Text */}
                <div className="flex flex-col items-center w-28">
                  <div className="relative w-50 h-50 mb-1">
                    <Image
                      src="/image.png"
                      alt="GFG Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-[8px] text-white font-bold leading-tight text-center drop-shadow-md">
                    GFG Hackathon<br/>The best hackathon to be!<br/>Register Now!
                  </p>
                </div>

                {/* QR Code Box - Center */}
               

                {/* Right Side - Promotional Text */}
                <div className="flex flex-col items-center w-28">
                   <p className="text-[8px] text-white font-bold leading-tight text-center drop-shadow-md">
                    Join the League!<br/>Code. Create. Conquer.<br/>Unleash your potential!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Button - Outside */}
        <div className="mt-8 w-full max-w-[300px]">
          <button 
            onClick={handleShareToInstagram}
            disabled={isSharing}
            className="w-full py-3 bg-[#1a4025] border-2 border-[#c5a059] text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 hover:bg-[#2a5c3f] transition-colors uppercase tracking-wide text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSharing ? 'Generating...' : 'Share it on your instagram'}
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
