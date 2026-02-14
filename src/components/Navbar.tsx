"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Book, CheckSquare, Compass, BarChart2, Mail } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Journal", href: "/journal", icon: Book },
  { name: "Todo", href: "/todo", icon: CheckSquare },
  { name: "Guidance", href: "/guidance", icon: Compass },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "Letters", href: "/letters", icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4">
      <div className="glass rounded-full px-6 py-3 flex items-center gap-2 md:gap-8 shadow-2xl bg-black/20 border border-white/10 backdrop-blur-md">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group",
                isActive ? "text-white" : "text-gray-400 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <span className="text-sm font-medium relative z-10 hidden md:block">
                {item.name}
              </span>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
