'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Domain } from './types'
import { DomainMainCard } from './DomainMainCard'
import { DomainThumbnail } from './DomainThumbnail'
import { DomainInfo } from './DomainInfo'

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
        image: '/nilaPoke.png'
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
        image: '/nilaPoke.png'
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
        image: '/nilaPoke.png'
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
        image: '/nilaPoke.png'
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
        image: '/nilaPoke.png'
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
        image: '/nilaPoke.png'
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
        image: '/nilaPoke.png'
    }
]

export default function DomainShowcase() {
    const [domains] = useState<Domain[]>(MOCK_DOMAINS)
    const [selectedDomain, setSelectedDomain] = useState<Domain | null>(MOCK_DOMAINS[0])
    const [activeTab, setActiveTab] = useState<'Tech' | 'Non-Tech'>('Tech')
    const [startIndex, setStartIndex] = useState(0)
    const ITEMS_PER_PAGE = 4

    // Filter domains based on active tab
    const filteredDomains = domains.filter(domain => domain.type === activeTab)

    // Update selected domain when tab changes if current selection is not in new tab
    useEffect(() => {
        setStartIndex(0) // Reset pagination when tab changes
        if (selectedDomain && selectedDomain.type !== activeTab) {
            const firstInTab = domains.find(d => d.type === activeTab)
            if (firstInTab) setSelectedDomain(firstInTab)
        }
    }, [activeTab, domains, selectedDomain])

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(prev => prev - 1)
        }
    }

    const handleNext = () => {
        if (startIndex + ITEMS_PER_PAGE < filteredDomains.length) {
            setStartIndex(prev => prev + 1)
        }
    }

    const visibleDomains = filteredDomains.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    if (!selectedDomain) return null

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 bg-[#A8D5BA] rounded-[20px] sm:rounded-[30px] md:rounded-[40px] border-4 sm:border-6 md:border-8 border-[#8FC1A3] shadow-xl font-sans">

            {/* Tab Buttons */}
            <div className="flex justify-center gap-4 mb-8">
                {['Tech', 'Non-Tech'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as 'Tech' | 'Non-Tech')}
                        className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg md:text-xl font-bold transition-all duration-300 border-2 sm:border-4 ${activeTab === tab
                            ? 'bg-[#2C5E43] text-white border-[#1a3828] shadow-lg scale-105'
                            : 'bg-[#8FC1A3] text-[#2C5E43] border-[#5B8C71] hover:bg-[#7ab392]'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 h-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">

                {/* Top - Thumbnails Row with Arrows */}
                <div className="flex items-center justify-center gap-4 w-full">
                    <button
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                        className={`p-2 rounded-full bg-[#2C5E43] text-white transition-opacity ${startIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1a3828]'}`}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="flex gap-4 overflow-hidden">
                        {visibleDomains.map((domain) => (
                            <DomainThumbnail
                                key={domain.id}
                                domain={domain}
                                isSelected={selectedDomain.id === domain.id}
                                onClick={() => setSelectedDomain(domain)}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={startIndex + ITEMS_PER_PAGE >= filteredDomains.length}
                        className={`p-2 rounded-full bg-[#2C5E43] text-white transition-opacity ${startIndex + ITEMS_PER_PAGE >= filteredDomains.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1a3828]'}`}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Bottom - Card + Info */}
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">

                    {/* Left - Smaller Card */}
                    <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
                        <div className="w-full max-w-[280px]">
                            <DomainMainCard domain={selectedDomain} />
                        </div>
                    </div>

                    {/* Right - Info Box */}
                    <div className="w-full lg:w-2/3 flex">
                        <DomainInfo domain={selectedDomain} />
                    </div>

                </div>
            </div>
        </div>
    )
}