"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Trash2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export default function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([
        { id: "1", text: "Welcome to your new productivity hub", completed: false },
        { id: "2", text: "Complete the landing page", completed: true },
    ]);
    const [newTodo, setNewTodo] = useState("");

    const handleAddString = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        const todo: Todo = {
            id: Date.now().toString(),
            text: newTodo,
            completed: false,
        };
        setTodos([todo, ...todos]);
        setNewTodo("");
    };

    const toggleTodo = (id: string) => {
        setTodos(
            todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter((t) => t.id !== id));
    };

    return (
        <div className="min-h-screen pt-24 px-4 max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center"
            >
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary mb-2">
                    Tasks & Goals
                </h1>
                <p className="text-gray-400">Stay organized and focused.</p>
            </motion.div>

            {/* Input */}
            <form onSubmit={handleAddString} className="mb-8 relative">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="w-full glass px-6 py-4 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-secondary/50 transition-colors pr-12"
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-secondary rounded-full text-black hover:bg-white transition-colors disabled:opacity-50"
                    disabled={!newTodo.trim()}
                >
                    <Plus className="w-5 h-5" />
                </button>
            </form>

            {/* List */}
            <ul className="space-y-3">
                <AnimatePresence initial={false}>
                    {todos.map((todo) => (
                        <motion.li
                            key={todo.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            className={cn(
                                "glass p-4 rounded-xl flex items-center justify-between group transition-all duration-300",
                                todo.completed ? "opacity-60 bg-white/5" : "hover:bg-white/10"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => toggleTodo(todo.id)}
                                    className={cn(
                                        "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                                        todo.completed
                                            ? "bg-green-500 border-green-500 text-black"
                                            : "border-gray-500 hover:border-secondary"
                                    )}
                                >
                                    {todo.completed ? <Check className="w-4 h-4" /> : <Circle className="w-4 h-4 opacity-0 hover:opacity-100" />}
                                </button>
                                <span
                                    className={cn(
                                        "text-lg transition-all decoration-2 underline-offset-4",
                                        todo.completed ? "line-through text-gray-500" : "text-white"
                                    )}
                                >
                                    {todo.text}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>

            {todos.length === 0 && (
                <p className="text-center text-gray-500 mt-12">All caught up! 🎉</p>
            )}
        </div>
    );
}
