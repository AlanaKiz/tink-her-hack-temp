import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, mood, timestamp } = body;

        if (!mood) {
            return NextResponse.json({ error: 'Mood is required' }, { status: 400 });
        }

        // In a real application, you would save this to a database
        // For now, we'll just mock a successful save and return the data
        const savedMood = {
            id: Date.now().toString(),
            userId: userId || 'anonymous',
            mood,
            timestamp: timestamp || new Date().toISOString(),
        };

        return NextResponse.json(savedMood);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save mood' }, { status: 500 });
    }
}
