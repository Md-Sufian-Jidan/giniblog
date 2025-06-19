import { connectDB } from '@/lib/ConnectDB';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    await connectDB();

    const { id } = params;
    const { email } = await req.json();

    const post = await Post.findById(id);
    if (!post) return NextResponse.json({ error: 'Post Not Found' }, { status: 404 });

    if (post.author_email !== email) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Post Deleted Successfully', status: 201 });
}
