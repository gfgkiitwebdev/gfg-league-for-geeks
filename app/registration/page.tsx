import RegistrationGate from "@/components/RegistrationGate";
import Image from "next/image";
import gfgImage from "@/public/image.png";
import background from "@/public/trapped-bg.png";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans text-white selection:bg-cyan-500 selection:text-black">
      {/* Same Background as Main Page */}
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

      {/* Logo (Glass style positioning) */}
      <div className="absolute top-4 left-4 md:left-8 z-20">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-xl shadow-blue-900/20">
          <Image
            src={gfgImage}
            alt="GFG Logo"
            width={160}
            height={160}
            className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen items-center justify-center pt-24 pb-16">
        <div className="w-full max-w-6xl px-4 flex flex-col items-center justify-center gap-10">
          
          {/* Title Section (Matching Hero Style) */}
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.35)]">
              GFG Trapped 2.0
            </h1>

            <p className="mt-4 text-white/70 text-sm sm:text-base">
              Complete your registration for the ultimate escape room experience.
            </p>
          </div>

          {/* Registration / Thank You Card */}
          <div className="w-full flex items-center justify-center">
            <RegistrationGate />
          </div>
        </div>
      </div>
    </div>
  );
}
