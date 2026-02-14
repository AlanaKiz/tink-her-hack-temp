"use client";

import { useState, useEffect } from "react";
import React from 'react';
import { motion } from "framer-motion";
import { Plus, Save, Trash2 } from "lucide-react";

interface JournalEntry {
    id: string;
    date: string;
    content: string;
}

export default function JournalPage() {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [newEntry, setNewEntry] = useState("");

    // Load entries from local storage
    useEffect(() => {
        const savedEntries = localStorage.getItem("zenith_journal_entries");
        if (savedEntries) {
            setEntries(JSON.parse(savedEntries));
        } else {
            // Seed data
            const initialEntries = [
                {
                    id: "1",
                    date: new Date().toLocaleDateString(),
                    content: "Today I started working on the new project. It feels great to be productive! I was a bit anxious at first but now I am confident.",
                },
                {
                    id: "2",
                    date: new Date(Date.now() - 86400000).toLocaleDateString(),
                    content: "Feeling a bit overwhelmed with the deadline. Need to focus more.",
                }
            ];
            setEntries(initialEntries);
            localStorage.setItem("zenith_journal_entries", JSON.stringify(initialEntries));
        }
    }, []);

    // Save entries on change
    useEffect(() => {
        if (entries.length > 0) {
            localStorage.setItem("zenith_journal_entries", JSON.stringify(entries));
        }
    }, [entries]);

    const handleSave = () => {
        if (!newEntry.trim()) return;
        const entry: JournalEntry = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
            content: newEntry,
        };
        setEntries([entry, ...entries]);
        setNewEntry("");
    };

    const handleDelete = (id: string) => {
        setEntries(entries.filter((e) => e.id !== id));
    };

    return (
        <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">
                    Your Journal
                </h1>
                <p className="text-gray-400">Capture your thoughts and reflections.</p>
            </motion.div>

            {/* New Entry Input */}
            <div className="glass p-6 rounded-2xl mb-8 relative">
                <textarea
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    placeholder="What's on your mind today?"
                    className="w-full h-32 bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none text-lg"
                />
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleSave}
                        disabled={!newEntry.trim()}
                        className="flex items-center gap-2 px-6 py-2 rounded-full bg-primary hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save className="w-4 h-4" />
                        Save Entry
                    </button>
                </div>
            </div>

            {/* Entry List */}
            <div className="space-y-4">
                {entries.map((entry) => (
                    <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="glass p-6 rounded-2xl border-l-4 border-l-accent flex justify-between items-start group"
                    >
                        <div>
                            <p className="text-sm text-gray-500 mb-2">{entry.date}</p>
                            <p className="text-gray-200 whitespace-pre-wrap">{entry.content}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(entry.id)}
                            className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </motion.div>
                ))}
                {entries.length === 0 && (
                    <p className="text-center text-gray-500 mt-12">No entries yet. Start writing!</p>
                )}
            </div>
        </div>
    );
}
