import { connectDB } from '@/lib/ConnectDB';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connectDB();
    const { id } = params;
    const post = await Post.findById(id);
    console.log(post);

    if (!post) {
        return new NextResponse('Not Found', { status: 404 });
    }
    return NextResponse.json(post);
};
