"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20">

            {/* Background Gradients/Orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10" />

            <div className="text-center max-w-5xl mx-auto space-y-12 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="px-5 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-xs font-bold tracking-[0.3em] text-primary uppercase animate-pulse">
                        VitalMind
                    </div>

                    <h1 className="text-6xl md:text-9xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 drop-shadow-[0_0_50px_rgba(0,191,255,0.4)] pb-4">
                        VitalMind
                    </h1>

                    <h2
                        className="text-2xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x"
                    >
                        Structure Your Chaos, Unleash Your Potential
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
                >
                    A unified workspace for your thoughts, tasks, and growth.
                    Journal your journey, organize your day, and analyze your progress in one premium interface.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link
                        href="/check-in"
                        className="group px-10 py-5 rounded-full bg-white text-black font-bold text-xl flex items-center gap-3 hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                        Get Started
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                    <Link
                        href="/guidance"
                        className="px-10 py-5 rounded-full border border-white/20 hover:bg-white/5 transition-colors text-white font-semibold text-lg"
                    >
                        Learn More
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Grid or Elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />
        </section>
    );
}
