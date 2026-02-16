"use client";

import { useState } from "react";
import Registration_form from "@/components/Registration_form";

const ThankYou = () => {
  return (
    <div className="w-full max-w-5xl text-white bg-black/20 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center min-h-[250px] text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
        🎉 Registration Successful!
      </h1>
      <p className="text-white/70 mt-3 text-sm sm:text-base">
        Thank you for registering for Trapped 2.0.
      </p>
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
