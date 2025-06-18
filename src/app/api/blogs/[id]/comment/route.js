import { connectDB } from '@/lib/ConnectDB';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
  await connectDB();
  const { id } = params;
  const { content } = await req.json();

  if (!content) return NextResponse.json({ error: 'Comment content is required' }, { status: 400 });

  const post = await Post.findById(id);
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  post.comments.push({ content });
  await post.save();

  return NextResponse.json({ message: 'Comment added', post });
}
