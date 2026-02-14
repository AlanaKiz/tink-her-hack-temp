"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Brain,
    Leaf,
    BarChart3,
    RefreshCw,
    Zap,
    Quote,
    Mail,
    Calendar,
    Lock,
    Unlock,
    Send,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
interface AnalysisResult {
    emotional_analysis: {
        summary: string;
        dominant_emotion: string;
        stress_level: "Low" | "Medium" | "High";
    };
    productivity_analysis: {
        completion_rate: number;
        insight: string;
        consistency: string;
    };
    growth_areas: string[];
    recommendations: string[];
    encouragement: string;
}

export default function GuidancePage() {
    // --- State: Growth Analysis ---
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<AnalysisResult | null>(null);

    // --- Initial Load ---
    useEffect(() => {
        analyzeGrowth();
    }, []);

    // --- Logic: Analysis ---
    const analyzeGrowth = async () => {
        setLoading(true);
        try {
            const journalData = localStorage.getItem("zenith_journal_entries");
            const todoData = localStorage.getItem("zenith_todos");
            const journalEntries = journalData ? JSON.parse(journalData) : [];
            const todos = todoData ? JSON.parse(todoData) : [];

            const response = await fetch("/api/analyze-growth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ journalEntries, todos }),
            });
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Analysis failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 max-w-6xl mx-auto pb-20">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-semibold uppercase tracking-wider">AI Powered</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    AI Growth Insights
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Deep analysis of your journals, tasks, and habits to guide your personal evolution.
                </p>
            </motion.div>

            {/* --- SECTION 1: AI ANALYSIS --- */}
            <div className="relative mb-24">
                {loading && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm rounded-3xl h-[600px]">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full mb-6 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                        />
                        <h3 className="text-xl font-bold text-white animate-pulse">Synthesizing Data...</h3>
                    </div>
                )}

                {data && !loading && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Emotional Analysis */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="md:col-span-8 glass p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                            <div className="flex items-center gap-4 mb-6 relative">
                                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl">
                                    <Brain className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Emotional Patterns</h2>
                            </div>
                            <p className="text-lg text-gray-300 leading-relaxed mb-8">{data.emotional_analysis.summary}</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <span className="text-sm text-gray-500 block mb-1">Dominant State</span>
                                    <span className="text-xl font-bold text-white">{data.emotional_analysis.dominant_emotion}</span>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <span className="text-sm text-gray-500 block mb-1">Stress Level</span>
                                    <span className={cn(
                                        "text-xl font-bold",
                                        data.emotional_analysis.stress_level === "High" ? "text-red-400" :
                                            data.emotional_analysis.stress_level === "Medium" ? "text-yellow-400" : "text-blue-400"
                                    )}>
                                        {data.emotional_analysis.stress_level}
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Encouragement */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="md:col-span-4 glass p-8 rounded-3xl border border-white/5 flex flex-col justify-center items-center text-center relative"
                        >
                            <Quote className="w-12 h-12 text-blue-500/20 absolute top-6 left-6" />
                            <p className="text-xl font-medium text-white italic relative z-10">"{data.encouragement}"</p>
                        </motion.div>

                        {/* Productivity & Growth */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="md:col-span-6 glass p-8 rounded-3xl border border-white/5"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-2xl">
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Productivity Flow</h2>
                            </div>
                            <div className="mb-6">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-gray-400">Completion Rate</span>
                                    <span className="text-3xl font-bold text-white">{data.productivity_analysis.completion_rate}%</span>
                                </div>
                                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${data.productivity_analysis.completion_rate}%` }}
                                        className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="md:col-span-6 glass p-8 rounded-3xl border border-white/5"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl">
                                    <Leaf className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Growth Areas</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {data.growth_areas.map((area, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-gray-200 text-sm border border-white/10">
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
                {!loading && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={analyzeGrowth}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm transition-colors border border-white/10"
                        >
                            <RefreshCw className="w-3 h-3" />
                            Refresh Analysis
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
}
