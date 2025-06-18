import { connectDB } from '@/lib/ConnectDB';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function POST(req) {
    await connectDB();
    const body = await req.json();
    const newPost = new Post(body);
    await newPost.save();
    return new NextResponse(JSON.stringify({ status: 201, message: "Post Created Successfully" }));
};

export async function GET(req) {
    await connectDB();

    const url = new URL(req.url);
    const email = url.searchParams.get('author_email');

    const query = email ? { author_email: email } : {};

    const posts = await Post.find(query).sort({ date: -1 });

    return NextResponse.json(posts);
}
