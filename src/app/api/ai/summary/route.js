// /app/api/ai/tags/route.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    const { content } = await req.json();

    if (!content) {
        return NextResponse.json({ error: 'No content provided' }, { status: 400 });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = `Summarize the following blog post in 3-4 lines:\n\n"${content}"`;

        const result = await model.generateContent(prompt);
        const text = await result.response.text();
        const tags = text
            .split(/[\n,•-]/)
            .map((tag) => tag.trim().toLowerCase())
            .filter(Boolean)
            .slice(0, 5);

        return NextResponse.json({ tags });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to generate tags' }, { status: 500 });
    }
}
