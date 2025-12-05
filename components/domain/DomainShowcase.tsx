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
        image: '/webDev.png'
    },
    {
        id: '002',
        name: 'APP DEV',
        description: 'Creating robust mobile applications for Android and iOS platforms using modern frameworks like Flutter and React Native.',
        type: 'Tech',
        image: '/app-dev.jpeg'
    },
    {
        id: '009',
        name: 'AI/ML',
        description: 'Exploring the frontiers of Artificial Intelligence and Machine Learning. Building smart systems that learn and adapt.',
        type: 'Tech',
        image: '/ai-ml.jpeg'
    },
    {
        id: '010',
        name: 'SYSTEMS DEV',
        description: 'Diving deep into low-level programming, operating systems, and system architecture. Optimizing performance at the core.',
        type: 'Tech',
        image: '/systems-dev.png'
    },
    {
        id: '011',
        name: 'BLOCKCHAIN',
        description: 'Decentralizing the future with Web3 technologies. Smart contracts, DApps, and the revolution of trust.',
        type: 'Tech',
        image: '/blockchain.jpeg'
    },
    {
        id: '012',
        name: 'GAME DEV',
        description: 'Crafting immersive interactive experiences. From game physics to storytelling, bringing virtual worlds to life.',
        type: 'Tech',
        image: '/game-dev.jpg'
    },
    {
        id: '013',
        name: 'CLOUD',
        description: 'Mastering cloud infrastructure and DevOps. Scalable solutions, containerization, and continuous deployment.',
        type: 'Tech',
        image: '/cloud.jpeg'
    },
    {
        id: '014',
        name: 'CYBERSECURITY',
        description: 'Protecting digital assets and securing networks. Ethical hacking, cryptography, and defense against cyber threats.',
        type: 'Tech',
        image: '/cyber.png'
    },
    {
        id: '015',
        name: 'COMPETITIVE PROGRAMMING',
        description: 'Solving complex algorithmic challenges with speed and efficiency. Mastering data structures and algorithms.',
        type: 'Tech',
        image: '/cp.jpeg'
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
        image: '/marketing.png'
    },
    {
        id: '005',
        name: 'SOCIAL MEDIA',
        description: 'Managing online presence and engaging with the community across platforms. Creating content that resonates.',
        type: 'Non-Tech',
        image: '/socmed.png'
    },
    {
        id: '006',
        name: 'SPONSORSHIP',
        description: 'Building partnerships and securing support for events and initiatives. Networking with industry leaders.',
        type: 'Non-Tech',
        image: '/sponsorship.jpeg'
    },
    {
        id: '007',
        name: 'BROADCASTING',
        description: 'Managing audio-visual content and live streaming of events. Capturing moments and sharing them with the world.',
        type: 'Non-Tech',
        image: '/broadcasting.png'
    },
    {
        id: '008',
        name: 'ADMINISTRATION',
        description: 'Ensuring smooth operations and management of the chapter resources. The backbone of the organization.',
        type: 'Non-Tech',
        image: '/admin.jpeg'
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
    const prevPrevDomain = filteredDomains.length > 2
        ? filteredDomains[(activeIndex - 2 + filteredDomains.length) % filteredDomains.length]
        : null
    const nextNextDomain = filteredDomains.length > 2
        ? filteredDomains[(activeIndex + 2) % filteredDomains.length]
        : null

    if (!activeDomain) return null

    return (
        <div className="w-full h-screen max-h-screen mx-auto p-2 md:p-4 bg-gfg-bg-main md:rounded-[40px] border-0 md:border-8 border-gfg-text-primary shadow-2xl font-sans flex flex-col items-center justify-between relative overflow-hidden box-border">

            {/* Tab Buttons */}
            <div className="flex justify-center gap-4 mb-2 md:mb-4 z-10 flex-shrink-0">
                {['Tech', 'Non-Tech'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as 'Tech' | 'Non-Tech')}
                        className={`px-6 py-2 md:px-10 md:py-3 rounded-xl text-lg md:text-2xl font-black uppercase tracking-wider transition-all duration-300 border-b-4 active:border-b-0 active:translate-y-1 ${activeTab === tab
                            ? 'bg-gfg-accent-2 text-white border-gfg-button-shadow shadow-lg'
                            : 'bg-gfg-accent-1 text-white border-gfg-accent-2 hover:bg-gfg-accent-2/80'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Carousel Section */}
            <div className="flex items-center justify-center w-full mb-2 md:mb-4 relative z-10 flex-1 min-h-0">
                
                {/* Left Arrow */}
                <button
                    onClick={handlePrev}
                    disabled={filteredDomains.length <= 1}
                    className={`absolute left-0 md:left-8 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gfg-accent-2 text-white border-b-4 border-gfg-button-shadow transition-all active:border-b-0 active:translate-y-[-40%] z-30 shadow-xl ${filteredDomains.length <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gfg-text-primary hover:scale-110'}`}
                >
                    <ChevronLeft size={32} />
                </button>

                {/* Cards Container */}
                <div className="flex items-center justify-center gap-4 md:gap-8 h-full w-full px-12 md:px-20">
                    
                    {/* PrevPrev Card */}
                    <div className={`hidden xl:block transition-all duration-500 transform h-[60%] aspect-[3/4] ${prevPrevDomain ? 'opacity-40 scale-50 blur-[2px]' : 'opacity-0 w-0'}`}>
                        {prevPrevDomain && (
                                <div className="h-full w-full pointer-events-none">
                                <DomainMainCard domain={prevPrevDomain} />
                                </div>
                        )}
                    </div>

                    {/* Previous Card */}
                    <div className={`hidden md:block transition-all duration-500 transform h-[80%] aspect-[3/4] ${prevDomain ? 'opacity-60 scale-75 blur-[1px]' : 'opacity-0 w-0'}`}>
                        {prevDomain && (
                             <div className="h-full w-full pointer-events-none">
                                <DomainMainCard domain={prevDomain} />
                             </div>
                        )}
                    </div>

                    {/* Active Card */}
                    <div className="z-10 transition-all duration-500 transform scale-100 h-full aspect-[3/4] max-h-full flex items-center justify-center">
                        <div className="h-full w-full">
                            <DomainMainCard domain={activeDomain} />
                        </div>
                    </div>

                    {/* Next Card */}
                    <div className={`hidden md:block transition-all duration-500 transform h-[80%] aspect-[3/4] ${nextDomain ? 'opacity-60 scale-75 blur-[1px]' : 'opacity-0 w-0'}`}>
                        {nextDomain && (
                            <div className="h-full w-full pointer-events-none">
                                <DomainMainCard domain={nextDomain} />
                            </div>
                        )}
                    </div>

                    {/* NextNext Card */}
                    <div className={`hidden xl:block transition-all duration-500 transform h-[60%] aspect-[3/4] ${nextNextDomain ? 'opacity-40 scale-50 blur-[2px]' : 'opacity-0 w-0'}`}>
                        {nextNextDomain && (
                            <div className="h-full w-full pointer-events-none">
                                <DomainMainCard domain={nextNextDomain} />
                            </div>
                        )}
                    </div>

                </div>

                {/* Right Arrow */}
                <button
                    onClick={handleNext}
                    disabled={filteredDomains.length <= 1}
                    className={`absolute right-0 md:right-8 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gfg-accent-2 text-white border-b-4 border-gfg-button-shadow transition-all active:border-b-0 active:translate-y-[-40%] z-30 shadow-xl ${filteredDomains.length <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gfg-text-primary hover:scale-110'}`}
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Info Section */}
            <div className="w-full max-w-5xl bg-gfg-bg-secondary p-4 md:p-6 rounded-[30px] border-4 md:border-8 border-gfg-accent-2 relative z-10 flex flex-col md:flex-row gap-4 md:gap-8 items-start justify-between flex-shrink-0">
                <div className="flex-1 text-left">
                    <h2 className="text-2xl md:text-4xl font-black text-gfg-accent-1 mb-2 md:mb-4 uppercase tracking-tighter drop-shadow-[4px_4px_0px_rgba(44,94,67,1)]" style={{ WebkitTextStroke: '2px #2C5E43' }}>
                        {activeDomain.name}
                    </h2>
                    <p className="text-sm md:text-base text-gfg-text-primary font-medium leading-relaxed mb-4 md:mb-6">
                        {activeDomain.description}
                    </p>
                    
                    {/* <div className="mb-2">
                        <h3 className="text-xl md:text-2xl font-black text-gfg-text-primary/40 uppercase">TYPE</h3>
                    </div>
                    <div className="inline-block bg-gfg-accent-1 px-8 md:px-12 py-2 md:py-3 rounded-xl border-b-4 border-gfg-accent-2/50">
                        <span className="text-white font-black text-base md:text-lg uppercase tracking-widest">{activeDomain.type}</span>
                    </div> */}
                </div>
{/* 
                <div className="w-full md:w-auto flex items-end justify-end self-end mt-4 md:mt-0">
                     <button className="w-full md:w-auto bg-gfg-accent-2 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black text-lg md:text-xl uppercase tracking-wider border-b-8 border-gfg-button-shadow hover:translate-y-1 hover:border-b-4 active:border-b-0 active:translate-y-2 transition-all shadow-xl">
                      I CHOOSE YOU!
                    </button>
                </div> */}
            </div>

        </div>
    )
}