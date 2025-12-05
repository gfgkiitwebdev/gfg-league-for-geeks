'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Domain } from './types'
import { DomainMainCard } from './DomainMainCard'
import { motion } from 'framer-motion'

// Mock data structure - this would come from your backend
const MOCK_DOMAINS: Domain[] = [
    {
        id: '001',
        name: 'WEB DEV',
        description: 'Building the web of tomorrow with modern technologies and frameworks. From frontend aesthetics to backend robustness.',
        type: 'Tech',
        image: '/pikachu.png'
    },
    {
        id: '002',
        name: 'APP DEV',
        description: 'Creating robust mobile applications for Android and iOS platforms using modern frameworks like Flutter and React Native.',
        type: 'Tech',
        image: '/nilapoke.png'
    },
    {
        id: '009',
        name: 'AI/ML',
        description: 'Exploring the frontiers of Artificial Intelligence and Machine Learning. Building smart systems that learn and adapt.',
        type: 'Tech',
        image: '/pikachu.png'
    },
    {
        id: '010',
        name: 'SYSTEMS DEV',
        description: 'Diving deep into low-level programming, operating systems, and system architecture. Optimizing performance at the core.',
        type: 'Tech',
        image: '/nilapoke.png'
    },
    {
        id: '011',
        name: 'BLOCKCHAIN',
        description: 'Decentralizing the future with Web3 technologies. Smart contracts, DApps, and the revolution of trust.',
        type: 'Tech',
        image: '/pikachu.png'
    },
    {
        id: '012',
        name: 'GAME DEV',
        description: 'Crafting immersive interactive experiences. From game physics to storytelling, bringing virtual worlds to life.',
        type: 'Tech',
        image: '/nilapoke.png'
    },
    {
        id: '013',
        name: 'CLOUD',
        description: 'Mastering cloud infrastructure and DevOps. Scalable solutions, containerization, and continuous deployment.',
        type: 'Tech',
        image: '/pikachu.png'
    },
    {
        id: '014',
        name: 'CYBERSECURITY',
        description: 'Protecting digital assets and securing networks. Ethical hacking, cryptography, and defense against cyber threats.',
        type: 'Tech',
        image: '/nilapoke.png'
    },
    {
        id: '015',
        name: 'COMPETITIVE PROGRAMMING',
        description: 'Solving complex algorithmic challenges with speed and efficiency. Mastering data structures and algorithms.',
        type: 'Tech',
        image: '/pikachu.png'
    },
    {
        id: '003',
        name: 'UI/UX',
        description: 'Designing intuitive and attractive user interfaces and experiences. Bridging the gap between functionality and aesthetics.',
        type: 'Non-Tech',
        image: '/pikachu.png'
    },
    {
        id: '004',
        name: 'MARKETING',
        description: 'Strategizing and executing campaigns to promote events and the chapter. Reaching out to the target audience effectively.',
        type: 'Non-Tech',
        image: '/nilapoke.png'
    },
    {
        id: '005',
        name: 'SOCIAL MEDIA',
        description: 'Managing online presence and engaging with the community across platforms. Creating content that resonates.',
        type: 'Non-Tech',
        image: '/pikachu.png'
    },
    {
        id: '006',
        name: 'SPONSORSHIP',
        description: 'Building partnerships and securing support for events and initiatives. Networking with industry leaders.',
        type: 'Non-Tech',
        image: '/nilapoke.png'
    },
    {
        id: '007',
        name: 'BROADCASTING',
        description: 'Managing audio-visual content and live streaming of events. Capturing moments and sharing them with the world.',
        type: 'Non-Tech',
        image: '/pikachu.png'
    },
    {
        id: '008',
        name: 'ADMINISTRATION',
        description: 'Ensuring smooth operations and management of the chapter resources. The backbone of the organization.',
        type: 'Non-Tech',
        image: '/nilapoke.png'
    }
]

