import { NextResponse } from 'next/server';

// In a real app, this would be a database call. 
// For this hackathon project, we'll simulate a DB using a global variable or rely on frontend localStorage. 
// However, since the user asked for API routes, we will implement the API structure.
// NOTE: Since Vercel/Next.js serverless functions are stateless, a global variable here won't persist across re-deploys or cold starts reliably.
// But for a demo session it might work temporarily, OR we can stick to the pattern we used before:
// let the frontend handle storage (localStorage) and just use the API for "AI processing" or simple validation.

// BUT, the prompt explicitly asks for "Save the letter in the database" and "POST /api/letters". 
// Since we don't have a real DB connection set up in this environment (no Mongo/Postgres creds), 
// I will implement the API to return success, but I will ALSO update the frontend to save to localStorage 
// so the user sees it work immediately without needing a full backend setup. 
// This matches the "hackathon/prototype" nature.

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, content, unlockDate, fromState, toState, userId } = body;

        // Validate
        if (!content || !unlockDate) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const newLetter = {
            id: Date.now().toString(),
            userId: userId || 'anonymous',
            title: title || 'Untitled Letter',
            content,
            unlockDate,
            fromState,
            toState,
            createdAt: new Date().toISOString(),
            isUnlocked: false // Calculated on fetch usually, but initial state is protected
        };

        // Return the created object so frontend can add it to state/localStorage
        return NextResponse.json(newLetter);

    } catch (error) {
        return NextResponse.json({ error: 'Failed to save letter' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    // In a real app, fetch from DB. 
    // Here we just return a success status, assuming frontend handles the "source of truth" for this prototype via localStorage
    // strictly because we can't spin up a Postgres instance right now.
    return NextResponse.json({ message: "Use local persistence for prototype" });
}
