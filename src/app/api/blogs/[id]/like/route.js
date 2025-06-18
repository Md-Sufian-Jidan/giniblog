import { connectDB } from '@/lib/ConnectDB';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
  await connectDB();
  const { id } = params;
  const { action } = await req.json();

  const post = await Post.findById(id);
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  if (action === 'like') {
    post.upvotes += 1;
  } else if (action === 'dislike') {
    post.downvotes += 1;
  } else {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }

  await post.save();
  return NextResponse.json({ message: 'Vote updated', post });
}
