import Registration_form from "@/components/Registration_form";
import Image from "next/image";

export default function Home() {
  
  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#0B1810] to-[#00FF80] p-4">
      <div className="absolute top-2 left-4 md:left-8 z-10">
        <Image src="/image.png" alt="GFG Logo" width={200} height={200} className="w-20 sm:w-28 md:w-40 lg:w-48 h-auto" />
      </div>
      <div className="flex mt-20 sm:mt-16 md:mt-10 min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Recruitment for GFG Event
            </h1>
            <p className="text-lg text-white">
              Join the GeeksforGeeks community at KIIT. Register now to be part of exciting opportunities!
            </p>
          </div>
          <Registration_form />
        </div>
      </div>
    </div>
  );
}