export default function DomainShowcase() {
    const [domains] = useState<Domain[]>(MOCK_DOMAINS)
    const [activeTab, setActiveTab] = useState<'Tech' | 'Non-Tech'>('Tech')
    const [activeIndex, setActiveIndex] = useState(0)

    const filteredDomains = domains.filter(domain => domain.type === activeTab)

    useEffect(() => {
        setActiveIndex(0)
    }, [activeTab])

    const handlePrev = () => {
        setActiveIndex(prev => (prev === 0 ? filteredDomains.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setActiveIndex(prev => (prev === filteredDomains.length - 1 ? 0 : prev + 1))
    }

    const activeDomain = filteredDomains[activeIndex]
    const prevDomain = filteredDomains.length > 1 
        ? filteredDomains[(activeIndex - 1 + filteredDomains.length) % filteredDomains.length] 
        : null
    const nextDomain = filteredDomains.length > 1 
        ? filteredDomains[(activeIndex + 1) % filteredDomains.length] 
        : null

    if (!activeDomain) return null

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-[#A8D5BA] rounded-[20px] sm:rounded-[30px] md:rounded-[40px] border-4 sm:border-6 md:border-8 border-[#8FC1A3] shadow-xl font-sans flex flex-col items-center">

            {/* Tab Buttons */}
            <div className="flex justify-center gap-4 mb-6">
                {['Tech', 'Non-Tech'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as 'Tech' | 'Non-Tech')}
                        className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-base md:text-xl font-bold transition-all duration-300 border-4 ${activeTab === tab
                            ? 'bg-[#2C5E43] text-white border-[#1a3828] shadow-lg scale-105'
                            : 'bg-[#8FC1A3] text-[#2C5E43] border-[#5B8C71] hover:bg-[#7ab392]'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Carousel Section */}
            <div className="flex items-center justify-center w-full gap-2 md:gap-8 mb-6 relative">
                
                {/* Left Arrow */}
                <button
                    onClick={handlePrev}
                    disabled={filteredDomains.length <= 1}
                    className={`p-2 md:p-3 rounded-full bg-[#2C5E43] text-white transition-all z-20 ${filteredDomains.length <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#1a3828] hover:scale-110 shadow-lg'}`}
                >
                    <ChevronLeft size={24} className="md:w-8 md:h-8" />
                </button>

                {/* Cards Container */}
                <div className="flex items-center justify-center gap-4 md:gap-8 h-[300px] md:h-[400px]">
                    
                    {/* Previous Card */}
                    <div className={`hidden md:block transition-all duration-500 transform ${prevDomain ? 'opacity-60 scale-75 blur-[1px]' : 'opacity-0 w-0'}`}>
                        {prevDomain && (
                             <div className="w-[180px] md:w-[240px] pointer-events-none">
                                <DomainMainCard domain={prevDomain} />
                             </div>
                        )}
                    </div>

                    {/* Active Card */}
                    <div className="z-10 transition-all duration-500 transform scale-100">
                        <div className="w-[220px] md:w-[300px]">
                            <DomainMainCard domain={activeDomain} />
                        </div>
                    </div>

                    {/* Next Card */}
                    <div className={`hidden md:block transition-all duration-500 transform ${nextDomain ? 'opacity-60 scale-75 blur-[1px]' : 'opacity-0 w-0'}`}>
                        {nextDomain && (
                            <div className="w-[180px] md:w-[240px] pointer-events-none">
                                <DomainMainCard domain={nextDomain} />
                            </div>
                        )}
                    </div>

                </div>

                {/* Right Arrow */}
                <button
                    onClick={handleNext}
                    disabled={filteredDomains.length <= 1}
                    className={`p-2 md:p-3 rounded-full bg-[#2C5E43] text-white transition-all z-20 ${filteredDomains.length <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#1a3828] hover:scale-110 shadow-lg'}`}
                >
                    <ChevronRight size={24} className="md:w-8 md:h-8" />
                </button>
            </div>

            {/* Info Section */}
            <div className="w-full max-w-3xl text-center bg-[#9BCFB0]/50 p-4 md:p-6 rounded-3xl border-4 border-[#5B8C71] backdrop-blur-sm">
                <h2 className="text-2xl md:text-4xl font-black text-[#2C5E43] mb-2 md:mb-3 uppercase tracking-wider drop-shadow-sm">
                    {activeDomain.name}
                </h2>
                <div className="w-16 md:w-24 h-1 bg-[#2C5E43] mx-auto mb-3 md:mb-4 rounded-full opacity-50"></div>
                <p className="text-sm md:text-lg text-[#1a3828] font-medium leading-relaxed max-w-2xl mx-auto">
                    {activeDomain.description}
                </p>
            </div>

        </div>
    )
}