"use client";
import { motion } from "framer-motion";

const InfoPanel = () => {
  const sections = [
    {
      title: "👥 Team Rules",
      content: [
        "Participants may register in teams of 1-3.",
        "⚠️ Only ONE player will actively play per round on behalf of the team",
        "Team members can discuss and help, but controls stay with the selected player",
      ],
    },
    {
      title: "🕹️ Game Format",
      content: [
        "Games will be simple, intuitive, and fun",
        "Focus on logic, observation, quick decision-making, and teamwork",
        "No prior experience with game development, programming, or CS concepts needed",
      ],
    },
    {
      title: "📜 General Rules",
      content: [
        "Each team must decide their active player before the round starts",
        "Switching the active player during a round is not allowed",
        "Any form of external help or unfair practices will lead to disqualification",
        "Judges’ decisions will be final and binding",
        "Maintain sportsmanship and fair play",
      ],
    },
    {
      title: "🎯 Why Participate?",
      content: [
        "Perfect for friends teaming up",
        "Casual, competitive, and engaging",
        "Designed to be light-hearted, exciting, and inclusive",
      ],
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl"
      >
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-4 relative z-10">
              {section.title}
            </h3>
            <ul className="space-y-3 relative z-10">
              {section.content.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="text-sm md:text-base leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <p className="text-xl md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
          💡 Think smart. Play fair. Have fun.
        </p>
      </motion.div>
    </section>
  );
};

export default InfoPanel;
