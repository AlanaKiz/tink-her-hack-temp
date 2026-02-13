"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    delay?: number;
    className?: string;
}

export default function FeatureCard({ title, description, icon, href, delay = 0, className }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            <Link href={href} className="block group">
                <div className={cn(
                    "glass-card p-8 rounded-2xl h-full relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:bg-white/10",
                    className
                )}>
                    {/* Hover Gradient Blob */}
                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors" />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="mb-6 p-4 rounded-2xl bg-white/10 w-fit backdrop-blur-md border border-white/5">
                            {icon}
                        </div>

                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                            {title}
                        </h3>

                        <p className="text-gray-400 mb-8 flex-grow leading-relaxed">
                            {description}
                        </p>

                        <div className="flex items-center text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                            Explore Feature
                            <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
