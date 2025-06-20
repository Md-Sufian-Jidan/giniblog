import main from '@/lib/Gemini';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const { prompt } = body;

        if (!prompt) {
            return NextResponse.json(
                { success: false, error: 'Prompt is required' },
                { status: 400 }
            );
        }

        const fullPrompt = `
    Topic: ${prompt}
    Suggest 5 relevant tags based on this topic. Return tags only, with hash and comma-separated.
    `;

        const content = await main(fullPrompt);

        return NextResponse.json({
            success: true,
            tags: content.trim(),
        });
    } catch (error) {
        console.error('Error in /api/post:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
