"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Mail,
    Lock,
    Unlock,
    Send,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
interface Letter {
    id: string;
    userId: string;
    title: string;
    content: string;
    unlockDate: string;
    fromState: string;
    toState: string;
    createdAt: string;
    isUnlocked: boolean;
}

export default function LettersPage() {
    // --- State: Future Letters ---
    const [letters, setLetters] = useState<Letter[]>([]);
    const [newLetter, setNewLetter] = useState({
        title: "",
        content: "",
        unlockDate: "",
        fromState: "Hopeful",
        toState: "Grateful"
    });
    const [isWriting, setIsWriting] = useState(false);
    const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // --- Initial Load ---
    useEffect(() => {
        loadLetters();
    }, []);

    // --- Logic: Letters ---
    const checkIsUnlocked = (unlockDate: string) => {
        const now = new Date();
        const unlock = new Date(unlockDate);
        // Compare dates (ignoring time for a more intuitive "unlock on this day" behavior)
        // Or if we want exact time, we use now >= unlock. 
        // Given it's a date picker (YYYY-MM-DD), let's make it unlock at the start of that day local time.
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const unlockDay = new Date(unlock.getFullYear(), unlock.getMonth(), unlock.getDate());
        return today >= unlockDay;
    };

    const loadLetters = () => {
        const saved = localStorage.getItem("zenith_future_letters");
        if (saved) {
            const parsed = JSON.parse(saved);
            const updated = parsed.map((l: Letter) => ({
                ...l,
                isUnlocked: checkIsUnlocked(l.unlockDate)
            }));
            setLetters(updated.sort((a: Letter, b: Letter) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        }
    };

    const handleSaveLetter = async () => {
        if (!newLetter.content || !newLetter.unlockDate) return;

        const payload = {
            ...newLetter,
            userId: "user_123", // Simulated user ID
            createdAt: new Date().toISOString(),
            isUnlocked: checkIsUnlocked(newLetter.unlockDate)
        };

        const response = await fetch("/api/letters", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const createdLetter = await response.json();
            // Ensure the newly created letter has the correct unlock status based on current time
            const letterWithStatus = {
                ...createdLetter,
                isUnlocked: checkIsUnlocked(createdLetter.unlockDate)
            };

            const updatedLetters = [letterWithStatus, ...letters];
            setLetters(updatedLetters);
            localStorage.setItem("zenith_future_letters", JSON.stringify(updatedLetters));

            setNewLetter({ title: "", content: "", unlockDate: "", fromState: "Hopeful", toState: "Grateful" });
            setIsWriting(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }
    };

    const deleteLetter = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const updated = letters.filter(l => l.id !== id);
        setLetters(updated);
        localStorage.setItem("zenith_future_letters", JSON.stringify(updated));
        if (selectedLetter?.id === id) setSelectedLetter(null);
    };

    const getTimeRemaining = (unlockDate: string) => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const unlock = new Date(unlockDate);
        const unlockDay = new Date(unlock.getFullYear(), unlock.getMonth(), unlock.getDate());

        const diffTime = unlockDay.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) return "Ready to open!";
        if (diffDays === 1) return "Unlocks tomorrow";
        return `${diffDays} days left`;
    };

    return (
        <div className="min-h-screen pt-24 px-4 max-w-6xl mx-auto pb-20">

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-primary/20 backdrop-blur-md border border-primary/50 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(56,189,248,0.3)]"
                    >
                        <Sparkles className="w-5 h-5 text-primary" />
                        <span className="font-medium">Your message has been sent to the future.</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-4">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-semibold uppercase tracking-wider">Time Capsule</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Future Self Letters
                </h1>
                <p className="text-gray-400 max-w-xl mx-auto">
                    Write a message to your future self. It will remain locked until the date you choose.
                </p>
            </motion.div>

            {/* --- SECTION: FUTURE SELF LETTERS --- */}
            <div className="pt-8">

                {/* Writer Form */}
                <motion.div className="glass p-8 rounded-3xl border border-white/5 max-w-3xl mx-auto mb-16 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                    {!isWriting ? (
                        <div className="text-center py-8">
                            <button
                                onClick={() => setIsWriting(true)}
                                className="px-8 py-3 rounded-full bg-primary text-black font-bold hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-primary/25 flex items-center gap-2 mx-auto"
                            >
                                <Send className="w-4 h-4" />
                                Write a New Letter
                            </button>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSaveLetter(); }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Title (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full glass bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        placeholder="A note from 2026..."
                                        value={newLetter.title}
                                        onChange={(e) => setNewLetter({ ...newLetter, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Unlock Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full glass bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors [color-scheme:dark]"
                                        value={newLetter.unlockDate}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setNewLetter({ ...newLetter, unlockDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Current Emotional State (From)</label>
                                    <select
                                        className="w-full glass bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors [&>option]:bg-black"
                                        value={newLetter.fromState}
                                        onChange={(e) => setNewLetter({ ...newLetter, fromState: e.target.value })}
                                    >
                                        {["Hopeful", "Anxious", "Determined", "Grateful", "Tired", "Stressed", "Excited"].map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Future Hope (To)</label>
                                    <select
                                        className="w-full glass bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors [&>option]:bg-black"
                                        value={newLetter.toState}
                                        onChange={(e) => setNewLetter({ ...newLetter, toState: e.target.value })}
                                    >
                                        {["Accomplished", "Peaceful", "Stronger", "Happy", "Wise", "Relaxed"].map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Your Message</label>
                                <textarea
                                    required
                                    className="w-full h-48 glass bg-white/5 border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none text-lg leading-relaxed"
                                    placeholder="Dear Future Me, I hope you have achieved..."
                                    value={newLetter.content}
                                    onChange={(e) => setNewLetter({ ...newLetter, content: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsWriting(false)}
                                    className="px-6 py-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-2 rounded-full bg-primary text-black font-bold hover:bg-white transition-all shadow-lg shadow-primary/20"
                                >
                                    Send to Future
                                </button>
                            </div>
                        </form>
                    )}
                </motion.div>

                {/* Letters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {letters.map((letter) => (
                        <motion.div
                            key={letter.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => letter.isUnlocked && setSelectedLetter(letter)}
                            className={cn(
                                "glass p-6 rounded-2xl border border-white/5 relative group transition-all duration-300",
                                letter.isUnlocked ? "cursor-pointer hover:border-primary/30 hover:bg-white/5" : "opacity-75"
                            )}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn(
                                    "p-2 rounded-xl",
                                    letter.isUnlocked ? "bg-primary/20 text-primary" : "bg-gray-800 text-gray-500"
                                )}>
                                    {letter.isUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                                </div>
                                <div className="text-right">
                                    <span className={cn(
                                        "block text-xs px-2 py-1 rounded-full border mb-1",
                                        letter.isUnlocked ? "border-primary/30 text-primary bg-primary/5" : "border-gray-700 text-gray-500"
                                    )}>
                                        {letter.isUnlocked ? "Unlocked" : `Unlocks ${new Date(letter.unlockDate).toLocaleDateString()}`}
                                    </span>
                                    {!letter.isUnlocked && (
                                        <span className="text-[10px] text-gray-600 font-mono">
                                            {getTimeRemaining(letter.unlockDate)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{letter.title}</h3>
                            <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                                {letter.isUnlocked ? letter.content : "This message is currently locked in the time capsule."}
                            </p>

                            <div className="flex justify-between items-center text-xs text-gray-500 border-t border-white/10 pt-4">
                                <span>Sent {new Date(letter.createdAt).toLocaleDateString()}</span>
                                <span className="px-2 py-0.5 rounded border border-white/10 text-gray-400">
                                    From: {letter.fromState}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                    {letters.length === 0 && !isWriting && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            <Mail className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No letters in the time capsule yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Read Modal */}
            <AnimatePresence>
                {selectedLetter && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedLetter(null)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 rounded-full bg-primary/20 text-primary">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{selectedLetter.title}</h2>
                                        <p className="text-sm text-gray-400">Written on {new Date(selectedLetter.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="prose prose-invert prose-lg max-w-none text-gray-200 leading-relaxed whitespace-pre-wrap">
                                    {selectedLetter.content}
                                </div>

                                <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center">
                                    <div className="flex gap-4">
                                        <div className="text-center">
                                            <span className="block text-xs text-gray-500 uppercase tracking-wider">Past State</span>
                                            <span className="text-primary font-bold">{selectedLetter.fromState}</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="block text-xs text-gray-500 uppercase tracking-wider">Hoped For</span>
                                            <span className="text-secondary font-bold">{selectedLetter.toState}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => deleteLetter(selectedLetter.id, e as any)}
                                        className="text-red-400 hover:text-red-300 text-sm flex items-center gap-2 px-4 py-2 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <span className="w-1 h-1 bg-red-400 rounded-full" />
                                        Delete Letter
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
