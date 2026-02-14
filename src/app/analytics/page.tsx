"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const weeklyData = [65, 40, 75, 50, 85, 90, 60];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AnalyticsPage() {
    return (
        <div className="min-h-screen pt-24 px-4 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 mb-2">
                    Your Insights
                </h1>
                <p className="text-gray-400">Track your progress and understand your habits.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden"
                >
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        Weekly Productivity
                    </h3>

                    <div className="flex items-end justify-between h-[250px] gap-2 md:gap-4 relative px-2">
                        {/* Background Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-full border-t border-dashed border-gray-600 h-0" />
                            ))}
                        </div>

                        {weeklyData.map((value, index) => (
                            <div key={index} className="relative flex flex-col items-center flex-1 h-full justify-end group z-10">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${value}%` }}
                                    transition={{ duration: 1.5, delay: 0.3 + index * 0.1, ease: "circOut" }}
                                    className="w-full max-w-[45px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg relative shadow-[0_0_20px_rgba(59,130,246,0.2)] border-x border-t border-white/10"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        {value}%
                                    </div>

                                    {/* Glass Shine Effect */}
                                    <div className="absolute inset-0 bg-white/10 rounded-t-lg pointer-events-none" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                                </motion.div>
                                <span className="mt-4 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
                                    {days[index]}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Mood/Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass p-6 rounded-2xl flex flex-col justify-center items-center"
                    >
                        <span className="text-4xl font-bold text-white mb-2">12</span>
                        <span className="text-sm text-gray-400">Journal Entries</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass p-6 rounded-2xl flex flex-col justify-center items-center"
                    >
                        <span className="text-4xl font-bold text-white mb-2">85%</span>
                        <span className="text-sm text-gray-400">Task Completion</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass p-6 rounded-2xl flex flex-col justify-center items-center col-span-2"
                    >
                        <h4 className="text-lg font-bold text-white mb-4">Focus Score</h4>
                        <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "78%" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-linear-to-r from-secondary to-accent"
                            />
                        </div>
                        <span className="mt-2 text-2xl font-bold text-white">78/100</span>
                    </motion.div>
                </div>

                {/* Mood Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="md:col-span-2 glass p-8 rounded-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <h3 className="text-xl font-bold text-white mb-8">Mood Distribution</h3>
                    <div className="space-y-6 max-w-2xl">
                        {[
                            { mood: "Happy", color: "bg-green-400", percent: 45 },
                            { mood: "Determined", color: "bg-orange-400", percent: 30 },
                            { mood: "Tired", color: "bg-gray-400", percent: 15 },
                            { mood: "Anxious", color: "bg-purple-400", percent: 10 },
                        ].map((m, i) => (
                            <div key={m.mood} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-300 font-medium">{m.mood}</span>
                                    <span className="text-gray-500">{m.percent}%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${m.percent}%` }}
                                        transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                                        className={cn("h-full rounded-full", m.color)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
