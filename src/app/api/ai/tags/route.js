import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Incoming body:', body);

        const { content } = body;

        if (!content) {
            return NextResponse.json({ error: 'No content provided' }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = `Suggest 5 relevant tags for the following blog content:\n\n"${content}"`;

        const result = await model.generateContent([prompt]);
        const text = await result.response.text();
        console.log('Gemini response text:', text);

        const tags = text
            .split(/[\n,•-]/)
            .map((tag) => tag.trim().toLowerCase())
            .filter(Boolean)
            .slice(0, 5);

        return NextResponse.json({ tags });
    } catch (error) {
        console.error('Gemini API error:', error?.message || error);
        return NextResponse.json({ error: 'Failed to generate tags', details: error?.message }, { status: 500 });
    }
}
