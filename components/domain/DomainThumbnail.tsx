import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Domain } from './types';

interface DomainThumbnailProps {
  domain: Domain;
  isSelected: boolean;
  onClick: () => void;
}

export const DomainThumbnail: React.FC<DomainThumbnailProps> = ({ domain, isSelected, onClick }) => {
  return (
    <motion.button
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex-shrink-0 w-20 sm:w-24 md:w-28 h-28 sm:h-32 md:h-36 bg-white rounded-xl border-2 sm:border-4 transition-all duration-200 flex flex-col overflow-hidden snap-start ${
        isSelected 
          ? 'border-[#2C5E43] ring-4 ring-[#5B8C71]/30 shadow-lg scale-105 z-10' 
          : 'border-[#8FC1A3] hover:border-[#5B8C71] opacity-80 hover:opacity-100'
      }`}
    >
      <div className="flex-1 relative p-2 flex items-center justify-center">
          <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-[#A8D5BA] text-[10px] flex items-center justify-center text-[#2C5E43] font-bold border border-[#5B8C71]">
              {domain.id}
          </div>
          <div className="relative w-16 h-16">
              <Image 
                  src={domain.image} 
                  alt={domain.name}
                  fill
                  className="object-contain"
              />
          </div>
      </div>
      <div className={`py-1 text-[10px] text-center font-bold truncate px-1 ${
          isSelected ? 'bg-[#2C5E43] text-white' : 'bg-[#A8D5BA] text-[#2C5E43]'
      }`}>
          {domain.name}
      </div>
    </motion.button>
  );
};
