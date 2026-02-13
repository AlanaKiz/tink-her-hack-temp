"use client";

import { motion } from "framer-motion";

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
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
                    Your Insights
                </h1>
                <p className="text-gray-400">Track your progress and understand your habits.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Productivity Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass p-8 rounded-2xl"
                >
                    <h3 className="text-xl font-bold text-white mb-6">Weekly Productivity</h3>
                    <div className="flex items-end justify-between h-48 gap-2">
                        {weeklyData.map((value, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 w-full">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${value}%` }}
                                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                                    className="w-full bg-primary/50 hover:bg-primary/80 transition-colors rounded-t-sm"
                                    style={{ maxHeight: "100%" }}
                                />
                                <span className="text-xs text-gray-500">{days[index]}</span>
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
            </div>
        </div>
    );
}
