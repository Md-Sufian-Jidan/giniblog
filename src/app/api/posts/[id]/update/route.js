import { connectDB } from '@/lib/ConnectDB';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
    await connectDB();

    const { id } = params;
    const { data, email } = await req.json();
    const post = await Post.findById(id);
    if (!post) return NextResponse.json({ error: 'Post Not Found' }, { status: 404 });

    if (post.author_email !== email) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    Object.assign(post, data);
    await post.save();

    return NextResponse.json({ message: 'Post Updated', status: 201, post });
}
