import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Domain } from './types';

interface DomainMainCardProps {
  domain: Domain;
}

export const DomainMainCard: React.FC<DomainMainCardProps> = ({ domain }) => {
  return (
    <motion.div 
      key={domain.id}
      initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="relative w-full aspect-[3/4] max-w-md bg-gfg-card-bg rounded-[2rem] border-8 border-gfg-accent-1 shadow-xl overflow-hidden flex flex-col"
    >
      {/* Card Header / Number */}
      <div className="absolute top-4 left-4 z-10">
        <div className="w-14 h-14 rounded-full bg-gfg-bg-secondary border-2 border-gfg-text-primary flex items-center justify-center text-gfg-text-primary font-black text-xs shadow-sm">
          No. {domain.id}
        </div>
      </div>
      
      {/* Image Area */}
      <div className="flex-1 relative bg-white m-3 rounded-xl overflow-hidden flex items-center justify-center">
         <div className="relative w-3/4 h-3/4">
           <Image 
             src={domain.image} 
             alt={domain.name}
             fill
             className="object-contain drop-shadow-md"
           />
         </div>
         {/* Small Badge */}
         <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-gfg-accent-2 flex items-center justify-center text-[6px] text-white font-bold">
            No. {domain.id}
         </div>
      </div>
      
      {/* Card Footer Name */}
      <div className="bg-gfg-accent-1 py-3 px-2 text-center border-t-4 border-gfg-accent-2/30">
              <h3 className="text-gfg-text-primary font-black text-lg md:text-xl tracking-widest uppercase">{domain.name}</h3>
      </div>
    </motion.div>
  );
};
