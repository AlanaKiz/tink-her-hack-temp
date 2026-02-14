import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { journalEntries, todos } = await req.json();

        // --- EXAMPLE AI PROMPT USED IN BACKEND ---
        const systemPrompt = `
      You are an expert personal growth coach. Analyze the user's data below and return a JSON object.
      
      DATA:
      Journal Entries: ${JSON.stringify(journalEntries)}
      Todos: ${JSON.stringify(todos)}
      
      REQUIREMENTS:
      1. Analyze emotional patterns from the text (anxiety, joy, stress).
      2. Analyze productivity based on completed vs pending tasks.
      3. Identify 3 key growth areas.
      4. Suggest 2 specific, actionable daily habits.
      5. Write a short, personalized encouragement message.
      
      OUTPUT FORMAT (JSON):
      {
        "emotional_analysis": {
          "summary": "String describing emotional state",
          "dominant_emotion": "String",
          "stress_level": "Low/Medium/High"
        },
        "productivity_analysis": {
          "completion_rate": Number (0-100),
          "insight": "String about their working style",
          "consistency": "String"
        },
        "growth_areas": ["Area 1", "Area 2", "Area 3"],
        "recommendations": ["Habit 1", "Habit 2"],
        "encouragement": "String"
      }
    `;

        // --- SIMULATED AI ANALYSIS LOGIC ---
        // In a production app, you would call OpenAI/Anthropic here with the prompt above.

        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 1. Productivity Calculation
        const totalTodos = todos.length;
        const completedTodos = todos.filter((t: any) => t.completed).length;
        const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

        // 2. Emotional Heuristics (Mocking NLP)
        const journalText = journalEntries.map((e: any) => e.content).join(" ").toLowerCase();

        const stressKeywords = ["stress", "anxious", "overwhelmed", "deadline", "busy", "tired"];
        const positiveKeywords = ["happy", "good", "great", "excited", "proud", "done"];

        let stressCount = 0;
        let positiveCount = 0;

        stressKeywords.forEach(w => { if (journalText.includes(w)) stressCount++; });
        positiveKeywords.forEach(w => { if (journalText.includes(w)) positiveCount++; });

        const dominantEmotion = stressCount > positiveCount ? "Anxious" : (positiveCount > 0 ? "Positive" : "Neutral");
        const stressLevel = stressCount > 2 ? "High" : (stressCount > 0 ? "Medium" : "Low");

        // 3. Construct the "AI" Response
        const response = {
            emotional_analysis: {
                summary: stressCount > positiveCount
                    ? "Your recent entries indicate some friction and stress patterns. You might be taking on too much."
                    : "You are showing good emotional resilience and positivity in your writing.",
                dominant_emotion: dominantEmotion,
                stress_level: stressLevel
            },
            productivity_analysis: {
                completion_rate: completionRate,
                insight: completionRate > 60
                    ? "You are maintaining a solid workflow and clearing tasks effectively."
                    : "You have several pending items. Consider focusing on one major task per day.",
                consistency: completionRate > 80 ? "Excellent" : "Fluctuating"
            },
            growth_areas: [
                stressCount > 0 ? "Stress Management" : "Goal Setting",
                completionRate < 50 ? "Task prioritization" : "Skill Mastery",
                "Mindfulness"
            ],
            recommendations: [
                stressCount > 0 ? "Take a 5-minute breathing break every 2 hours." : "Reflect on your wins at the end of the day.",
                completionRate < 60 ? "Use the Pomodoro technique (25m work / 5m break)." : "Plan your next day the night before."
            ],
            encouragement: stressCount > 0
                ? "Remember, progress is not linear. Be kind to yourself today."
                : "You're on a roll! Keep trusting your process."
        };

        return NextResponse.json(response);

    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to analyze data' },
            { status: 500 }
        );
    }
}
