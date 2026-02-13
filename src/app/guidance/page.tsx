"use client";

import { motion } from "framer-motion";
import { Play, BookOpen, Headphones, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const resources = [
    {
        category: "Meditation",
        title: "Morning Clarity",
        duration: "10 min",
        icon: Sun,
        color: "bg-orange-500/20 text-orange-400",
    },
    {
        category: "Focus",
        title: "Deep Work Session",
        duration: "45 min",
        icon: Headphones,
        color: "bg-blue-500/20 text-blue-400",
    },
    {
        category: "Sleep",
        title: "Wind Down Routine",
        duration: "20 min",
        icon: Moon,
        color: "bg-indigo-500/20 text-indigo-400",
    },
    {
        category: "Reading",
        title: "The Art of Stoicism",
        duration: "5 min read",
        icon: BookOpen,
        color: "bg-green-500/20 text-green-400",
    },
];

export default function GuidancePage() {
    return (
        <div className="min-h-screen pt-24 px-4 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500 mb-2">
                    Guidance & Growth
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Curated sessions to help you find balance, focus, and peace.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass p-6 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group"
                    >
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", item.color)}>
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{item.category}</p>
                        <div className="flex items-center text-xs text-gray-400 gap-2">
                            <Play className="w-3 h-3" />
                            <span>{item.duration}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
