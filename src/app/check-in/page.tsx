"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const moods = [
    { emoji: "😊", label: "Happy", color: "bg-green-500/20 border-green-500/50" },
    { emoji: "😢", label: "Sad", color: "bg-blue-500/20 border-blue-500/50" },
    { emoji: "😰", label: "Anxious", color: "bg-purple-500/20 border-purple-500/50" },
    { emoji: "😴", label: "Tired", color: "bg-gray-500/20 border-gray-500/50" },
    { emoji: "😣", label: "Stressed", color: "bg-red-500/20 border-red-500/50" },
    { emoji: "🤩", label: "Excited", color: "bg-yellow-500/20 border-yellow-500/50" },
    { emoji: "💪", label: "Determined", color: "bg-orange-500/20 border-orange-500/50" },
    { emoji: "😡", label: "Angry", color: "bg-red-700/20 border-red-700/50" },
    { emoji: "😕", label: "Confused", color: "bg-indigo-500/20 border-indigo-500/50" },
    { emoji: "😌", label: "Calm", color: "bg-teal-500/20 border-teal-500/50" },
];

export default function CheckInPage() {
    const router = useRouter();
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleMoodSelect = (label: string) => {
        setSelectedMood(label);
    };

    const handleNext = async () => {
        if (!selectedMood) return;
        setIsSubmitting(true);

        try {
            // Simulate API call
            await fetch("/api/mood", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: "user_123", // Simulated
                    mood: selectedMood,
                    timestamp: new Date().toISOString(),
                }),
            });

            // Save to local storage for persistence across pages implies context usage, 
            // but for now we'll just use localStorage as per established pattern.
            localStorage.setItem("zenith_current_mood", selectedMood);

            // Redirect to Journal
            router.push("/journal");
        } catch (error) {
            console.error("Failed to save mood", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 to-black -z-10" />
            <div className="absolute top-10 right-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 mb-6">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-semibold uppercase tracking-wider">Daily Check-in</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    How are you feeling today?
                </h1>
                <p className="text-gray-400 text-lg">
                    Your mood helps us personalize your growth insights.
                </p>
            </motion.div>

            <div className="max-w-4xl w-full">
                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.05
                            }
                        }
                    }}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
                >
                    {moods.map((mood) => (
                        <motion.button
                            key={mood.label}
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                show: { opacity: 1, scale: 1 }
                            }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleMoodSelect(mood.label)}
                            className={cn(
                                "glass p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-4 transition-all duration-300",
                                selectedMood === mood.label
                                    ? `${mood.color} ring-2 ring-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105`
                                    : "hover:bg-white/5"
                            )}
                        >
                            <span className="text-4xl filter drop-shadow-lg">{mood.emoji}</span>
                            <span className={cn(
                                "font-medium",
                                selectedMood === mood.label ? "text-white" : "text-gray-400"
                            )}>
                                {mood.label}
                            </span>
                        </motion.button>
                    ))}
                </motion.div>

                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: selectedMood ? 1.05 : 1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNext}
                        disabled={!selectedMood || isSubmitting}
                        className={cn(
                            "px-10 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all duration-300",
                            selectedMood
                                ? "bg-green-500 text-black hover:bg-green-400 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                                : "bg-gray-800 text-gray-500 cursor-not-allowed opacity-50"
                        )}
                    >
                        {isSubmitting ? "Saving..." : "Next Step"}
                        {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
