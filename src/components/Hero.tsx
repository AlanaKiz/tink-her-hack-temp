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

            <div className="text-center max-w-4xl mx-auto space-y-8 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-gray-300">
                        Elevate Your Mind
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-white/60 pb-2"
                >
                    Structure Your Chaos, <br />
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-secondary to-accent animate-gradient-x">
                        Unleash Your Potential
                    </span>
                </motion.h1>

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
                        href="/journal"
                        className="group px-8 py-4 rounded-full bg-white text-black font-semibold text-lg flex items-center gap-2 hover:bg-gray-200 transition-colors"
                    >
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/guidance"
                        className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-white font-medium text-lg"
                    >
                        Learn More
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Grid or Elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </section>
    );
}
