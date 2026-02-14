import { NextResponse } from 'next/server';

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    // In a real app, you'd fetch the letter by ID from the database.
    // Since we're using localStorage on the frontend for this prototype, 
    // this endpoint is just a placeholder for potential future backend implementation.
    // The frontend already has the data.
    return NextResponse.json({ id: params.id, content: "Letter content fetched from 'database'" });
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    // In a real app, delete from DB.
    return NextResponse.json({ success: true, id: params.id });
}
