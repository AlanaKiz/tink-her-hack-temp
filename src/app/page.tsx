import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import { Book, CheckSquare, Compass, BarChart2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] relative selection:bg-primary/30">
      <Hero />

      <section className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Your personal operating system for productivity and mindfulness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              title="Journal"
              description="Capture your thoughts, reflections, and memories in a distraction-free environment. Support for daily entries and rich text."
              icon={<Book className="w-8 h-8 text-white" />}
              href="/journal"
              delay={0.1}
            />
            <FeatureCard
              title="Smart Todo"
              description="Organize your tasks with a priority-focused list. Stay on top of your game with intuitive drag-and-drop management."
              icon={<CheckSquare className="w-8 h-8 text-white" />}
              href="/todo"
              delay={0.2}
            />
            <FeatureCard
              title="Guidance"
              description="Curated resources and guided sessions to help you navigate through stress, anxiety, and personal growth challenges."
              icon={<Compass className="w-8 h-8 text-white" />}
              href="/guidance"
              delay={0.3}
            />
            <FeatureCard
              title="Analytics"
              description="Visualize your habits and mood over time. Gain insights into your productivity patterns and emotional well-being."
              icon={<BarChart2 className="w-8 h-8 text-white" />}
              href="/analytics"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Zenith. Built for the Hackathon.</p>
      </footer>
    </main>
  );
}
