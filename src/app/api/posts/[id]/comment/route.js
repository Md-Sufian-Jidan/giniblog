import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/ConnectDB';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
  await connectDB();

  const { userId } = auth(); // 👈 Get authenticated user
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  const { content } = await req.json();

  if (!content) {
    return NextResponse.json({ error: 'Comment content is required' }, { status: 400 });
  }

  const post = await Post.findById(id);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  // Optionally fetch full user info from Clerk
  const { getUser } = await import('@clerk/nextjs/server');
  const user = await getUser(userId);

  const userEmail = user?.emailAddresses?.[0]?.emailAddress || 'unknown';

  post.comments.push({ content, userEmail });
  await post.save();

  return NextResponse.json({ message: 'Comment added', post });
}
